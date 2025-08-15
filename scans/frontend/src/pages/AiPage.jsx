import React, { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! I am SCNAS Chatbot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");

    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Thanks for your message!" },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed right-6 bottom-6  z-50">
      {}
      {!isOpen && (
        <div className="fixed right-6 bottom-6 z-50">
  {}
  {!isOpen && (
    <div className="relative flex items-center justify-center w-12 h-12">
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-12 h-12 rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
      >
        <img
          src="/images/bot.png"
          alt="bot"
          className="w-15 h-15 object-contain"
        />
      </button>
    </div>
  )}
</div>

      )}

      {}
      {isOpen && (
        <div className="w-96 h-[500px] bg-white border-gray-200 rounded-lg shadow flex flex-col overflow-hidden mt-4">
          {}
          <div className="bg-gray-200 p-3 font-poppins font-semibold text-gray-700">
            SCNAS Chatbot
          </div>

          {}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "ai" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 text-gray-800 ${
                    msg.type === "ai"
                      ? "bg-gradient-to-r from-blue-400 to-green-400 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg"
                      : "bg-gradient-to-r from-green-400 to-blue-400 rounded-tr-none rounded-tl-lg rounded-br-lg rounded-bl-lg"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {}
          <div className="p-3 border-t border-gray-300 flex gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 px-2 py-2 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
