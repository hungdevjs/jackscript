interface RoadmapItem {
  id: string;
  level: string;
  name: string;
  image: string;
  descriptionEn: string;
  descriptionVi: string;
  courses: {
    id: string;
    name: string;
    descriptionEn: string;
    descriptionVi: string;
    level: string;
  }[];
}

export interface RoadmapState {
  items: RoadmapItem[] | null;
}
