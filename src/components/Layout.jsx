import React from "react";
import { Outlet } from "react-router";

import { Footer } from "./Footer";
import { Header } from "./Header";
import style from "./index.module.scss";

export const Layout = () => {
  return (
    <div className={style.container}>
      <Header />
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
