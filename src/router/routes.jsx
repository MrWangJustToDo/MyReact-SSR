import React from "react";
import loadable from "@loadable/component";

import { Layout } from "components/Layout";
import { UI } from "components/UI";
import { AutoInjectInitialProps } from "utils/preLoad";

import { dynamicRouteConfig } from "./dynamicRoutes";
import { filter } from "./tools";

const baseRouter = {
  element: <Layout />,
  Component: Layout,
};

let LoadAble_UI = loadable(() => import("../components/antDesignComponent"));

const routes = [
  { path: "/", element: <UI />, Component: UI },
  { path: "/antd", element: <LoadAble_UI />, Component: LoadAble_UI },
];

const dynamicRoutes = dynamicRouteConfig
  .map((it) => ({
    path: it.componentPath === "404" ? "/*" : it.path,
    component: loadable(() => import(`../pages/${it.componentPath}`), {
      resolveComponent: (module) => AutoInjectInitialProps(module.default),
    }),
  }))
  .map(({ path, component: Component }) => ({ path: path, Component, element: <Component /> }));

baseRouter.children = filter(routes.concat(dynamicRoutes) || [])
  .sort((a) => (a.path === "/*" ? 1 : 0))
  .sort((_, b) => (b.path === "/*" ? -1 : 0));

export const allRoutes = [baseRouter];
