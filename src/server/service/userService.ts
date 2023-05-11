import { randomUUID } from 'crypto'
import { CreateUserRequest } from '../../rpc/user/CreateUserRequest'
import { saveUser } from '../db/userDb'
import { User } from '../types/userTypes'
import { checkRequired } from './utils'

export const createUser = async (request: CreateUserRequest): Promise<User> => {
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
