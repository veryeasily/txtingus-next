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
    <div className={cn("flex flex-col text-red-400", className)} {...rest}>
      <input
        type="text"
        value={message}
        className="px-4 py-2"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
