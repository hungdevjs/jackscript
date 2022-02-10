import { Route, RouteTypes } from "interfaces/route";

import Home from "pages/Home/Home";
import Roadmap from "pages/Roadmap/Roadmap";
import Courses from "pages/Courses/Courses";
import CourseDetail from "pages/Courses/CourseDetail";
import Lesson from "pages/Courses/Lesson";
import Faq from "pages/Faq/Faq";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";

export const paths = {
  home: "/",
  roadmap: "/roadmap",
  courses: "/courses",
  courseDetail: "/courses/:id",
  lesson: "/courses/:courseId/lessons/:lessonId",
  faq: "/faq",
  login: "/login",
  register: "/register",
};

const routes: Route[] = [
  {
    name: "Home",
    path: paths.home,
    component: Home,
    type: RouteTypes.Both,
  },
  {
    name: "Roadmap",
    path: paths.roadmap,
    component: Roadmap,
    type: RouteTypes.Both,
  },
  {
    name: "Courses",
    path: paths.courses,
    component: Courses,
    type: RouteTypes.Both,
  },
  {
    name: "CourseDetail",
    path: paths.courseDetail,
    component: CourseDetail,
    type: RouteTypes.Both,
  },
  {
    name: "Lesson",
    path: paths.lesson,
    component: Lesson,
    type: RouteTypes.Both,
  },
  {
    name: "Faq",
    path: paths.faq,
    component: Faq,
    type: RouteTypes.Both,
  },
  {
    name: "Login",
    path: paths.login,
    component: Login,
    type: RouteTypes.AnonymousOnly,
  },
  {
    name: "Register",
    path: paths.register,
    component: Register,
    type: RouteTypes.AnonymousOnly,
  },
];

export default routes;
