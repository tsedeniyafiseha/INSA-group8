import React, { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi"; 
import { IoClose } from "react-icons/io5"; 
import { BsChatTextFill } from "react-icons/bs"; 

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! I am SCNAS Chatbot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Thanks for your message! I'm still in development, so I'm not able to answer questions yet." },
      ]);
    }, 1000);
  };

  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed right-6 bottom-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-tl-3xl rounded-tr-none rounded-bl-3xl rounded-br-3xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <img
            src="/images/bot.png"
            alt="bot"
            className="w-12 h-12 object-contain"
          />
        </button>
      )}

      {isOpen && (
        <div className="w-[90vw] max-w-sm h-[70vh] sm:w-96 sm:h-[500px] bg-white border-gray-200 rounded-lg shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-200 p-3 font-semibold text-gray-700">
            SCNAS Chatbot
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Close chat"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "ai" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 text-white text-sm md:text-base rounded-2xl shadow-md ${
                    msg.type === "ai"
                      ? "bg-gradient-to-r from-blue-500 to-green-500 rounded-bl-none"
                      : "bg-gradient-to-r from-green-500 to-blue-500 rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-300 flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 bg-gradient-to-r from-[#cdd7eb] to-[#acf0d9] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-blue-700 transition-colors"
              aria-label="Send message"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
