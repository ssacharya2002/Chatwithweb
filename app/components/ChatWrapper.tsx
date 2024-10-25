"use client";

import { useChat } from "ai/react";
import Messages from "./Messages";
import { ChatInput } from "./ChatInput";

function ChatWrapper({ sessionid }: { sessionid: string }) {
  const { messages, handleInputChange, input, handleSubmit, setInput } =
    useChat({
      api: "/api/chat-stream",
      body: {
        sessionid,
      },
    });

  return (
    <div className="relative min-h-full bg-zinc-900 flex divide-y divide-zinc-700 flex-col justify-between gap-2">
      <div className="flex-1 text-black bg-zinc-800 justify-between flex flex-col ">
        <Messages messages={messages} />
      </div>

      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        setInput={setInput}
      />
    </div>
  );
}

export default ChatWrapper;
