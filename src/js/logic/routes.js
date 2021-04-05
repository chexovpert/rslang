import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Registration from "../blocks/registration";
import Login from "../blocks/login";
import MainPage from "../pages/MainPage";
import Header from "../blocks/header";
import HeaderAuthorized from "../blocks/header-autorized";
import TestingPage from "../pages/testpage";
import TextBook from "../pages/textbook";
import { WordProvider } from "../context/WordContext";
import Vocabulary from "../pages/vocabulary";
import Wordlist from "../pages/wordlist";
import Minigames from "../pages/minigames";
import Sprint from "../pages/game-sprint";
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

          <WordProvider>
            <Route
              path={"/games/savanna"}
              exact
              render={(props) => <Savanna {...props}></Savanna>}
            />
            <Route
              path={"/games/audio"}
              exact
              render={(props) => <AudioChallenge {...props}></AudioChallenge>}
            />
            <Route
              path={"/games/forkids"}
              exact
              render={(props) => <EnglishForKids {...props}></EnglishForKids>}
            />
            <Route path={"/classbook"} exact>
              <TextBook />
            </Route>
            <Route path={"/testing"}>
              <TestingPage />
            </Route>
            <Route path="/vocabulary/:type">
              <Vocabulary />
            </Route>
            <Route path="/wordlist/:group/:page">
              <Wordlist />
            </Route>
            <Route path="/games" exact>
              <Minigames />
            </Route>
            <Route path={"/games/sprint"} exact>
              <Sprint />
            </Route>
          </WordProvider>
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
        <WordProvider>
          <Route path={"/classbook"} exact>
            <TextBook />
          </Route>
          <Route path={"/testing"}>
            <TestingPage />
          </Route>
          <Route path="/vocabulary/:type">
            <Vocabulary />
          </Route>
          <Route path="/wordlist/:group/:page">
            <Wordlist />
          </Route>
          <Route path="/games" exact>
            <Minigames />
          </Route>
          <Route path={"/games/sprint"} exact>
            <Sprint />
          </Route>
        </WordProvider>
        <Redirect to={"/"} />
      </div>
    </Switch>
  );
};
