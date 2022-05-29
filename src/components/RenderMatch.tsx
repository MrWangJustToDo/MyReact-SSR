import { useRoutes } from "react-router";

import { allRoutes } from "router/routes";

import { useLoadedLocation } from "./WrapperRoute";

export const RenderMatch = () => {
  const loaded = useLoadedLocation();
  return useRoutes(allRoutes, loaded?.location);
};
