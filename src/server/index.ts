import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import * as fs from 'fs'
import wrapServerWithReflection from 'grpc-node-server-reflection'
import { join } from 'path'
import { ProtoGrpcType as ChatServiceDefinition } from '../rpc/chat'
import { ChatServiceHandlers } from '../rpc/chat/ChatService'
import { ProtoGrpcType as UserServiceDefinition } from '../rpc/user'
import { UserServiceHandlers } from '../rpc/user/UserService'
import { sendMessage } from './service/chatService'
import { createUser } from './service/userService'

const userPackage = protoLoader.loadSync(join(__dirname, '../../proto/user.proto'))
const userServiceDefinition = loadPackageDefinition(userPackage) as unknown as UserServiceDefinition

const userServiceHandlers: UserServiceHandlers = {
  CreateUser: (call, callback) => {
    createUser(call.request)
    .then(user => callback(null, user))
    .catch(error => callback(error))
  }
}

const chatPackage = protoLoader.loadSync(join(__dirname, '../../proto/chat.proto'))
const chatServiceDefinition = loadPackageDefinition(chatPackage) as unknown as ChatServiceDefinition

const chatServiceHandlers: ChatServiceHandlers = {
  GetChat: (call, callback) => {

  },
  SendMessage: (call) => {
    sendMessage(call.request, call)
    .then(() => call.end())
    .catch(error => {
      call.write({ error: { errorMessage: error.message, errorCode: error.code } })
      call.end()
    })
  }
}

const server = wrapServerWithReflection(new Server())
const credentials = ServerCredentials.createSsl(
  fs.readFileSync('./certificates/ca.crt'), 
  [{
    cert_chain: fs.readFileSync('./certificates/server.crt'),
    private_key: fs.readFileSync('./certificates/server.key')
  }]
)
server.addService(userServiceDefinition.user.UserService.service, userServiceHandlers)
server.addService(chatServiceDefinition.chat.ChatService.service, chatServiceHandlers)

server.bindAsync('0.0.0.0:4000', credentials, () => {
  server.start()
  console.log('server is running on 0.0.0.0:4000')
})
