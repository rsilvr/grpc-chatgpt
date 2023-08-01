import { Status } from '@grpc/grpc-js/build/src/constants'
import { ApiError } from '../types/apiError'

export const checkRequired = (obj: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter((field) => !obj[field])
  if (missingFields.length > 0) {
    throw new ApiError(`Missing fields: ${missingFields.join(', ')}`, Status.INVALID_ARGUMENT)
  }
}

export const logRequest = (name: string, call: any) => {
  console.log(`${name} request: ${JSON.stringify(call.request)}`)
}

export const logResponse = (name: string, response: any) => {
  console.log(`${name} response: ${JSON.stringify(response)}`)
  return response
}

export const logError = (name: string, error: any) => {
  console.log(`${name} error: ${JSON.stringify(error)}`)
  return error
}