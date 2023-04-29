import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { randomUUID } from 'crypto'
import wrapServerWithReflection from 'grpc-node-server-reflection'
import { join } from 'path'
import { ProtoGrpcType as UserServiceDefinition } from '../rpc/user'
import { UserServiceHandlers } from '../rpc/user/UserService'
// import { ProtoGrpcType as ChatService } from '../rpc/chat'

const packageDefinition = protoLoader.loadSync(join(__dirname, '../../proto/user.proto'))
const userServiceDefinition = loadPackageDefinition(packageDefinition) as unknown as UserServiceDefinition

const userServiceHandlers: UserServiceHandlers = {
  CreateUser: (call, callback) => {
    console.log('CreateUser', call.request)
    callback(null, { userId: randomUUID(), name: call.request.name })
  }
}

const server = wrapServerWithReflection(new Server())
server.addService(userServiceDefinition.user.UserService.service, userServiceHandlers)

server.bindAsync('0.0.0.0:4000', ServerCredentials.createInsecure(), () => {
  server.start()
  console.log('server is running on 0.0.0.0:4000')
})
