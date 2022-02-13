export interface UserCourse {
  courseId: string;
  lessonOrder: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  level: string;
  plan: string;
  courses: UserCourse[];
}

export interface AuthState {
  initialized: boolean;
  user: User | null;
}
