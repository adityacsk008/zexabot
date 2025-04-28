
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { useChat } from '../context/ChatContext';
import ApiKeyModal from '../components/ApiKeyModal';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const { toast } = useToast();
  const { hasApiKey, clearApiKey } = useChat();
  
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

  const handleClearLocalStorage = () => {
    localStorage.clear();
    toast({
      title: "Cleared",
      description: "All chat history has been cleared",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 md:ml-64 p-4">
          <div className="glassmorphism rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <SettingsIcon className="h-5 w-5 text-promptminds-primary" />
              <h1 className="text-xl font-bold text-promptminds-text">Settings</h1>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-promptminds-primary mb-3">API Configuration</h2>
                <div className="glassmorphism border-t border-promptminds-primary/20 p-4 rounded-md">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    <div>
                      <h3 className="text-promptminds-text font-medium mb-1">Gemini API Key</h3>
                      <p className="text-sm text-promptminds-text/70">
                        {hasApiKey ? 'API key is set and ready to use' : 'No API key set'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setApiKeyModalOpen(true)}
                        variant="outline" 
                        className="border-promptminds-primary/50 hover:bg-promptminds-primary/20"
                      >
                        {hasApiKey ? 'Update Key' : 'Add Key'}
                      </Button>
                      {hasApiKey && (
                        <Button 
                          onClick={clearApiKey}
                          variant="destructive"
                        >
                          Remove Key
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-promptminds-primary mb-3">Chat Preferences</h2>
                <div className="glassmorphism border-t border-promptminds-primary/20 p-4 rounded-md space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    <div>
                      <h3 className="text-promptminds-text font-medium mb-1">Chat History</h3>
                      <p className="text-sm text-promptminds-text/70">
                        Delete all saved chat conversations
                      </p>
                    </div>
                    <Button 
                      onClick={handleClearLocalStorage}
                      variant="destructive"
                    >
                      Clear History
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <ApiKeyModal 
        isOpen={apiKeyModalOpen} 
        onClose={() => setApiKeyModalOpen(false)} 
      />
    </div>
  );
}

export default Settings;
