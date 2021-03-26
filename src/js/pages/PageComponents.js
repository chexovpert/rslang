import React from "react";
// <<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import TestingPage from "./testpage";
import TextBook from "./textbook";
import Word from "./wordcard";
// =======
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   HashRouter,
// } from "react-router-dom";

import Header from "../blocks/header";
// import Footer from "../blocks/footer";
// import useRoutes from "../logic/routes";
// import useAuth from "../hooks/auth.hook";
// import AuthContext from "../context/AuthContext"

// >>>>>>> chexovpert-mainpage
function PageComponents() {
  // const { token, login, logout, userId } = useAuth();
  // const isAuthenticated = !!token;
  // const routes = useRoutes(isAuthenticated);
  return (
    // <AuthContext.Provider
    //   value={{
    //     token,
    //     login,
    //     logout,
    //     userId,
    //     isAuthenticated,
    //   }}
    // >
    <HashRouter basename="/">
      {/* <<<<<<< HEAD */}
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <Header />
            <div className="page-container">
              {/* <TextBook /> */}
              <TestingPage />
            </div>
          </div>
        </Route>
        <Route
          path={"/classbook/:category"}
          exact
          render={(props) => (
            <div>smth</div>
            // <CountryPage
            //   // countryData={this.state.countryData}
            //   {...props}
            // ></CountryPage>
          )}
        />
      </Switch>
      {/* =======
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Header></Header>
          {routes}
        </div>
        <Footer></Footer>
      </div>
>>>>>>> chexovpert-mainpage */}
    </HashRouter>
    // </AuthContext.Provider>
  );
}

export default PageComponents;
