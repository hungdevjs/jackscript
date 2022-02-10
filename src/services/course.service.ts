import api from "./api";

const COURSE_URL = "/api/v1/courses";

export const get = () => api.get(COURSE_URL);

export const getById = (id: string) => api.get(`${COURSE_URL}/${id}`);

export const start = (id: string) => api.post(`${COURSE_URL}/${id}`);

export const getLesson = (courseId: string, lessonId: string) =>
  api.get(`${COURSE_URL}/${courseId}/lessons/${lessonId}`);
