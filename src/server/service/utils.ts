import { Status } from '@grpc/grpc-js/build/src/constants'
import { ApiError } from '../types/apiError'

export const checkRequired = (obj: any, requiredFields: string[]) => {
  const missingFields = requiredFields.filter((field) => !obj[field])
  if (missingFields.length > 0) {
    throw new ApiError(`Missing fields: ${missingFields.join(', ')}`, Status.INVALID_ARGUMENT)
  }
}