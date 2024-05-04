
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const { lawyer, client } = location.state;
  console.log("lawyer is ", lawyer)
  console.log("client is ", client)

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    setMessages([...messages, { text: newMessage, sender: 'client' }]);
    setNewMessage('');

    // Send message to backend API
    fetch('http://localhost:8800/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newMessage, sender: 'client', lawyerId: lawyer._id, clientId: client._id }),
    });
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Chat</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {messages.map((message, index) => (
            <p key={index} className="text-gray-600 mb-2">
              {message.text} ({message.sender})
            </p>
          ))}
        </div>
        <div>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;