# gRPC ChatGPT API

## Before you start

- Setup your parameters in an `.env` file

```dotenv
API_KEY=your_openai_api_key
OPEN_AI_MODEL=gpt-3.5-turbo
CHAT_TEMPERATURE=0
CHAT_ANSWER_MAX_TOKENS=500
```

- Provide your server certificate files in the directory `./certificates`. In the file `example_certificates.zip` you can find a self-signed one, including a private and public key and a CA public certificate.

- Install: `yarn`.

## Start the server

- Run: `yarn start`.

## To update stub files

- After changing your proto files, you can generate updated stub files running `yarn gen`.
