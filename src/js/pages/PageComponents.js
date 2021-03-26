import React from "react";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import TestingPage from "./testpage";
import TextBook from "./textbook";
import Word from "./wordcard";
function PageComponents() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <p>HEADER</p>
            </header>
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
    </HashRouter>
  );
}

export default PageComponents;
