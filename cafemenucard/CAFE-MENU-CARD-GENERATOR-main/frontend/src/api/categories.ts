import axiosInstance from './axiosInstance';
import { Category } from '../types';

export const getCategories = async (template_id: number): Promise<Category[]> => {
  const { data } = await axiosInstance.get(`/categories?template_id=${template_id}`);
  return data.data;
};

export const createCategory = async (name: string, template_id: number, display_order?: number): Promise<Category> => {
  const { data } = await axiosInstance.post('/categories', { name, display_order, template_id });
  return data.data;
};

export const updateCategory = async (id: number, name: string, display_order?: number): Promise<Category> => {
  const { data } = await axiosInstance.put(`/categories/${id}`, { name, display_order });
  return data.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/categories/${id}`);
};
