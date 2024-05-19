import React, { useState, useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';

const Chat = ({ gameId, messages }) => {
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { gameId, message });
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
