import React from "react";
import { Switch, Route, Redirect, HashRouter } from "react-router-dom";
import Registration from "../blocks/registration";
import Login from "../blocks/login";
import MainPage from "../pages/MainPage";
import Header from "../blocks/header";
import HeaderAuthorized from "../blocks/header-autorized";
import Savanna from "../pages/savanna";
import AudioChallenge from "../pages/audioChallenge";
import EnglishForKids from "../pages/englishforkids";

export default (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <div className="content-wrapper">
          <HeaderAuthorized></HeaderAuthorized>
          <Route path="/" exact>
            <MainPage></MainPage>
          </Route>
          <Route
            path={"/games/savanna"}
            exact
            render={(props) => (
              <Savanna
                // countryData={countryData}
                {...props}
              ></Savanna>
            )}
          />
          <Route
            path={"/games/audio"}
            exact
            render={(props) => (
              <AudioChallenge
                // countryData={countryData}
                {...props}
              ></AudioChallenge>
            )}
          />
          <Route
            path={"/games/forkids"}
            exact
            render={(props) => (
              <EnglishForKids
                // countryData={countryData}
                {...props}
              ></EnglishForKids>
            )}
          />

          <Redirect to={"/"} />
        </div>
      </Switch>
    );
  }
  return (
    <Switch>
      <div className="content-wrapper">
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
      </div>
    </Switch>
  );
};
