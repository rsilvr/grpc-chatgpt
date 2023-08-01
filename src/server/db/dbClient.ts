import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'

export const dbClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: 'us-east-1', endpoint: 'http://localhost:8000' }), 
  { 
    marshallOptions: { convertClassInstanceToMap: true, removeUndefinedValues: true, convertEmptyValues: false },
    unmarshallOptions: { wrapNumbers: false }
  }
)