// loads openai and configures it to use the chat completion endpoint

import Message from "@/models/message"
import Prompt from "@/models/prompt"
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function chatCompletion(prompt: Prompt, messages: Message[]) {
  const messagePrompts = messages.map((message) => {
    return {
      role: message.role as "user" | "assistant",
      content: message.content,
    }
  })
  const final = [
    { role: "system" as const, content: prompt.content },
    ...messagePrompts,
  ]
  return openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: final,
    max_tokens: 80,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    n: 1,
    stream: false,
  })
}
