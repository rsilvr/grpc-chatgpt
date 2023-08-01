import { ServerUnaryCall, loadPackageDefinition } from '@grpc/grpc-js'
import { Status } from '@grpc/grpc-js/build/src/constants'
import * as protoLoader from '@grpc/proto-loader'
import { join } from 'path'
import { ProtoGrpcType as AuthServiceDefinition } from '../../rpc/auth'
import { AuthServiceHandlers } from '../../rpc/auth/AuthService'
import { LoginRequest } from '../../rpc/auth/LoginRequest'
import { LoginResponse } from '../../rpc/auth/LoginResponse'
import { getUser } from '../db/userDb'
import { ApiError } from '../types/apiError'
import { checkRequired, logError, logRequest, logResponse } from './utils'

const authPackage = protoLoader.loadSync(join(__dirname, '../../../proto/auth.proto'))
const authServiceDefinition = loadPackageDefinition(authPackage) as unknown as AuthServiceDefinition

const authServiceHandlers: AuthServiceHandlers = {
  Login: (call, callback) => {
    logRequest('Login', call)
    login(call.request)
    .then(res => callback(null, logResponse('Login', res)))
    .catch(error => callback(logError('Login', error)))
  }
}

const login = async (request: LoginRequest): Promise<LoginResponse> => {
  checkRequired(request, ['userId', 'password'])
  const user = await getUser(request.userId!)
  if (!user || request!.password !== 'pass') throw new ApiError('Invalid user or password', Status.UNAUTHENTICATED)
  return { token: 'token' }
}

const authenticate = async (call: ServerUnaryCall<any,any>) => {
  const error = new ApiError('Invalid token', Status.UNAUTHENTICATED)
  const authorizationHeader = call.metadata.get('Authorization')[0]
  console.log(authorizationHeader)
  if (!authorizationHeader) throw error
  if (!authorizationHeader.toString().startsWith('Bearer ')) throw error
  const token = authorizationHeader.toString().substring(7)
  if (token !== 'token') throw error
}

export { authServiceDefinition, authServiceHandlers, authenticate }
