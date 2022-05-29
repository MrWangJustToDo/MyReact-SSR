import React from "react";
import { allRoutes } from "router/routes";

import { LoadingBar } from "./LoadingBar";
import { RenderMatch } from "./RenderMatch";
import { WrapperRoute } from "./WrapperRoute";

export const App = () => {
  return (
    <WrapperRoute routes={allRoutes} LoadingBar={LoadingBar}>
      <RenderMatch />
    </WrapperRoute>
  );
};
