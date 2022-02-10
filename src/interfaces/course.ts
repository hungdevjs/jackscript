interface CourseItem {
  id: string;
  level: string;
  name: string;
  image: string;
  descriptionEn: string;
  descriptionVi: string;
  numberOfLessons: number;
}

export interface CourseState {
  items: CourseItem[] | null;
}
