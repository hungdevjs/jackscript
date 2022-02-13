import { AuthState } from "interfaces/auth";
import { LanguageState } from "interfaces/language";
import { TipState } from "interfaces/tip";
import { RoadmapState } from "interfaces/roadmap";
import { CourseState } from "interfaces/course";
import { FaqState } from "interfaces/faq";

export type RootState = {
  auth: AuthState;
  lang: LanguageState;
  tip: TipState;
  roadmap: RoadmapState;
  course: CourseState;
  faq: FaqState;
};
