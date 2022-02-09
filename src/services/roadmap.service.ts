import api from "./api";

const ROADMAP_URL = "/api/v1/roadmap";

export const get = () => api.get(ROADMAP_URL);
