import { loadPackageDefinition } from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { randomUUID } from 'crypto'
import { join } from 'path'
import { ProtoGrpcType as UserServiceDefinition } from '../../rpc/user'
import { CreateUserRequest } from '../../rpc/user/CreateUserRequest'
import { UserServiceHandlers } from '../../rpc/user/UserService'
import { saveUser } from '../db/userDb'
import { User } from '../types/userTypes'
import { checkRequired } from './utils'

const userPackage = protoLoader.loadSync(join(__dirname, '../../../proto/user.proto'))
const userServiceDefinition = loadPackageDefinition(userPackage) as unknown as UserServiceDefinition

const userServiceHandlers: UserServiceHandlers = {
  CreateUser: (call, callback) => {
    createUser(call.request)
    .then(user => callback(null, user))
    .catch(error => callback(error))
  }
}

const createUser = async (request: CreateUserRequest): Promise<User> => {
  checkRequired(request, ['name'])
  return saveUser(assembleNewUser(request))
}

const assembleNewUser = (request: CreateUserRequest): User => {
  return {
    userId: randomUUID(),
    name: request.name!,
    createdAt: Date.now()
  }
}

export { userServiceDefinition, userServiceHandlers }
