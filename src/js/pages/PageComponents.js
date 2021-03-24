import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";
import MainPage from "./MainPage";
import Header from "../blocks/header";
import Registration from "../blocks/registration";
import Login from "../blocks/login";
import Footer from "../blocks/footer";
function PageComponents() {
  return (
    <HashRouter basename="/">
      <Switch>
        <div className="app-wrapper">
          <div className="content-wrapper">
            <Header></Header>
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
          </div>
          <Footer></Footer>
        </div>
      </Switch>
    </HashRouter>
  );
}

export default PageComponents;
