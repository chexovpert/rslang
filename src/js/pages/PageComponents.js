import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
function PageComponents() {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">
              {/* <img src={logo} className="App-logo" alt="logo" /> */}
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
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
