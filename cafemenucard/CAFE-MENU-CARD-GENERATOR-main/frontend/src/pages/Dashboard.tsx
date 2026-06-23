import React from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import { Layers, Coffee, FileText, IndianRupee } from 'lucide-react';
import { useMenuStore } from '../store/menuStore';

export default function Dashboard() {
  const { isLoading } = useMenu();
  const { categories, menuItems, cafeInfo } = useMenuStore();

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading dashboard...</div>;
  }

  const stats = [
    { name: 'Total Categories', value: categories.length, icon: Layers, color: 'text-blue-500' },
    { name: 'Total Items', value: menuItems.length, icon: Coffee, color: 'text-amber-600' },
    { name: 'Available Templates', value: 11, icon: FileText, color: 'text-purple-500' },
    { name: 'Average Price', value: `₹${Math.round(menuItems.reduce((acc, curr) => acc + curr.price, 0) / (menuItems.length || 1))}`, icon: IndianRupee, color: 'text-green-500' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Welcome back, Admin!</h2>
        <p className="text-muted-foreground mt-1">Here is a quick overview of {cafeInfo?.cafe_name || 'your cafe'}.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-2xl font-bold text-foreground mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="flex gap-4">
          <Link to="/menu" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Manage Menu
          </Link>
          <Link to="/templates" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2">
            View Templates
          </Link>
        </div>
      </div>
    </div>
  );
}
