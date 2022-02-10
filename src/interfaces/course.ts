interface Course {
  id: string;
  level: string;
  name: string;
  image: string;
  descriptionEn: string;
  descriptionVi: string;
  numberOfLessons: number;
}

interface SimpleLesson {
  id: string;
  nameEn: string;
  nameVi: string;
  order: number;
}

interface CourseDetail {
  id: string;
  name: string;
  level: string;
  image: string;
  descriptionEn: string;
  descriptionVi: string;
  lessons: SimpleLesson[];
}

interface Lesson {
  id: string;
  nameEn: string;
  nameVi: string;
  order: number;
  videoId: string;
  examSrc: string;
  courseId: string;
  courseName: string;
}

export interface CourseState {
  items: Course[] | null;
  courseDetailInitialized: boolean;
  courseDetail: CourseDetail | null;
  lessonDetailInitialized: boolean;
  lessonDetail: Lesson | null;
}
