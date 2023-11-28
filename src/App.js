import React, { useState } from 'react';
import ChatBox from './ChatBox';
import './App.css';

function App() {
  const [user1Messages, setUser1Messages] = useState([]);
  const [user2Messages, setUser2Messages] = useState([]);
  const [user1Language, setUser1Language] = useState('en');
  const [user2Language, setUser2Language] = useState('hi');

  const translateMessage = async (message, targetLang) => {
    try {
      const response = await fetch('https://4452ufm5bl.execute-api.us-west-2.amazonaws.com/dev/translate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_text: message, dest: targetLang })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in translation:', error);
      return { translated_text: message }; // Fallback to original message on error
    }
  };

  const sendMessage = async (message, sender) => {
    const targetLang = sender === 'user1' ? user2Language : user1Language;
    const translationResult = await translateMessage(message, targetLang);

    const translatedMessage = translationResult.translated_text;
    const showMessage = targetLang !== 'en' ? `${translatedMessage} (${translationResult.pronunciation})` : translatedMessage;

    if (sender === 'user1') {
      setUser1Messages([...user1Messages, message]);
      setUser2Messages([...user2Messages, showMessage]);
    } else {
      setUser2Messages([...user2Messages, message]);
      setUser1Messages([...user1Messages, showMessage]);
    }
  };

  return (
    <div className="app">
      <ChatBox 
        messages={user1Messages} 
        onSendMessage={(msg) => sendMessage(msg, 'user1')} 
        onLanguageChange={setUser1Language}
        preferredLanguage={user1Language}
        title="User 1"
      />
      <ChatBox 
        messages={user2Messages} 
        onSendMessage={(msg) => sendMessage(msg, 'user2')} 
        onLanguageChange={setUser2Language}
        preferredLanguage={user2Language}
        title="User 2"
      />
    </div>
  );
}

export default App;
