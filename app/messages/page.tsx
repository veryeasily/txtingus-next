import { db } from "@/lib/db";
import { MessageTable } from "../table";

export default async function Messages() {
  const messages = await db.message.findMany();
  return (
    <div className="flex flex-1">
      <MessageTable className="w-full h-full" messages={messages} />
    </div>
  );
}
