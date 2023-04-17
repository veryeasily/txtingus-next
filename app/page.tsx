import { db } from "@/lib/db";
import { Prompt } from "@prisma/client";
import PromptControls from "./controls";
import Table from "./table";

export default async function Home() {
  const messages = await db.message.findMany();
  const prompt = (await db.prompt.findFirst()) as Prompt;

  return (
    <main className="flex min-h-screen max-w-3xl mx-auto">
      <section className="flex items-center flex-1 p-8">
        <div className="flex flex-col justify-start flex-1 space-y-4">
          <section className="flex items-center flex-col pb-12">
            <h1 className="pb-10 text-5xl font-black">@dingus</h1>
            <div className="w-full">
              <Table messages={messages} data-superjson />
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
