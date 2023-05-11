import { Entity, Table } from 'dynamodb-toolbox'
import { ChatSession } from '../types/chatTypes'
import { dbClient as DocumentClient } from './dbClient'

const ChatSessionTable = new Table({
  name: 'ChatSession',
  partitionKey: 'userId',
  sortKey: 'chatId',
  removeNullAttributes: false,
  DocumentClient
})

const ChatSessionEntity = new Entity({
  name: 'ChatSession',
  attributes: {
    userId: { partitionKey: true },
    chatId: { sortKey: true },
    createdAt: { type: 'number' },
    tokenQuantity: { type: 'number' },
  },
  typeHidden: true,
  timestamps: false,
  table: ChatSessionTable,
} as const)

export const saveChatSession = async (chatSession: ChatSession): Promise<ChatSession> => {
  await ChatSessionEntity.put(chatSession)
  return chatSession
}

export const getChatSession = (userId: string, chatId: string): Promise<ChatSession> => {
  return ChatSessionEntity.get({ userId, chatId }).then(({ Item }) => Item as ChatSession)
}