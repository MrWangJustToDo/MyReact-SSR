import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { App } from "components/App";

const Root = ({ store }) => {
  console.warn("you are using antDesign component library!");

  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
};

export { Root };
