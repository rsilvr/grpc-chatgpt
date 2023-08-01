import { Server, ServerCredentials } from '@grpc/grpc-js'
import * as fs from 'fs'
import wrapServerWithReflection from 'grpc-node-server-reflection'
import { authServiceDefinition, authServiceHandlers } from './service/authService'
import { chatServiceDefinition, chatServiceHandlers } from './service/chatService'
import { userServiceDefinition, userServiceHandlers } from './service/userService'

const server = wrapServerWithReflection(new Server())
const credentials = ServerCredentials.createSsl(
  fs.readFileSync('./certificates/ca.crt'), 
  [{
    cert_chain: fs.readFileSync('./certificates/server.crt'),
    private_key: fs.readFileSync('./certificates/server.key')
  }]
)
server.addService(authServiceDefinition.auth.AuthService.service, authServiceHandlers)
server.addService(userServiceDefinition.user.UserService.service, userServiceHandlers)
server.addService(chatServiceDefinition.chat.ChatService.service, chatServiceHandlers)

server.bindAsync('0.0.0.0:4000', credentials, () => {
  server.start()
  console.log('server is running on 0.0.0.0:4000')
})
