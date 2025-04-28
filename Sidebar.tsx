
import React from 'react';
import { MessageCircle, Settings, User, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  
  return (
    <aside
      className={`
        fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-40 bg-black/70 backdrop-blur-md
        transform transition-transform duration-300 ease-in-out border-r border-promptminds-primary/20
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
    >
      <div className="flex flex-col h-full p-4">
        <div className="py-4 border-b border-promptminds-primary/20">
          <h2 className="text-promptminds-primary font-semibold mb-3">Navigation</h2>
          <nav className="space-y-1">
            <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}>
              <MessageCircle className="h-4 w-4" />
              <span>Chat</span>
            </Link>
            <Link to="/profile" className={`sidebar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Link>
            <Link to="/notifications" className={`sidebar-link ${location.pathname === '/notifications' ? 'active' : ''}`}>
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </Link>
            <Link to="/settings" className={`sidebar-link ${location.pathname === '/settings' ? 'active' : ''}`}>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>
        
        <div className="py-4">
          <h2 className="text-promptminds-primary font-semibold mb-3">Recent Chats</h2>
          <div className="space-y-2">
            <div className="p-2 rounded-md hover:bg-promptminds-primary/10 cursor-pointer transition-all">
              <p className="text-sm font-medium">Space Exploration</p>
              <p className="text-xs text-promptminds-text/70 truncate">What are the challenges of Mars colonization?</p>
            </div>
            <div className="p-2 rounded-md hover:bg-promptminds-primary/10 cursor-pointer transition-all">
              <p className="text-sm font-medium">AI Ethics</p>
              <p className="text-xs text-promptminds-text/70 truncate">Discuss the ethical implications of AI</p>
            </div>
            <div className="p-2 rounded-md hover:bg-promptminds-primary/10 cursor-pointer transition-all">
              <p className="text-sm font-medium">Quantum Computing</p>
              <p className="text-xs text-promptminds-text/70 truncate">How do quantum computers work?</p>
            </div>
          </div>
        </div>
        
        <div className="mt-auto">
          <div className="glassmorphism rounded-lg p-3">
            <p className="text-xs text-promptminds-primary mb-2">API Key Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs">Connected to Gemini API</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
