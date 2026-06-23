import React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useMenuStore } from '../../store/menuStore';
import { useMenu } from '../../hooks/useMenu';

interface Props {
  onEditCategory: (cat: any) => void;
  onAddItem: (categoryId: number) => void;
  onEditItem: (item: any) => void;
}

export default function MenuTable({ onEditCategory, onAddItem, onEditItem }: Props) {
  const { categories, menuItems } = useMenuStore();
  const { deleteCategory, deleteItem } = useMenu();

  const handleDeleteCategory = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"? This will also delete all items inside it.`)) {
      deleteCategory(id);
    }
  };

  const handleDeleteItem = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteItem(id);
    }
  };

  // Sort by display_order
  const sortedCategories = [...categories].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="w-full">
      {sortedCategories.map((cat) => {
        const catItems = menuItems.filter(i => i.category_id === cat.id).sort((a, b) => a.display_order - b.display_order);
        
        return (
          <div key={cat.id} className="border-b border-border last:border-b-0">
            {/* Category Header */}
            <div className="flex items-center justify-between bg-muted/40 p-4">
              <h3 className="font-semibold text-foreground text-lg">{cat.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => onAddItem(cat.id)} className="p-1.5 text-primary hover:bg-primary/10 rounded" title="Add Item">
                  <Plus className="w-4 h-4" />
                </button>
                <button onClick={() => onEditCategory(cat)} className="p-1.5 text-muted-foreground hover:bg-muted-foreground/20 rounded" title="Edit Category">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDeleteCategory(cat.id, cat.name)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded" title="Delete Category">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="p-0">
              {catItems.length === 0 ? (
                <div className="px-6 py-4 text-sm text-muted-foreground italic">No items in this category.</div>
              ) : (
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/20 text-muted-foreground uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3 font-medium">Item Name</th>
                      <th className="px-6 py-3 font-medium w-32">Price</th>
                      <th className="px-6 py-3 font-medium w-24 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catItems.map((item) => (
                      <tr key={item.id} className="border-b border-border/50 hover:bg-muted/10 last:border-0 transition-colors">
                        <td className="px-6 py-3 font-medium text-foreground">{item.item_name}</td>
                        <td className="px-6 py-3 text-muted-foreground">₹{item.price}</td>
                        <td className="px-6 py-3 text-right space-x-2">
                          <button onClick={() => onEditItem(item)} className="p-1 text-muted-foreground hover:text-primary transition-colors" title="Edit Item">
                            <Edit2 className="w-4 h-4 inline" />
                          </button>
                          <button onClick={() => handleDeleteItem(item.id, item.item_name)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" title="Delete Item">
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
