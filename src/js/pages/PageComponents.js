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
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext"

function PageComponents() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
    <HashRouter basename="/">
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Header></Header>
          {routes}
        </div>
        <Footer></Footer>
      </div>
    </HashRouter>
    </AuthContext.Provider>
  );
}

export default PageComponents;
