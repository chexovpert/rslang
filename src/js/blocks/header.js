import React, { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="header">
      <nav className={show ? "header__nav show" : "header__nav"}>
        <ul className="header__navlist">
          <li className="header__navlist-link">
            <Link>Словарь</Link>
          </li>
          <li className="header__navlist-link">
            <Link>Учебник</Link>
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
      </nav>
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
        <div className="header__burger-button" onClick={handleClick}>
          Click
        </div>
      </div>
    </div>
  );
};
