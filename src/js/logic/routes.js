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
    path: "/vocabulary/:type",
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
          {/* {routeList.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              exact
              render={(props) => <Component {...props}></Component>}
            >
              {({ match }) => (
                <CSSTransition
                  timeout={1000}
                  classNames="pages"
                  unmountOnExit
                  in={match != null}
                ></CSSTransition>
              )}
            </Route>
          ))} */}
          <Route path="/" exact>
            <MainPage></MainPage>
          </Route>
          <Route
            path={"/games/savanna/:group?/:page?"}
            exact
            render={(props) => <Savanna {...props}></Savanna>}
          />
          <Route
            path={"/games/audio/:group?/:page?"}
            exact
            render={(props) => <AudioChallenge {...props}></AudioChallenge>}
          />
          <Route
            path={"/games/forkids/:group?/:page?"}
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
      </Switch>
    );
  }
  return (
    <Switch>
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
        <Route
          path={"/games/savanna/:group?/:page?"}
          exact
          render={(props) => <Savanna {...props}></Savanna>}
        />
        <Route
          path={"/games/audio/:group?/:page?"}
          exact
          render={(props) => <AudioChallenge {...props}></AudioChallenge>}
        />
        <Route
          path={"/games/forkids/:group?/:page?"}
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
    </Switch>
  );
};
