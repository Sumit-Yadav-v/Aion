"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const ChatUI = () => {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [micOn, setMicOn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { id: Date.now(), from: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: userMessage }),
});


      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: data.answer },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "bot", text: "⚠️ Error connecting to server." },
      ]);
    }
  };

  const toggleMic = () => setMicOn((prev) => !prev);
  const handleBackClick = () => router.back();

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-gray-200">
      
      {/* Header */}
      <header className=" flex items-center justify-between p-4 bg-black/80 text-white text-center text-2xl font-bold backdrop-blur-sm shadow-md">
        <button
          onClick={handleBackClick}
          aria-label="Go back"
          className="text-white hover:text-gray-400 transition"
        >
          &#8592;
        </button>
        <div className="text-4xl font-extrabold tracking-wide 
        bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 
        bg-[length:200%_100%] animate-shine text-transparent bg-clip-text ">AION</div>
        <div className="w-[60px]" />
      </header>

      {/* Messages */}
      <section className="flex-grow overflow-y-auto p-4 space-y-3">
        {messages.map(({ id, from, text }) => (
          <div
            key={id}
            className={`max-w-[80%] px-4 py-2 rounded-lg break-words ${
              from === "bot"
                ? "bg-transparent text-white self-start"
                : "bg-neutral-800 text-white self-end ml-auto"
            }`}
          >
            {text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </section>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-3 p-4 bg-black/80 backdrop-blur-sm"
      >
        {/* Mic Button
        <button
          type="button"
          onClick={toggleMic}
          className={`rounded-lg p-3 flex items-center justify-center transition-colors duration-300 ${
            micOn
              ? "bg-neutral-500 text-white"
              : "bg-neutral-800 text-white hover:bg-neutral-700"
          }`}
          aria-label="Toggle microphone"
        >
          {micOn ? "🎤" : "🎙️"}
        </button> */}

        {/* Text Input */}
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow rounded-lg bg-neutral-900 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Message input"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="relative px-6 py-3 rounded-lg font-semibold text-white bg-neutral-800 hover:bg-neutral-600 transition"
          aria-label="Send message"
        >
          <span className="relative z-10">Send</span>
        </button>
      </form>




      

    </main>
  );
};

export default ChatUI;
