// Original file: proto/chat.proto

import type { MessageRole as _chat_MessageRole, MessageRole__Output as _chat_MessageRole__Output } from '../chat/MessageRole';

export interface ChatMessage {
  'messageId'?: (string);
  'role'?: (_chat_MessageRole);
  'messageText'?: (string);
  'sentAt'?: (number | string);
}

export interface ChatMessage__Output {
  'messageId': (string);
  'role': (_chat_MessageRole__Output);
  'messageText': (string);
  'sentAt': (number);
}
