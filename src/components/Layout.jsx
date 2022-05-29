import React from "react";
import { Outlet } from "react-router";

import { Footer } from "./Footer";
import { Header } from "./Header";
import style from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={style.container}>
      <Header />
      <h1>hello MyReact</h1>
      <main className={style.content}>
        <h2>占位</h2>
        <Outlet />
        结束
        <hr />
      </main>
      <Footer />
    </div>
  );
};
