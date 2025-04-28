
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '../context/ChatContext';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal = ({ isOpen, onClose }: ApiKeyModalProps) => {
  const { setApiKey, hasApiKey, clearApiKey } = useChat();
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputKey.trim()) {
      setApiKey(inputKey.trim());
      setInputKey('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glassmorphism border-promptminds-primary/30 text-promptminds-text">
        <DialogHeader>
          <DialogTitle className="text-promptminds-primary">Gemini API Key</DialogTitle>
          <DialogDescription>
            {hasApiKey 
              ? "Your API key is securely stored. You can update or remove it."
              : "Enter your Gemini API key to continue. This will be stored locally in your browser."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="api-key" className="text-sm font-medium">
              API Key
            </label>
            <Input
              id="api-key"
              type="password"
              placeholder="Enter your Gemini API key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="bg-muted/50 border-promptminds-primary/20 focus:border-promptminds-primary focus:ring-promptminds-primary/30"
            />
          </div>
          
          <div className="text-xs text-promptminds-text/70">
            <p>Your API key is stored only in your browser's local storage.</p>
            <p className="mt-1">You can get a Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-promptminds-primary hover:underline">Google AI Studio</a>.</p>
          </div>
        </form>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {hasApiKey && (
            <Button 
              variant="destructive" 
              onClick={clearApiKey}
              className="w-full sm:w-auto"
            >
              Remove Key
            </Button>
          )}
          
          <Button 
            type="submit" 
            onClick={handleSubmit} 
            disabled={!inputKey.trim()}
            className="glowing-btn w-full sm:w-auto"
          >
            {hasApiKey ? 'Update Key' : 'Save Key'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
