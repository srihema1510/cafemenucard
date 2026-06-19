import React, { useState } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { X } from 'lucide-react';

interface Props {
  category?: any;
  onClose: () => void;
}

export default function CategoryForm({ category, onClose }: Props) {
  const { createCategory, updateCategory } = useMenu();
  const [name, setName] = useState(category?.name || '');
  const [order, setOrder] = useState(category?.display_order || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (category) {
      updateCategory({ id: category.id, name, display_order: Number(order) });
    } else {
      createCategory({ name, display_order: Number(order) });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-xl shadow-lg border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-lg">{category ? 'Edit Category' : 'Add Category'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Category Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
              required 
              maxLength={80}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Display Order</label>
            <input 
              type="number" 
              value={order} 
              onChange={e => setOrder(e.target.value)} 
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
              required 
            />
          </div>
          <div className="pt-4 flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
