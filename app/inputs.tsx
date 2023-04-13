"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function PromptControls() {
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

    setMessage("")
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col text-red-400">
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
