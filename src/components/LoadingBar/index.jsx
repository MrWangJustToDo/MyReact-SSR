import React, { useEffect, useState } from "react";

import { useLoadingBar, useLoadingBarState } from "hooks/useLoadingBar";

import { Bar } from "./LoadingBar";

export const LoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const loadingState = useLoadingBarState((s) => s.loading);
  useEffect(() => {
    let id = null;
    if (loadingState) {
      id = setTimeout(() => setLoading(loadingState), 200);
    } else {
      setLoading(false);
    }
    return () => {
      id && clearTimeout(id);
    };
  }, [loadingState]);
  const { ref } = useLoadingBar({ loading });
  return <Bar ref={ref} />;
};
