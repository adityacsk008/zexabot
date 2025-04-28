
import React from 'react';
import { Menu, Settings, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 glassmorphism border-b border-promptminds-primary/20 py-3">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden text-promptminds-primary hover:bg-promptminds-primary/20"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-promptminds-primary animate-pulse-glow" />
              <h1 className="logo-text">Prompt Minds Chat</h1>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-promptminds-text hover:text-promptminds-primary hover:bg-promptminds-primary/10"
            asChild
          >
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
