import { Status } from '@grpc/grpc-js/build/src/constants'

export class ApiError {
  message: string
  code: Status
  details?: any

  constructor(message: string, code: Status, details?: any) {
    this.message = message
    this.code = code,
    this.details = details
  }
}