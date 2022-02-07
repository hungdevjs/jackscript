import { FC } from "react";

export enum RouteTypes {
  AnonymousOnly = "AnonymousOnly",
  AuthUserOnly = "AuthUserOnly",
  Both = "Both",
}

export interface Route {
  name: string;
  path: string;
  component: FC;
  type: RouteTypes;
}
