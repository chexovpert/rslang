import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";

import Footer from "../blocks/footer";
import useRoutes from "../logic/routes";
import useAuth from "../hooks/auth.hook";
import AuthContext from "../context/AuthContext";

function PageComponents() {
  const {
    token,
    login,
    logout,
    userId,
    name,
    refreshToken,
    message,
  } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
        name,
        refreshToken,
        message,
      }}
    >
      <HashRouter basename="/">
        <div className="app-wrapper">
          {routes}
          <Footer></Footer>
        </div>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default PageComponents;
