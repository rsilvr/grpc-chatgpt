import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import { inspect } from 'util'

dotenv.config()

const config = new Configuration({
  apiKey: process.env.API_KEY
})

const openai = new OpenAIApi(config)

// {
//   message: {
//     id: 'chatcmpl-77bP3rR5HIIY5BvoJy0twUrYxfy1j',
//     object: 'chat.completion.chunk',
//     created: 1682046429,
//     model: 'gpt-3.5-turbo-0301',
//     choices: [
//       {
//         delta: { content: ' kilometers' }, // or { role: 'assistant' }
//         index: 0,
//         finish_reason: null
//       }
//     ]
//   }
// }

await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You\'re an useful assistant. Keep your answers as short and objective as possible' },
      // { role: "user", content: "Who are you?" }, 
      { role: "user", content: "What is the distance from Earth to the Moon?" }, 
      { role: 'assistant', content: 'The average distance from the center of the Earth to the center of the Moon is about 238,855 miles (384,400 kilometers).' },
      { role: 'user', content: 'And to the Sun?' }
    ],
    temperature: 0,
    max_tokens: 100,
    // stream: true
  }, 
  // { responseType: 'stream' }
)
.then(response => {
  console.log(inspect({ response: response.data }, { depth: null, colors: true }))
})
// .then((response) => {
//   const stream = response.data as any
//   stream.on('data', (data: Buffer) => {
//     const fullContent = data.toString()
//     console.log(inspect({ fullContent }, { depth: null, colors: true }))
//     const messages = fullContent.split('data:').map(str => str.replace('[DONE]', '').replaceAll(/\n/gi, '').trim()).filter(str => str.length > 0).map(str => JSON.parse(str))
//     for(const message of messages) {
//       console.log(inspect({ message }, { depth: null, colors: true }))
//     }
//   })
// })
.catch(error => {
  console.error(error)
})