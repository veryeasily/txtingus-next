import { db } from "@/lib/db";
import { Prompt } from "@prisma/client";
import PromptControls from "./controls";
import { MessageTable, PromptTable } from "./table";

export default async function Home() {
  const messages = await db.message.findMany();
  const prompts = await db.prompt.findMany();
  const prompt = prompts[0];

  return (
    <main className="flex mx-auto flex-1 space-x-8">
      <PromptTable
        flex={1}
        prompts={prompts}
        dataGridProps={{ className: "bg-red-500 bg-opacity-10" }}
      />
      <MessageTable
        flex={1}
        messages={messages}
        dataGridProps={{ className: "bg-blue-500 bg-opacity-10" }}
      />
    </main>
  );
}
