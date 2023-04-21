import { db } from "@/lib/db";
import { PromptTable } from "../table";

export default async function Messages() {
  const prompts = await db.prompt.findMany();
  return (
    <div className="flex flex-1">
      {/* <MessageTable className="w-full h-full" messages={messages} /> */}
      <PromptTable className="w-full h-full" prompts={prompts} />
    </div>
  );
}
