import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";

import Header from "../blocks/header";
import Footer from "../blocks/footer";
import useRoutes from "../logic/routes";

function PageComponents() {
  const routes = useRoutes(false);
  return (
    <HashRouter basename="/">
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Header></Header>
          {routes}
        </div>
        <Footer></Footer>
      </div>
    </HashRouter>
  );
}

export default PageComponents;
