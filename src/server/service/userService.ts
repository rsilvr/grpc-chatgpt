import { randomUUID } from 'crypto'
import { CreateUserRequest } from '../../rpc/user/CreateUserRequest'
import { saveUser } from '../db/userDb'
import { User } from '../types/userTypes'

export const createUser = async (request: CreateUserRequest): Promise<User> => {
  if (!request.name) throw new Error('name is required')
  return saveUser(assembleNewUser(request))
}

const assembleNewUser = (request: CreateUserRequest): User => {
  return {
    userId: randomUUID(),
    name: request.name!,
    createdAt: Date.now()
  }
}
