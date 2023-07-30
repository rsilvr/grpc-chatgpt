import { Status } from '@grpc/grpc-js/build/src/constants'

// https://grpc.github.io/grpc/cpp/md_doc_statuscodes.html
export class ApiError {
  message: string
  code: Status
  details?: any

  constructor(message: string, code: Status, details?: any) {
    this.message = message
    this.code = code
    this.details = details
  }
}