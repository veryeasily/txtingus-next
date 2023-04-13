import assert from "node:assert";
import { db } from "@/utils/db";
import { Prompt } from "@prisma/client";
import PromptControls from "./inputs";

export default async function Home() {
  const messages = await db.message.findMany();
  const prompt = (await db.prompt.findFirst()) as Prompt;

  return (
    <main className="flex min-h-screen">
      <section className="flex flex-col items-center justify-between flex-1 p-8">
        <div>Hello world!</div>
        {prompt && <div>{prompt.content}</div>}
        <PromptControls />
        <div className="flex flex-col">
          {messages.map((message) => {
            return (
              <div key={message.id} className="flex">
                <div className="px-8">{message.role}</div>
                <div>{message.content}</div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
