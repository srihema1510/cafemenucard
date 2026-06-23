import React, { useState } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useMenu } from '../hooks/useMenu';
import MenuTable from '../components/menu/MenuTable';
import CategoryForm from '../components/menu/CategoryForm';
import ItemForm from '../components/menu/ItemForm';
import { Plus } from 'lucide-react';
import { baseTemplates } from '../components/templates/registry';

export default function Menu() {
  const { categories, menuItems, selectedTemplateId, setSelectedTemplateId } = useMenuStore();
  const { isLoading } = useMenu();
  
  const [showCatForm, setShowCatForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const [showItemForm, setShowItemForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading menu...</div>;
  }

  const handleEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setShowCatForm(true);
  };

  const handleAddItem = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setEditingItem(null);
    setShowItemForm(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setSelectedCategoryId(item.category_id);
    setShowItemForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Menu Management</h2>
          <p className="text-muted-foreground mt-1">Organize your categories and menu items</p>
        </div>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedTemplateId || ''} 
            onChange={(e) => setSelectedTemplateId(e.target.value ? Number(e.target.value) : null)}
            className="h-10 px-3 py-2 bg-background border border-border rounded-md text-sm min-w-[200px]"
          >
            <option value="">Select a template...</option>
            {baseTemplates.map((t: any) => (
              <option key={t.meta.id} value={t.meta.id}>Template {t.meta.id}: {t.meta.name}</option>
            ))}
          </select>
          <button
            onClick={() => { setEditingCategory(null); setShowCatForm(true); }}
            disabled={!selectedTemplateId}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 disabled:opacity-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {!selectedTemplateId ? (
          <div className="p-8 text-center text-muted-foreground">
            Please select a template above to manage its menu items.
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No categories found for this template. Add your first category to get started.
          </div>
        ) : (
          <MenuTable 
            onEditCategory={handleEditCategory}
            onAddItem={handleAddItem}
            onEditItem={handleEditItem}
          />
        )}
      </div>

      {showCatForm && (
        <CategoryForm 
          category={editingCategory} 
          onClose={() => { setShowCatForm(false); setEditingCategory(null); }} 
        />
      )}

      {showItemForm && selectedCategoryId !== null && (
        <ItemForm 
          item={editingItem}
          categoryId={selectedCategoryId}
          onClose={() => { setShowItemForm(false); setEditingItem(null); }} 
        />
      )}
    </div>
  );
}
