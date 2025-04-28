
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Bell } from 'lucide-react';

const Notification = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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

  // Example notification data
  const notifications = [
    {
      id: 1,
      title: 'Welcome to Prompt Minds Chat',
      message: 'Thanks for using our AI chat application!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: false
    },
    {
      id: 2,
      title: 'API Key Updated',
      message: 'Your Gemini API key was successfully updated.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true
    },
    {
      id: 3,
      title: 'New Features Available',
      message: 'Check out the new chat features we\'ve added!',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      read: true
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className="flex-1 md:ml-64 p-4">
          <div className="glassmorphism rounded-lg p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-promptminds-primary" />
                <h1 className="text-xl font-bold text-promptminds-text">Notifications</h1>
              </div>
              <span className="text-xs bg-promptminds-primary/20 text-promptminds-primary px-2 py-1 rounded-full">
                {notifications.filter(n => !n.read).length} new
              </span>
            </div>
            
            <div className="space-y-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 rounded-md border-l-4 ${notification.read ? 'border-l-gray-500 glassmorphism opacity-70' : 'border-l-promptminds-primary glassmorphism'}`}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-promptminds-text">{notification.title}</h3>
                      <span className="text-xs text-promptminds-text/70">
                        {notification.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-promptminds-text/80 mt-1">{notification.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <Bell className="h-10 w-10 text-promptminds-text/30 mx-auto mb-2" />
                  <p className="text-promptminds-text/50">No notifications yet</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notification;
