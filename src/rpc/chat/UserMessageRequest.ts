// Original file: proto/chat.proto


export interface UserMessageRequest {
  'userId'?: (string);
  'messageText'?: (string);
  'chatId'?: (string);
}

export interface UserMessageRequest__Output {
  'userId': (string);
  'messageText': (string);
  'chatId': (string);
}
