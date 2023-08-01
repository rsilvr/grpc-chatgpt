// Original file: proto/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { LoginRequest as _auth_LoginRequest, LoginRequest__Output as _auth_LoginRequest__Output } from '../auth/LoginRequest';
import type { LoginResponse as _auth_LoginResponse, LoginResponse__Output as _auth_LoginResponse__Output } from '../auth/LoginResponse';

export interface AuthServiceClient extends grpc.Client {
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginRequest, callback: grpc.requestCallback<_auth_LoginResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  Login: grpc.handleUnaryCall<_auth_LoginRequest__Output, _auth_LoginResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  Login: MethodDefinition<_auth_LoginRequest, _auth_LoginResponse, _auth_LoginRequest__Output, _auth_LoginResponse__Output>
}
