import { db } from "@/lib/db";
import { Prompt } from "@prisma/client";
import PromptControls from "./controls";
import { MessageTable, PromptTable } from "./table";

export default async function Home() {
  const messages = await db.message.findMany();
  const prompts = await db.prompt.findMany();
  const prompt = prompts[0];

  return (
    <main className="flex min-h-screen max-w-3xl mx-auto">
      <section className="flex items-center flex-1">
        <div className="flex flex-col justify-start flex-1 space-y-4">
          <section className="flex items-center flex-col pb-12 space-y-8">
            <h1 className="text-5xl font-black">@dingus</h1>
            <div className="w-full">
              <PromptTable prompts={prompts} />
            </div>
            <div className="w-full">
              <MessageTable messages={messages} />
            </div>
          </section>
          <div className="flex flex-col space-y-4">
            {prompt && (
              <h2 className="text-2xl">
                <span className="font-bold">Prompt:</span> {prompt.content}
              </h2>
            )}
            <PromptControls className="w-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
