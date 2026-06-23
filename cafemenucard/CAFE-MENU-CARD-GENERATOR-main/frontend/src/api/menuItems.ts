import axiosInstance from './axiosInstance';
import { MenuItem } from '../types';

export const getMenuItems = async (template_id: number, category_id?: number): Promise<MenuItem[]> => {
  const params: any = { template_id };
  if (category_id) params.category_id = category_id;
  const { data } = await axiosInstance.get('/menu-items', { params });
  return data.data;
};

export const createMenuItem = async (category_id: number, template_id: number, item_name: string, price: number, display_order?: number): Promise<MenuItem> => {
  const { data } = await axiosInstance.post('/menu-items', { category_id, template_id, item_name, price, display_order });
  return data.data;
};

export const updateMenuItem = async (id: number, payload: Partial<MenuItem>): Promise<MenuItem> => {
  const { data } = await axiosInstance.put(`/menu-items/${id}`, payload);
  return data.data;
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/menu-items/${id}`);
};
