
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Button } from '@/components/ui/button';
import { useChat } from '../context/ChatContext';
import { User } from 'lucide-react';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { hasApiKey } = useChat();

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
          <div className="glassmorphism rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-promptminds-primary/20 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-promptminds-primary" />
              </div>
              <h1 className="text-2xl font-bold text-promptminds-text">User Profile</h1>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-promptminds-primary mb-2">Account Information</h2>
                <div className="glassmorphism border-t border-promptminds-primary/20 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-promptminds-text/70">Display Name</span>
                    <span className="text-promptminds-text">Prompt Minds User</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-promptminds-text/70">API Key Status</span>
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 ${hasApiKey ? 'bg-green-400' : 'bg-red-400'} rounded-full`}></div>
                      <span className="text-promptminds-text">{hasApiKey ? 'Connected' : 'Not Connected'}</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-promptminds-primary mb-2">Preferences</h2>
                <div className="glassmorphism border-t border-promptminds-primary/20 p-4 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-promptminds-text">Enable Chat History</span>
                    <Button variant="outline" size="sm" className="border-promptminds-primary/50 hover:bg-promptminds-primary/20">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-promptminds-text">Clear All Conversations</span>
                    <Button variant="destructive" size="sm">Clear</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;
