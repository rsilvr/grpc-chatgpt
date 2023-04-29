// Original file: proto/chat.proto

export const MessageRole = {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
} as const;

export type MessageRole =
  | 'USER'
  | 0
  | 'ASSISTANT'
  | 1

export type MessageRole__Output = typeof MessageRole[keyof typeof MessageRole]
