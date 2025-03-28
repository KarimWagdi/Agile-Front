"use client";
import { useState } from "react";

export default function Chat() {
  const members = ["Alice", "Bob", "Charlie", "David"]; 
  const [currentChat, setCurrentChat] = useState("Group Chat");
  const [messages, setMessages] = useState({
    "Group Chat": [
      { id: 1, sender: "Alice", text: "Hey team! Let's sync up.", time: "10:30 AM" },
      { id: 2, sender: "You", text: "Sure! What's the update?", time: "10:32 AM" },
    ],
    Alice: [{ id: 1, sender: "Alice", text: "Can you check the latest PR?", time: "9:00 AM" }],
    Bob: [{ id: 1, sender: "Bob", text: "How's the backend coming along?", time: "9:45 AM" }],
    Charlie: [{ id: 1, sender: "Charlie", text: "Did you review the docs?", time: "10:00 AM" }],
    David: [{ id: 1, sender: "David", text: "Any updates on the UI?", time: "10:15 AM" }],
  });
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = { id: messages[currentChat].length + 1, sender: "You", text: newMessage, time: "Now" };
    setMessages({ ...messages, [currentChat]: [...messages[currentChat], newMsg] });
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 border-r border-gray-300">
        <h2 className="text-2xl font-bold text-black mb-4">Chats</h2>
        <div className="space-y-2">
          {/* Group Chat */}
          <button
            className={`w-full text-left p-3 rounded-lg font-medium ${
              currentChat === "Group Chat" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setCurrentChat("Group Chat")}
          >
            Group Chat
          </button>
          {/* Private Chats */}
          {members.map((member) => (
            <button
              key={member}
              className={`w-full text-left p-3 rounded-lg font-medium ${
                currentChat === member ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
              onClick={() => setCurrentChat(member)}
            >
              {member}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-black">{currentChat}</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages[currentChat].map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "You" ? "justify-end" : ""}`}>
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "You" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
                <p className="text-xs mt-1 opacity-80">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t border-gray-300 flex items-center">
          <input
            type="text"
            className="flex-1 p-3 border rounded-lg text-lg text-black bg-gray-100 outline-none"
            placeholder={`Message ${currentChat}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="ml-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
