import axiosInstance from './axiosInstance';
import { CafeInfo } from '../types';

export const getCafe = async (): Promise<CafeInfo> => {
  const { data } = await axiosInstance.get('/cafe');
  return data.data;
};

export const updateCafe = async (cafe_name: string): Promise<CafeInfo> => {
  const { data } = await axiosInstance.put('/cafe', { cafe_name });
  return data.data;
};
