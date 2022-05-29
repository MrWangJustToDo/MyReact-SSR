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
        <Outlet />
        <hr />
      </main>
      <Footer />
    </div>
  );
};
