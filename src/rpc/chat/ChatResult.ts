// Original file: proto/chat.proto

import type { ChatMessage as _chat_ChatMessage, ChatMessage__Output as _chat_ChatMessage__Output } from '../chat/ChatMessage';

export interface ChatResult {
  'userId'?: (string);
  'chatId'?: (string);
  'messages'?: (_chat_ChatMessage)[];
}

export interface ChatResult__Output {
  'userId': (string);
  'chatId': (string);
  'messages': (_chat_ChatMessage__Output)[];
}
