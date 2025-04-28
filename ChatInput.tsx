
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, isLoading }: ChatInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = inputValue.trim();
    if (message && !isLoading) {
      onSendMessage(message);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 glassmorphism sticky bottom-0 mt-auto">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Send a message..."
          className="chat-input pr-10"
          disabled={isLoading}
        />
        
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-promptminds-primary hover:text-promptminds-primary/80 disabled:text-gray-500 transition-colors"
        >
          <Send className={`h-5 w-5 ${isLoading ? 'opacity-50' : ''}`} />
        </button>
      </div>
      
      <div className="mt-2 flex justify-between items-center">
        <div className="text-xs text-promptminds-text/70">
          {isLoading ? 'Processing...' : 'Powered by Gemini AI'}
        </div>
        
        <div className="flex items-center gap-1">
          <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
          <span className="text-xs text-promptminds-text/70">
            {isLoading ? 'Thinking' : 'Ready'}
          </span>
        </div>
      </div>
    </form>
  );
}

export default ChatInput;
