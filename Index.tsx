
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import ApiKeyModal from '../components/ApiKeyModal';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const { hasApiKey } = useChat();
  
  // Check if API key is set on page load
  useEffect(() => {
    if (!hasApiKey) {
      setApiKeyModalOpen(true);
    }
  }, [hasApiKey]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.querySelector('aside');
      const isMobile = window.innerWidth < 768;
      
      if (sidebar && isMobile && sidebarOpen && !sidebar.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 md:ml-64 p-4">
          {!hasApiKey && (
            <div className="mb-4 p-3 glassmorphism rounded-lg flex items-center justify-between">
              <span className="text-sm">Set your Gemini API key to start chatting</span>
              <Button 
                onClick={() => setApiKeyModalOpen(true)}
                variant="outline" 
                size="sm"
                className="border-promptminds-primary/50 hover:bg-promptminds-primary/20"
              >
                <Settings className="h-4 w-4 mr-2" />
                Set API Key
              </Button>
            </div>
          )}
          
          <ChatContainer />
        </main>
      </div>
      
      <ApiKeyModal 
        isOpen={apiKeyModalOpen} 
        onClose={() => setApiKeyModalOpen(false)} 
      />
    </div>
  );
}

export default Index;
