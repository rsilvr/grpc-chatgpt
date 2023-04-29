// Original file: proto/user.proto

import type { Long } from '@grpc/proto-loader';

export interface CreateUserResponse {
  'userId'?: (string);
  'name'?: (string);
  'createdAt'?: (number | string | Long);
}

export interface CreateUserResponse__Output {
  'userId': (string);
  'name': (string);
  'createdAt': (string);
}
