interface FaqItem {
  id: string;
  questionEn: string;
  questionVi: string;
  answerEn: string;
  answerVi: string;
}

export interface FaqState {
  items: FaqItem[] | null;
}
