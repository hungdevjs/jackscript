import api from "./api";

const ROADMAP_URL = "/api/v1/roadmap";

export const getRoadmap = () => api.get(ROADMAP_URL);
