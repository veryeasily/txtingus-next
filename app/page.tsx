import { db } from "@/lib/db";
import { Prompt } from "@prisma/client";
import PromptControls from "./inputs";
import Table from "./table";

export default async function Home() {
  const messages = await db.message.findMany();
  const prompt = (await db.prompt.findFirst()) as Prompt;

  return (
    <main className="flex min-h-screen container mx-auto bg-neutral-900">
      <section className="flex flex-col items-center justify-start flex-1 p-8">
        <div>@dingusbot</div>
        {prompt && <div>{prompt.content}</div>}
        <PromptControls />
        <Table className="pt-4" messages={messages} />
      </section>
    </main>
  );
}
