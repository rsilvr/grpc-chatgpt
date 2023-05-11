import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatServiceClient as _chat_ChatServiceClient, ChatServiceDefinition as _chat_ChatServiceDefinition } from './chat/ChatService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  chat: {
    AssistantMessageErrorResponse: MessageTypeDefinition
    AssistantMessageResponse: MessageTypeDefinition
    AssistantMessageSuccessResponse: MessageTypeDefinition
    ChatMessage: MessageTypeDefinition
    ChatResult: MessageTypeDefinition
    ChatService: SubtypeConstructor<typeof grpc.Client, _chat_ChatServiceClient> & { service: _chat_ChatServiceDefinition }
    GetChatRequest: MessageTypeDefinition
    MessageRole: EnumTypeDefinition
    UserMessageRequest: MessageTypeDefinition
  }
}

