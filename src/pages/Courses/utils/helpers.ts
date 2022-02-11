import { User } from "interfaces/auth";

const levels = ["NEWBIE", "FRESHER", "JUNIOR", "SENIOR"];

export const canStartCourse = (user: User | null, courseLevel: string) => {
  if (!user) return false;
  return levels.indexOf(user.level) >= levels.indexOf(courseLevel);
};

export const isContinueCourse = (user: User | null, courseId: string) => {
  if (!user) return false;
  return user.courses.map((item) => item.courseId).includes(courseId);
};

export const isLearned = (user: User | null, courseId: string, lessonOrder: number) => {
  if (!user) return false;

  const course = user.courses.find((item) => item.courseId === courseId);
  if (!course) return false;

  return course.lessonOrder >= lessonOrder;
};
