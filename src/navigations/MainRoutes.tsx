import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { RouteTypes } from "interfaces/route";
import routes, { paths } from "configs/routes";

const mainRoutes = routes.filter((route) =>
  [RouteTypes.Both, RouteTypes.AuthUserOnly].includes(route.type)
);

const MainRoutes: FC = () => {
  return (
    <Routes>
      {mainRoutes.map((route) => (
        <Route
          key={route.name}
          path={route.path}
          element={<route.component />}
        />
      ))}
      <Route path="*" element={<Navigate replace to={paths.home} />} />
    </Routes>
  );
};

export default MainRoutes;
