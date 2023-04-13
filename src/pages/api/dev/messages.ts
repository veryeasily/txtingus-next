// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { OpenAIApi, Configuration } from "openai"
import { db } from "@/utils/db"
import { Message, Prompt } from "@prisma/client"

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
  return [{ role: "system" as const, content: prompt.content }, ...prevMessages]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: { message: "Method not allowed" } })
  }

  const content: string = req.body.content
  if (!content) {
    return res.status(400).json({ error: { message: "No content provided" } })
  }

  const prompt = await db.prompt.findFirst()
  if (!prompt) {
    return res.status(500).json({ error: { message: "No prompt found" } })
  }

  await db.message.create({ data: { role: "user", content } })
  const messages = await db.message.findMany()
  const resp = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: buildMessagesParam(messages, prompt),
    max_tokens: 80,
    temperature: 0.9,
    top_p: 1,
    presence_penalty: 0.6,
    n: 1,
    stream: false,
  })
  const text = resp.data.choices[0]?.message?.content
  if (!text) {
    return res
      .status(500)
      .json({ error: { message: "No text in OpenAI response" } })
  }

  console.log("got back response from OpenAI!", text)
  await db.message.create({ data: { role: "assistant", content: text } })
  res.status(200).json({ data: { text } })
}
