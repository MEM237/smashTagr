// src/components/VTTX/VTTXTextInput.jsx
import React, { useState } from "react";

export default function VTTXTextInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend?.(text.trim());
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    // Allows sending with Shift + Enter
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault(); // Prevent new line on shift+enter send
      handleSend();
    }
  };

  return (
    <div className="w-full h-full bg-[#1a1a1a] rounded-[30px] border border-yellow-400 p-4 flex flex-col justify-between">
      
      {/* ADDED: A label for accessibility. The `sr-only` class visually hides it 
          but keeps it available for screen readers. */}
      <label htmlFor="vttx-message-input" className="sr-only">
        Message Input
      </label>

      <textarea
        // --- THIS IS THE FIX ---
        id="vttx-message-input" // Added a unique id
        name="vttx-message"     // Added a name
        // -----------------------
        className="flex-grow resize-none p-2 rounded-[10px] bg-black text-white border border-gray-700 outline-none overflow-y-auto"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress} // Added for Shift+Enter functionality
        placeholder="Type something... (Shift + Enter to send)"
      />
      <button
        className="mt-3 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}