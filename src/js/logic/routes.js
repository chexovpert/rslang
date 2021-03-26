import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Registration from "../blocks/registration";
import Login from "../blocks/login";
import MainPage from "../pages/MainPage";
import Header from "../blocks/header";
import HeaderAuthorized from "../blocks/header-autorized";

export default (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <main>
          <HeaderAuthorized></HeaderAuthorized>
          <Route path="/" exact>
            <MainPage></MainPage>
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

          <Redirect to={"/"} />
        </main>
      </Switch>
    );
  }
  return (
    <Switch>
      <main>
        <Header></Header>
        <Route path="/" exact>
          <MainPage></MainPage>
        </Route>
        <Route path="/login" exact>
          <Login></Login>
        </Route>
        <Route path="/register" exact>
          <Registration></Registration>
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

        <Redirect to={"/"} />
      </main>
    </Switch>
  );
};
