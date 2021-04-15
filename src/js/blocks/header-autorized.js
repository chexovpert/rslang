import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Burger from "./burger";
//import useAuth from "../hooks/auth.hook";

export default () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const isAuthenticated = !!auth.token;
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  if (isAuthenticated) {
    return (
      <div className="header">
        {/* <nav className={show ? "header__nav show" : "header__nav"}>
        <ul className="header__navlist">
          <li className="header__navlist-link">
            <Link>Словарь</Link>
          </li>
          <li className="header__navlist-link">
            <Link to={"/games/forkids"}>Учебник</Link>
          </li>
          <li className="header__navlist-link">
            <Link to={"/games/savanna"}>Игры</Link>
          </li>
          <li className="header__navlist-link">
            <Link to="/games/audio"> Что-то</Link>
          </li>
        </ul>
        <div className="header__burger-button" onClick={handleClick}>
          Click
        </div>
      </nav> */}
        <div>
          <Burger></Burger>
        </div>
        <div className="header__left">
          <Link to="/" className="header__logo">
            RsLang
          </Link>
        </div>
        <div className="header__right">
          <p>{auth.name}</p>
          <Link to="/" className="header__link login" onClick={logoutHandler}>
            Выйти
          </Link>

          {/* <div className="header__burger-button" onClick={handleClick}>
          Click
        </div> */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="header">
        {/* <nav className={show ? "header__nav show" : "header__nav"}>
          <ul className="header__navlist">
            <li className="header__navlist-link">
              <Link to={"/vocabulary/learned"}>Словарь</Link>
            </li>
            <li className="header__navlist-link">
              <Link to="/classbook">Учебник</Link>
            </li>
            <li className="header__navlist-link">
              <Link to={"/games/savanna"}>Игры</Link>
            </li>
            <li className="header__navlist-link">
              <Link>Что-то</Link>
            </li>
          </ul>
          <div className="header__burger-button" onClick={handleClick}>
            Click
          </div>
        </nav> */}
        <div>
          <Burger></Burger>
        </div>
        <div className="header__left">
          <Link to="/" className="header__logo">
            RsLang
          </Link>
        </div>
        <div className="header__right">
          <Link to="/register" className="header__link register">
            Зарегестрироваться
          </Link>
          <Link to="/login" className="header__link login">
            Войти
          </Link>
          {/* <div className="header__burger-button" onClick={handleClick}>
            Click
          </div> */}
        </div>
      </div>
    );
  }
};
