import React, { useState } from 'react';

function ChatBox({ messages, onSendMessage, onLanguageChange, preferredLanguage, title, userClass }) {
  const [currentMessage, setCurrentMessage] = useState('');

  const handleSend = () => {
    onSendMessage(currentMessage);
    setCurrentMessage('');
  };

  return (
    <div className="chat-box">
      <h2>{title}</h2>
      <select value={preferredLanguage} onChange={(e) => onLanguageChange(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="te">Telugu</option>
        <option value="ta">Tamil</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <div className="messages">
        {messages.map((msg, idx) => (
          <p key={idx} className={`message ${userClass}`}>{msg}</p>
        ))}
      </div>
      <div className="input-area">
        <input 
          type="text" 
          value={currentMessage} 
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default ChatBox;
