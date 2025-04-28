
import React, { useEffect, useRef, useState } from 'react';
import { User, Sparkles } from 'lucide-react';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(message.sender === 'ai');
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (message.sender === 'ai') {
      let currentText = '';
      const textToType = message.content;
      let index = 0;
      
      const typingInterval = setInterval(() => {
        if (index < textToType.length) {
          currentText += textToType[index];
          setDisplayText(currentText);
          index++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15); // Adjust typing speed here (lower = faster)
      
      return () => clearInterval(typingInterval);
    } else {
      setDisplayText(message.content);
      setIsTyping(false);
    }
  }, [message]);
  
  useEffect(() => {
    if (messageRef.current && !isTyping) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isTyping]);

  return (
    <div 
      ref={messageRef}
      className={`message flex items-start gap-2 ${
        message.sender === 'user' ? 'user-message' : 'ai-message'
      }`}
    >
      <div className={`min-w-8 h-8 rounded-full flex items-center justify-center ${
        message.sender === 'user' 
          ? 'bg-promptminds-secondary/50' 
          : 'bg-promptminds-primary/30'
      }`}>
        {message.sender === 'user' 
          ? <User className="h-4 w-4" /> 
          : <Sparkles className="h-4 w-4 text-promptminds-primary" />
        }
      </div>
      
      <div className="flex-1">
        <div className="text-xs text-promptminds-text/70 mb-1">
          {message.sender === 'user' ? 'You' : 'Prompt Minds AI'} • {' '}
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        <div className="text-sm">
          {displayText}
          {isTyping && <span className="typing-indicator"></span>}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
