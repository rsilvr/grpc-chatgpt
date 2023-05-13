import { Status } from '@grpc/grpc-js/build/src/constants'
import { ServerWritableStream } from '@grpc/grpc-js/build/src/server-call'
import { randomUUID } from 'crypto'
import { AssistantMessageResponse } from '../../rpc/chat/AssistantMessageResponse'
import { UserMessageRequest } from '../../rpc/chat/UserMessageRequest'
import { getChatSession, saveChatSession } from '../db/chatDb'
import { saveMessage } from '../db/messageDb'
import { getUser } from '../db/userDb'
import { ApiError } from '../types/apiError'
import { ChatSession, Message, MessageType } from '../types/chatTypes'
import { User } from '../types/userTypes'
import { checkRequired } from './utils'

export const sendMessage = async (request: UserMessageRequest, call: ServerWritableStream<UserMessageRequest,AssistantMessageResponse>) => {
  const { userId, chatId } = request
  checkRequired(request, ['userId', 'messageText'])
  const user = await getUser(userId!)
  if (!user) throw new ApiError('User not found', Status.NOT_FOUND)
  const chatSession = await createOrGetChatSession(chatId, user)
  const userMessage = await saveUserMessage(request, chatSession)
  return chatSession
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