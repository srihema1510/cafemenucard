import axiosInstance from './axiosInstance';

export const login = async (email: string, password: string) => {
  const { data } = await axiosInstance.post('/auth/login', { email, password });
  return data;
};

export const logout = async () => {
  const { data } = await axiosInstance.post('/auth/logout');
  return data;
};

export const getProfile = async () => {
  const { data } = await axiosInstance.get('/auth/profile');
  return data;
};
