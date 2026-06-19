import { create } from 'zustand';
import { CafeInfo, Category, MenuItem } from '../types';

interface MenuState {
  selectedTemplateId: number | null;
  cafeInfo: CafeInfo | null;
  categories: Category[];
  menuItems: MenuItem[];
  setSelectedTemplateId: (id: number | null) => void;
  setAll: (cafeInfo: CafeInfo, categories: Category[], menuItems: MenuItem[]) => void;
  updateCafeInfo: (info: CafeInfo) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number) => void;
  addItem: (item: MenuItem) => void;
  updateItem: (item: MenuItem) => void;
  deleteItem: (id: number) => void;
}

export const useMenuStore = create<MenuState>((set) => ({
  selectedTemplateId: null,
  cafeInfo: null,
  categories: [],
  menuItems: [],
  setSelectedTemplateId: (id) => set({ selectedTemplateId: id, categories: [], menuItems: [] }),
  setAll: (cafeInfo, categories, menuItems) => set({ cafeInfo, categories, menuItems }),
  updateCafeInfo: (info) => set({ cafeInfo: info }),
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
  updateCategory: (category) => set((state) => ({
    categories: state.categories.map((c) => c.id === category.id ? category : c)
  })),
  deleteCategory: (id) => set((state) => ({
    categories: state.categories.filter((c) => c.id !== id),
    menuItems: state.menuItems.filter((i) => i.category_id !== id) // Cascade delete locally
  })),
  addItem: (item) => set((state) => ({ menuItems: [...state.menuItems, item] })),
  updateItem: (item) => set((state) => ({
    menuItems: state.menuItems.map((i) => i.id === item.id ? item : i)
  })),
  deleteItem: (id) => set((state) => ({
    menuItems: state.menuItems.filter((i) => i.id !== id)
  }))
}));
