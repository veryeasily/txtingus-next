import Image from "next/image"
import { Inter } from "next/font/google"
import assert from "node:assert"
import Message from "@/models/message"
import Prompt from "@/models/prompt"
import { InferGetServerSidePropsType } from "next"

export const getServerSideProps = async function () {
  const messages = await Message.query()
  const prompt = await Prompt.query().first()
  assert(prompt, "No prompt found")
  return {
    props: {
      messages,
      prompt: prompt.toJSON(),
    },
  }
}

export default function Home({
  messages,
  prompt,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hello world!</div>
      <div>{prompt.content}</div>
      <div className="flex flex-col">
        {messages.map((message) => {
          return (
            <div key={message.id}>
              <div>{message.role}</div>
              <div>{message.content}</div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
