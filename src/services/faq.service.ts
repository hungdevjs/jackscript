import api from "./api";

const FAQ_URL = "/api/v1/faq";

export const get = () => api.get(FAQ_URL);
