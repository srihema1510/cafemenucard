import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCafe, updateCafe } from '../api/cafe';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../api/categories';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../api/menuItems';
import { useMenuStore } from '../store/menuStore';

export function useMenu() {
  const queryClient = useQueryClient();
  const menuStore = useMenuStore();

  const { isLoading: isCafeLoading } = useQuery({
    queryKey: ['cafe'],
    queryFn: async () => {
      const data = await getCafe();
      menuStore.updateCafeInfo(data);
      return data;
    }
  });

  const selectedTemplateId = useMenuStore(state => state.selectedTemplateId);

  const { isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories', selectedTemplateId],
    queryFn: async () => {
      if (!selectedTemplateId) return [];
      const data = await getCategories(selectedTemplateId);
      useMenuStore.setState({ categories: data });
      return data;
    },
    enabled: !!selectedTemplateId
  });

  const { isLoading: isMenuItemsLoading } = useQuery({
    queryKey: ['menu-items', selectedTemplateId],
    queryFn: async () => {
      if (!selectedTemplateId) return [];
      const data = await getMenuItems(selectedTemplateId);
      useMenuStore.setState({ menuItems: data });
      return data;
    },
    enabled: !!selectedTemplateId
  });

  const updateCafeMutation = useMutation({
    mutationFn: updateCafe,
    onMutate: async (newName) => {
      const prev = menuStore.cafeInfo;
      if (prev) {
        menuStore.updateCafeInfo({ ...prev, cafe_name: newName });
      }
      return { prev };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cafe'] });
    }
  });

  const createCategoryMutation = useMutation({
    mutationFn: ({ name, display_order }: { name: string; display_order?: number }) => {
      if (!selectedTemplateId) throw new Error("No template selected");
      return createCategory(name, selectedTemplateId, display_order);
    },
    onSuccess: (data) => {
      menuStore.addCategory(data);
      queryClient.invalidateQueries({ queryKey: ['categories', selectedTemplateId] });
    }
  });

  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, name, display_order }: { id: number; name: string; display_order?: number }) => updateCategory(id, name, display_order),
    onSuccess: (data) => {
      menuStore.updateCategory(data);
      queryClient.invalidateQueries({ queryKey: ['categories', selectedTemplateId] });
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (_, id) => {
      menuStore.deleteCategory(id);
      queryClient.invalidateQueries({ queryKey: ['categories', selectedTemplateId] });
      queryClient.invalidateQueries({ queryKey: ['menu-items', selectedTemplateId] });
    }
  });

  const createItemMutation = useMutation({
    mutationFn: ({ category_id, item_name, price, display_order }: any) => {
      if (!selectedTemplateId) throw new Error("No template selected");
      return createMenuItem(category_id, selectedTemplateId, item_name, price, display_order);
    },
    onSuccess: (data) => {
      menuStore.addItem(data);
      queryClient.invalidateQueries({ queryKey: ['menu-items', selectedTemplateId] });
    }
  });

  const updateItemMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: any }) => updateMenuItem(id, payload),
    onSuccess: (data) => {
      menuStore.updateItem(data);
      queryClient.invalidateQueries({ queryKey: ['menu-items', selectedTemplateId] });
    }
  });

  const deleteItemMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: (_, id) => {
      menuStore.deleteItem(id);
      queryClient.invalidateQueries({ queryKey: ['menu-items', selectedTemplateId] });
    }
  });

  return {
    isLoading: isCafeLoading || isCategoriesLoading || isMenuItemsLoading,
    updateCafe: updateCafeMutation.mutate,
    createCategory: createCategoryMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    createItem: createItemMutation.mutate,
    updateItem: updateItemMutation.mutate,
    deleteItem: deleteItemMutation.mutate,
  };
}
