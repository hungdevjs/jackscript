import { FC } from "react";
import { Routes, Route } from "react-router-dom";

import { RouteTypes } from "interfaces/route";
import routes from "configs/routes";

const authRoutes = routes.filter((route) =>
  [RouteTypes.Both, RouteTypes.AnonymousOnly].includes(route.type)
);

const AuthRoutes: FC = () => {
  return (
    <Routes>
      {authRoutes.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          element={<route.component />}
        />
      ))}
    </Routes>
  );
};

export default AuthRoutes;
