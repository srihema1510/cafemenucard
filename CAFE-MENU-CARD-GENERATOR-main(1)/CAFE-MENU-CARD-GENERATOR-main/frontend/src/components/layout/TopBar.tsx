import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useMenuStore } from '../../store/menuStore';

export default function TopBar() {
  const location = useLocation();
  const cafeInfo = useMenuStore(state => state.cafeInfo);
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/dashboard')) return 'Dashboard';
    if (location.pathname.startsWith('/menu')) return 'Menu Management';
    if (location.pathname.startsWith('/templates')) return 'Templates Gallery';
    if (location.pathname.startsWith('/settings')) return 'Settings';
    return '';
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center">
        <button className="md:hidden mr-4 text-muted-foreground hover:text-foreground">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">{getPageTitle()}</h1>
      </div>
      <div className="flex items-center text-sm font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border">
        {cafeInfo?.cafe_name || 'Loading...'}
      </div>
    </header>
  );
}
