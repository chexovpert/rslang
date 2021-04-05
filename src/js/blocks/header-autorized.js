import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Burger from "./burger";
export default () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [show, setShow] = useState(false);

  // const handleClick = () => {
  //   setShow(!show);
  // };
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };

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
        <Burger></Burger>
        {/* <div className="header__burger-button" onClick={handleClick}>
          Click
        </div> */}
      </div>
    </div>
  );
};
