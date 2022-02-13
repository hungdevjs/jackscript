import api from "./api";

const ACCOUNT_URL = "/api/v1/account";

export const logIn = ({ email, password }: { email: string; password: string }) =>
  api.post(`${ACCOUNT_URL}/logIn`, { email, password });

export const getInfo = () => api.get(`${ACCOUNT_URL}/me`);

export const updateInfo = (data: { name: string }) => api.put(`${ACCOUNT_URL}/me`, data);

export const changePassword = (data: { password: string; newPassword: string }) =>
  api.put(`${ACCOUNT_URL}/me/password`, data);
