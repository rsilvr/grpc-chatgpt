import { Entity, Table } from 'dynamodb-toolbox'
import { User } from '../types/userTypes'
import { dbClient as DocumentClient } from './dbClient'

const UserTable = new Table({
  name: 'User',
  partitionKey: 'userId',
  removeNullAttributes: false,
  DocumentClient
})

const UserEntity = new Entity({
  name: 'User',
  attributes: {
    userId: { partitionKey: true },
    name: { type: 'string' },
    createdAt: { type: 'number' }
  },
  typeHidden: true,
  timestamps: false,
  table: UserTable,
} as const)

export const saveUser = async(user: User): Promise<User> => {
  await UserEntity.put(user)
  return user
}