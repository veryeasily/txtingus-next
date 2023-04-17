import { db } from "@/lib/db";
import { Prompt } from "@prisma/client";
import PromptControls from "./controls";
import Table from "./table";

export default async function Home() {
  const messages = await db.message.findMany();
  const prompt = (await db.prompt.findFirst()) as Prompt;

  return (
    <main className="flex min-h-screen max-w-3xl mx-auto">
      <section className="flex-1 p-8">
        <div className="flex flex-col items-center justify-start space-y-10">
          <h1 className="py-6 text-5xl font-black">@dingus</h1>
          <div className="w-full pb-6">
            <Table messages={messages} data-superjson />
          </div>
          {prompt && (
            <h2 className="text-3xl">
              <span className="font-bold">Prompt:</span> {prompt.content}
            </h2>
          )}
          <PromptControls className="w-full" />
        </div>
      </section>
    </main>
  );
}
