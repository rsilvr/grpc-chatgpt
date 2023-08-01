// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreateUserRequest as _user_CreateUserRequest, CreateUserRequest__Output as _user_CreateUserRequest__Output } from '../user/CreateUserRequest';
import type { CreateUserResponse as _user_CreateUserResponse, CreateUserResponse__Output as _user_CreateUserResponse__Output } from '../user/CreateUserResponse';

export interface UserServiceClient extends grpc.Client {
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  CreateUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  createUser(argument: _user_CreateUserRequest, callback: grpc.requestCallback<_user_CreateUserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  CreateUser: grpc.handleUnaryCall<_user_CreateUserRequest__Output, _user_CreateUserResponse>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  CreateUser: MethodDefinition<_user_CreateUserRequest, _user_CreateUserResponse, _user_CreateUserRequest__Output, _user_CreateUserResponse__Output>
}
