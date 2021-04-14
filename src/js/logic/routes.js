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
import Settings from "../pages/settings";
import TestingDifPage from "../pages/testdif";
import { CSSTransition } from "react-transition-group";

const routeList = [
  {
    path: "/",
    Component: MainPage,
  },
  {
    path: "/games/savanna/:group?/:page?",
    Component: Savanna,
  },
  {
    path: "/games/audio/:group?/:page?",
    Component: AudioChallenge,
  },
  {
    path: "/games/forkids/:group?/:page?",
    Component: EnglishForKids,
  },
  {
    path: "/classbook",
    Component: TextBook,
  },
  {
    path: "/vocabulary/:type/:group?/:page?",
    Component: Vocabulary,
  },
  {
    path: "/wordlist/:group/:page",
    Component: Wordlist,
  },
  {
    path: "/games",
    Component: Minigames,
  },
  {
    path: "/games/sprint",
    Component: Sprint,
  },
];

export default (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <WordProvider>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
          <Route path="/register" exact>
            <Registration></Registration>
          </Route>
          <Settings />
          <Route path={"/classbook"} exact>
            <TextBook />
          </Route>
          <Route path={"/testing"}>
            <TestingPage />
          </Route>
          <Route path={"/testingdif"}>
            <TestingDifPage />
          </Route>
          <Route path="/vocabulary/:type/:group?/:page?">
            <Vocabulary />
          </Route>
          <Route path="/wordlist/:group/:page">
            <Wordlist />
          </Route>
          <Route path="/" exact>
            <MainPage></MainPage>
          </Route>
          <Route path={"/games/savanna/:group?/:page?"} exact render={(props) => <Savanna {...props}></Savanna>} />
          <Route path={"/games/audio/:group?/:page?"} exact render={(props) => <AudioChallenge {...props}></AudioChallenge>} />
          <Route path={"/games/forkids/:group?/:page?"} exact render={(props) => <EnglishForKids {...props}></EnglishForKids>} />
          <Route path={"/games/sprint/:group?/:page?"} exact render={(props) => <Sprint {...props} />} />
          <Redirect to={"/"} />
        </WordProvider>
      </Switch>
    );
  }
  return (
    <Switch>
      <div className="content-wrapper">
        <WordProvider>
          <Route path="/" exact>
            <MainPage></MainPage>
          </Route>
          <Route path="/login" exact>
            <Login></Login>
          </Route>
          <Route path="/register" exact>
            <Registration></Registration>
          </Route>
          <Settings />
          <Route path={"/classbook"} exact>
            <TextBook />
          </Route>
          <Route path={"/testing"}>
            <TestingPage />
          </Route>
          <Route path={"/testingdif"}>
            <TestingDifPage />
          </Route>
          <Route path="/vocabulary/:type/:group?/:page?">
            <Vocabulary />
          </Route>
          <Route path="/wordlist/:group/:page">
            <Wordlist />
          </Route>
          <Route path={"/games/sprint/:group?/:page?"} exact render={(props) => <Sprint {...props} />} />
          <Route path={"/games/savanna/:group?/:page?"} exact render={(props) => <Savanna {...props}></Savanna>} />
          <Route path={"/games/audio/:group?/:page?"} exact render={(props) => <AudioChallenge {...props}></AudioChallenge>} />
          <Route path={"/games/forkids/:group?/:page?"} exact render={(props) => <EnglishForKids {...props}></EnglishForKids>} />
          <Redirect to={"/"} />
        </WordProvider>
      </div>
    </Switch>
  );

  return (
    <Switch>
      <Route path="/login" exact>
        <Login></Login>
      </Route>
      <Route path="/register" exact>
        <Registration></Registration>
      </Route>
      <WordProvider>
        <Route path="/" exact>
          <MainPage></MainPage>
        </Route>

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
        <Redirect to={"/"} />
      </WordProvider>
    </Switch>
  );
};
