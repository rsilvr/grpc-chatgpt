import { loadPackageDefinition } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'
import { ServerWritableStream } from '@grpc/grpc-js/build/src/server-call'
import * as protoLoader from '@grpc/proto-loader'
import { randomUUID } from 'crypto'
import { join } from 'path'
import { ProtoGrpcType as ChatServiceDefinition } from '../../rpc/chat'
import { AssistantMessageResponse } from '../../rpc/chat/AssistantMessageResponse'
import { ChatServiceHandlers } from '../../rpc/chat/ChatService'
import { UserMessageRequest } from '../../rpc/chat/UserMessageRequest'
import { getAnswer } from '../connector/openAiConnector'
import { getChatSession, saveChatSession } from '../db/chatDb'
import { retrieveSessionMessages, saveMessage } from '../db/messageDb'
import { getUser } from '../db/userDb'
import { ApiError } from '../types/apiError'
import { ChatSession, Message, MessageType } from '../types/chatTypes'
import { User } from '../types/userTypes'
import { authenticate } from './authService'
import { checkRequired } from './utils'

const chatPackage = protoLoader.loadSync(join(__dirname, '../../../proto/chat.proto'))
const chatServiceDefinition = loadPackageDefinition(chatPackage) as unknown as ChatServiceDefinition

const chatServiceHandlers: ChatServiceHandlers = {
  GetChat: (call, callback) => {

  },
  SendMessage: (call) => {
    authenticate(call)
    .then(() => sendMessage(call.request, call))
    .then(() => call.end())
    .catch(error => {
      call.write({ error: { errorMessage: error.message, errorCode: error.code } })
      call.end()
    })
  }
}

const sendMessage = async (request: UserMessageRequest, call: ServerWritableStream<UserMessageRequest,AssistantMessageResponse>): Promise<void> => {
  const { userId, chatId } = request
  checkRequired(request, ['userId', 'messageText'])
  const user = await getUser(userId!)
  if (!user) throw new ApiError('User not found', Status.NOT_FOUND)
  const chatSession = await createOrGetChatSession(chatId, user)
  await saveUserMessage(request, chatSession)
  const chatMessages = await retrieveSessionMessages(chatSession.chatId)
  await streamAssistantAnswer(chatMessages, chatSession, call)
  call.end()
}

const streamAssistantAnswer = async (chatMessages: Message[], chatSession: ChatSession, call: ServerWritableStream<UserMessageRequest,AssistantMessageResponse>): Promise<void> => {
  const assistantMessage: Message = {
    chatId: chatSession.chatId,
    userId: chatSession.userId,
    messageId: randomUUID(),
    messageText: '',
    messageType: MessageType.assistant,
    startedAt: Date.now(),
  }
  await getAnswer(chatMessages, (chunk) => {
    const response: AssistantMessageResponse = {
      success: {
        userId: chatSession.userId,
        chatId: chatSession.chatId,
        messageId: chunk.messageId,
        messageChunk: chunk.chunkText,
      }
    }
    assistantMessage.messageId = chunk.messageId
    assistantMessage.messageText += chunk.chunkText
    call.write(response)
  })
  assistantMessage.finishedAt = Date.now()
  await saveMessage(assistantMessage)
}

const createOrGetChatSession = async (chatId: string | undefined, user: User): Promise<ChatSession> => {
  let chatSession: ChatSession
  if (chatId) {
    chatSession = await getChatSession(user.userId, chatId)
    if (!chatSession) throw new ApiError('Chat not found', Status.NOT_FOUND)
  } else {
    chatSession = await saveChatSession({
      userId: user.userId,
      chatId: randomUUID(),
      tokenQuantity: 0,
      createdAt: Date.now()
    })
    await saveSystemMessage(chatSession)
  }
  return chatSession
}

const saveUserMessage = (request: UserMessageRequest, chatSession: ChatSession): Promise<Message>  => {
  const timestamp = Date.now()
  const userMessage: Message = {
    chatId: chatSession.chatId,
    messageId: randomUUID(),
    userId: request.userId!,
    messageText: request.messageText!,
    messageType: MessageType.user,
    startedAt: timestamp,
    finishedAt: timestamp
  }
  return saveMessage(userMessage)
}

const saveSystemMessage = (chatSession: ChatSession): Promise<Message> => {
  const timestamp = Date.now()
  const userMessage: Message = {
    chatId: chatSession.chatId,
    messageId: randomUUID(),
    userId: chatSession.userId,
    messageText: 'You\'re an useful assistant. Keep your answers as short and objective as possible',
    messageType: MessageType.system,
    startedAt: timestamp,
    finishedAt: timestamp
  }
  return saveMessage(userMessage)
}

export { chatServiceDefinition, chatServiceHandlers }
