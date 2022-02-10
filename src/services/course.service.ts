import api from "./api";

const COURSE_URL = "/api/v1/courses";

export const get = () => api.get(COURSE_URL);
