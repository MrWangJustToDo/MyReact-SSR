import React, { createContext, useContext } from "react";

import { usePreLoad } from "hooks/usePreLoad";
import { preLoad } from "utils/preLoad";

export const LoadedLocationContext = createContext(null);

export const WrapperRoute = ({ children, routes, LoadingBar }) => {
  const { loaded } = usePreLoad({ routes, preLoad });

  // for pure client render
  if (!loaded) return null;

  return (
    <LoadedLocationContext.Provider value={loaded}>
      <LoadingBar />
      {children}
    </LoadedLocationContext.Provider>
  );
};

export const useLoadedLocation = () => useContext(LoadedLocationContext);
