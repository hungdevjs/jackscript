import api from "./api";

const CLOUDINARY_URL = "/api/v1/cloudinary";

export const getSignature = (folder: string, eager: string) => api.get(CLOUDINARY_URL, { params: { folder, eager } });

export const uploadImage = (url: string, data: FormData) => api.post(url, data);
