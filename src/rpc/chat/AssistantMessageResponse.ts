// Original file: proto/chat.proto

import type { AssistantMessageSuccessResponse as _chat_AssistantMessageSuccessResponse, AssistantMessageSuccessResponse__Output as _chat_AssistantMessageSuccessResponse__Output } from '../chat/AssistantMessageSuccessResponse';
import type { AssistantMessageErrorResponse as _chat_AssistantMessageErrorResponse, AssistantMessageErrorResponse__Output as _chat_AssistantMessageErrorResponse__Output } from '../chat/AssistantMessageErrorResponse';

export interface AssistantMessageResponse {
  'success'?: (_chat_AssistantMessageSuccessResponse | null);
  'error'?: (_chat_AssistantMessageErrorResponse | null);
  'response'?: "success"|"error";
}

export interface AssistantMessageResponse__Output {
  'success'?: (_chat_AssistantMessageSuccessResponse__Output | null);
  'error'?: (_chat_AssistantMessageErrorResponse__Output | null);
  'response': "success"|"error";
}
