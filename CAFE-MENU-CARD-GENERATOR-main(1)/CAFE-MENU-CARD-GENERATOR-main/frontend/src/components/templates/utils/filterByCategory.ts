import { MenuData } from '../registry';

export const filterByCategory = (data: MenuData, categoryName: string): MenuData => {
  const cleanName = (name: string) => name.toLowerCase().trim().replace(/s$/, '');
  const targetClean = cleanName(categoryName);
  const filteredCategories = data.categories.filter(
    (c) => cleanName(c.name) === targetClean
  );
  return { ...data, categories: filteredCategories };
};
