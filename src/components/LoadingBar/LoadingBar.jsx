import React, { memo, forwardRef } from "react";
import { createPortal } from "react-dom";

import { useEffectOnce } from "hooks/useEffectOnce";
import { useMounted } from "hooks/useMounted";

import style from "./index.module.scss";

let div = undefined;

const _Bar = forwardRef(function Bar(_, ref) {
  useEffectOnce(() => {
    div = document.createElement("div");
    div.id = "__loading_bar__";
    document.body.prepend(div);
  });

  const mounted = useMounted();

  return mounted ? createPortal(<div ref={ref} className={style.loadingBar} style={{ height: `0px`, transform: `scale(0, 1)` }} />, div) : null;
});

export const Bar = memo(_Bar);
