import Image from "next/image"
import { Inter } from "next/font/google"
import assert from "node:assert"
import { db } from "@/lib/db";
import { InferGetServerSidePropsType } from "next"
import { useState } from "react"
import { Prompt } from "@prisma/client";
import superjson from "superjson";

export const getServerSideProps = async function () {
  const messages = await db.message.findMany();
  const prompt = await db.prompt.findFirst() as Prompt;
  assert(prompt, "No prompt found")
  return {
    props: {
      messages,
      prompt,
    },
  }
}

export default function Home({
  messages,
  prompt,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [message, setMessage] = useState("")
  const handleClick = () => {
    fetch("/api/dev/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hello world!</div>
      <div>{prompt.content}</div>
      <div className="flex flex-col">
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleClick}>Submit</button>
      </div>
      <div className="flex flex-col">
        {messages.map((message) => {
          return (
            <div key={message.id} className="flex">
              <div className="px-8">{message.role}</div>
              <div>{message.content}</div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
