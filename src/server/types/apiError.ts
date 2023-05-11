import { Status } from '@grpc/grpc-js/build/src/constants'

export class ApiError {
  message: string
  code: Status
  constructor(message: string, code: Status) {
    this.message = message
    this.code = code
  }
}