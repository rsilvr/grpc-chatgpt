import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import { Message } from '../types/chatTypes'

import { inspect } from 'util'

let openAiApi: OpenAIApi

interface OpenAiMessageChunk {
  id: string
  object: string
  created: number
  model: string
  choices: OpenAiMessageChunkChoice[]
}

interface OpenAiMessageChunkChoice {
  index: number
  finish_reason: string
  delta: {
    content?: string
    role?: string
  }
}

interface AnswerChunk {
  messageId: string
  startedAt: number
  chunkText: string
}

type AnswerChunkHandler = (chunk: AnswerChunk) => void

dotenv.config()

const getApiClient = (): OpenAIApi => {
  openAiApi = openAiApi ?? new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
  }))
  return openAiApi
}

export const getAnswer = async (chatMessages: Message[], onChunkReceived: AnswerChunkHandler): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const response = await getApiClient().createChatCompletion({
      model: process.env.OPEN_AI_MODEL!,
      messages: chatMessages.map(message => ({ role: message.messageType, content: message.messageText })),
      temperature: Number(process.env.CHAT_TEMPERATURE),
      max_tokens: Number(process.env.CHAT_ANSWER_MAX_TOKENS),
      stream: true
    }, { responseType: 'stream' })
    const stream = response.data as any
    stream.on('data', (data: Buffer) => {
      const fullContent = data.toString()
      const chunk = formatAndFlatAnswerChunks(fullContent)
      if (chunk) onChunkReceived(chunk)
    })
    stream.on('error', (error: any) => {
      console.log(inspect({ error }, { depth: null, colors: true, compact: false }))
      reject(error)
    })
    stream.on('end', resolve)
  })
}

const formatAndFlatAnswerChunks = (fullChunkContent: string): AnswerChunk | undefined => {
  const formattedChunk = fullChunkContent.split('data:')
  .map(str => str.replace('[DONE]', '')
  .replaceAll(/\n/gi, '').trim())
  .filter(str => str.length > 0)
  .map(str => JSON.parse(str) as unknown as OpenAiMessageChunk)
  .filter(chunk => {
    const content = chunk.choices?.[0]?.delta?.content
    return content && content.length > 0
  })
  .reduce((acc, chunk) => {
    acc.messageId = chunk.id
    acc.startedAt = chunk.created * 1000
    acc.chunkText += chunk.choices[0].delta.content!
    return acc
  }, { chunkText: '' } as AnswerChunk)
  return formattedChunk.chunkText.length > 0 ? formattedChunk : undefined
}