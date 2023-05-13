export const enum MessageType {
  user = 'user',
  assistant = 'assistant',
  system = 'system'
}

export interface Message {
  chatId: string
  messageId: string
  userId: string
  messageText: string
  messageType: MessageType
  startedAt: number
  finishedAt: number
}

export interface ChatSession {
  chatId: string
  userId: string
  tokenQuantity: number
  createdAt: number
}