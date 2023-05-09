import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import wrapServerWithReflection from 'grpc-node-server-reflection'
import { join } from 'path'
import { ProtoGrpcType as UserServiceDefinition } from '../rpc/user'
import { UserServiceHandlers } from '../rpc/user/UserService'
import { createUser } from './service/userService'
// import { ProtoGrpcType as ChatService } from '../rpc/chat'

const packageDefinition = protoLoader.loadSync(join(__dirname, '../../proto/user.proto'))
const userServiceDefinition = loadPackageDefinition(packageDefinition) as unknown as UserServiceDefinition

const userServiceHandlers: UserServiceHandlers = {
  CreateUser: (call, callback) => {
    createUser(call.request)
    .then(user => callback(null, user))
    .catch(error => callback(error))
  }
}

const server = wrapServerWithReflection(new Server())
server.addService(userServiceDefinition.user.UserService.service, userServiceHandlers)

server.bindAsync('0.0.0.0:4000', ServerCredentials.createInsecure(), () => {
  server.start()
  console.log('server is running on 0.0.0.0:4000')
})
