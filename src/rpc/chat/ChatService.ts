// Original file: proto/chat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AssistantMessageResponse as _chat_AssistantMessageResponse, AssistantMessageResponse__Output as _chat_AssistantMessageResponse__Output } from '../chat/AssistantMessageResponse';
import type { ChatResult as _chat_ChatResult, ChatResult__Output as _chat_ChatResult__Output } from '../chat/ChatResult';
import type { GetChatRequest as _chat_GetChatRequest, GetChatRequest__Output as _chat_GetChatRequest__Output } from '../chat/GetChatRequest';
import type { UserMessageRequest as _chat_UserMessageRequest, UserMessageRequest__Output as _chat_UserMessageRequest__Output } from '../chat/UserMessageRequest';

export interface ChatServiceClient extends grpc.Client {
  GetChat(argument: _chat_GetChatRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  GetChat(argument: _chat_GetChatRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  GetChat(argument: _chat_GetChatRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  GetChat(argument: _chat_GetChatRequest, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  getChat(argument: _chat_GetChatRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  getChat(argument: _chat_GetChatRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  getChat(argument: _chat_GetChatRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  getChat(argument: _chat_GetChatRequest, callback: grpc.requestCallback<_chat_ChatResult__Output>): grpc.ClientUnaryCall;
  
  SendMessage(argument: _chat_UserMessageRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_AssistantMessageResponse__Output>;
  SendMessage(argument: _chat_UserMessageRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_AssistantMessageResponse__Output>;
  sendMessage(argument: _chat_UserMessageRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_AssistantMessageResponse__Output>;
  sendMessage(argument: _chat_UserMessageRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_chat_AssistantMessageResponse__Output>;
  
}

export interface ChatServiceHandlers extends grpc.UntypedServiceImplementation {
  GetChat: grpc.handleUnaryCall<_chat_GetChatRequest__Output, _chat_ChatResult>;
  
  SendMessage: grpc.handleServerStreamingCall<_chat_UserMessageRequest__Output, _chat_AssistantMessageResponse>;
  
}

export interface ChatServiceDefinition extends grpc.ServiceDefinition {
  GetChat: MethodDefinition<_chat_GetChatRequest, _chat_ChatResult, _chat_GetChatRequest__Output, _chat_ChatResult__Output>
  SendMessage: MethodDefinition<_chat_UserMessageRequest, _chat_AssistantMessageResponse, _chat_UserMessageRequest__Output, _chat_AssistantMessageResponse__Output>
}
