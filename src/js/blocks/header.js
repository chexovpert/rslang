import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWordContext } from "../context/WordContext";

export default () => {
  const wordCntx = useWordContext();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className="header">
      <nav className={show ? "header__nav show" : "header__nav"}>
        <ul className="header__navlist">
          <li className="header__navlist-link">
            <Link to={"/vocabulary/learned/1/1"}>Словарь</Link>
          </li>
          <li className="header__navlist-link">
            <Link to="/classbook">Учебник</Link>
          </li>
          <li className="header__navlist-link">
            <Link to={"/games"}>Игры</Link>
          </li>
          <li className="header__navlist-link">
            {/* <Link to={"/settings"}>Настройки</Link> */}
            <div onClick={() => wordCntx.setSettings(true)}>Настройки</div>
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
