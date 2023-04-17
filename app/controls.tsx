"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

interface PromptControlsProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function PromptControls({
  className,
  ...rest
}: PromptControlsProps) {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: message }),
    });
    setMessage("");
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className={cn("flex text-red-400 border-2 border-white p-4", className)} {...rest}>
      <input
        type="text"
        value={message}
        className="px-4 py-2 flex-1"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="p-2 px-6 ml-4 border-2 border-white font-bold" onClick={handleClick}>Submit</button>
    </div>
  );
}
