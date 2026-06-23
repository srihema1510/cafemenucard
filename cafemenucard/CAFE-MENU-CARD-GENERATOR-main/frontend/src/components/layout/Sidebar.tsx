import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, LayoutTemplate, Settings, LogOut, Coffee } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { logout } from '../../api/auth';
import { cn } from '../../lib/utils';

export default function Sidebar() {
  const user = useAuthStore(state => state.user);
  const setLogout = useAuthStore(state => state.logout);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setLogout();
    } catch (err) {
      console.error(err);
      setLogout();
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Menu', path: '/menu', icon: FileText },
    { name: 'Templates', path: '/templates', icon: LayoutTemplate },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border flex-col hidden md:flex">
      <div className="p-6 flex items-center space-x-3 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Coffee className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg text-foreground tracking-tight">Cafe Menu</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center mb-4 px-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-medium text-xs mr-3">
            {user?.email?.[0].toUpperCase() || 'A'}
          </div>
          <div className="text-sm font-medium truncate text-foreground">{user?.email}</div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center space-x-3 px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
