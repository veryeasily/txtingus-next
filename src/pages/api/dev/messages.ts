// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Message from "@/models/message"
import Prompt from "@/models/prompt"
import type { NextApiRequest, NextApiResponse } from "next"
import { OpenAIApi, Configuration } from "openai"

type Data = {
  data?: { text: string }
  error?: { message: string }
}

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY }),
)

function buildMessagesParam(messages: Message[], prompt: Prompt) {
  const prevMessages = messages.map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }))
  return [
    { role: "system" as const, content: prompt.content },
    ...prevMessages,
  ]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const content: string = req.body.content
  if (!content) {
    return res.status(400).json({ error: { message: "No content provided" } })
  }

  const prompt = await Prompt.currentPrompt()
  await Message.query().insert({ role: "user", content })
  const messages = await Message.query();
  const resp = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: buildMessagesParam(messages, prompt),
    max_tokens: 80,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    n: 1,
    stream: false,
  })
  const text = resp.data.choices[0]?.message?.content
  if (!text) {
    return res
      .status(500)
      .json({ error: { message: "No text in OpenAI response" } })
  }

  res.status(200).json({ data: { text } })
}
