import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Registration from "../blocks/registration";
import Login from "../blocks/login";
import MainPage from "../pages/MainPage";

export default (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <main>
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
        </main>

        <Redirect path={"/"} />
      </Switch>
    );
  }
  return (
    <Switch>
      <main>
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
      </main>
      <Redirect path={"/"} exact />
    </Switch>
  );
};
