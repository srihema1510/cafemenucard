import React, { useState } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { X } from 'lucide-react';

interface Props {
  item?: any;
  categoryId: number;
  onClose: () => void;
}

export default function ItemForm({ item, categoryId, onClose }: Props) {
  const { createItem, updateItem } = useMenu();
  const [name, setName] = useState(item?.item_name || '');
  const [price, setPrice] = useState(item?.price || '');
  const [order, setOrder] = useState(item?.display_order || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price === '') return;

    if (item) {
      updateItem({ id: item.id, payload: { item_name: name, price: Number(price), display_order: Number(order) }});
    } else {
      createItem({ category_id: categoryId, item_name: name, price: Number(price), display_order: Number(order) });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card w-full max-w-md rounded-xl shadow-lg border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-lg">{item ? 'Edit Item' : 'Add Item'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="text-sm font-medium">Item Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
              required 
              maxLength={120}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price (₹)</label>
            <input 
              type="number" 
              min="0"
              step="any"
              value={price} 
              onChange={e => setPrice(e.target.value)} 
              className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
              required 
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
