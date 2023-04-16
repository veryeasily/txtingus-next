import { OpenAIApi, Configuration } from "openai"
import { db } from "@/lib/db"
import { Message, Prompt } from "@prisma/client"
import { NextResponse } from "next/server"

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

export async function POST(request: Request) {
  const content: string = (await request.json())?.content
  if (!content) {
    return NextResponse.json({ error: { text: "No content provided." }}, { status: 400 })
  }

  const prompt = await db.prompt.findFirst()
  if (!prompt) {
    return NextResponse.json({ error: { message: "No prompt found" } }, { status: 500 })
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
    return NextResponse.json({ error: { message: "No text returned from OpenAI" } }, { status: 500 })
  }

  console.log("got back response from OpenAI!", text)
  await db.message.create({ data: { role: "assistant", content: text } })
  return NextResponse.json({ data: { text } })
}
