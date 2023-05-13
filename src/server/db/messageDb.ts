import { Entity, Table } from 'dynamodb-toolbox'
import { Message } from '../types/chatTypes'
import { dbClient as DocumentClient } from './dbClient'

const MessageTable = new Table({
  name: 'Message',
  partitionKey: 'chatId',
  sortKey: 'messageId',
  removeNullAttributes: false,
  DocumentClient
})

const MessageEntity = new Entity({
  name: 'Message',
  attributes: {
    chatId: { partitionKey: true },
    messageId: { sortKey: true },
    userId: { type: 'string' },
    messageText: { type: 'string' },
    messageType: { type: 'string' },
    startedAt: { type: 'number' },
    finishedAt: { type: 'number' },
  },
  typeHidden: true,
  timestamps: false,
  table: MessageTable,
} as const)

export const saveMessage = async (message: Message): Promise<Message> => {
  return MessageEntity.put(message).then(() => message)
}