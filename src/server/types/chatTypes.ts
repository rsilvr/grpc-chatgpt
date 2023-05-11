export interface Message {
  chatId: string
  messageId: string
  userId: string
  messageText: string
  sentAt: number
  startedAt: number
  finishedAt: number
}

export interface ChatSession {
  chatId: string
  userId: string
  tokenQuantity: number
  createdAt: number
}