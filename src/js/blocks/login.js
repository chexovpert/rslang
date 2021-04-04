import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

export default () => {
  const auth = useContext(AuthContext);
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const authHandler = async () => {
    try {
      const data = await request(
        "https://react-learnwords-rslang.herokuapp.com/signin",
        "POST",
        JSON.stringify({ ...form }),
        { Accept: "application/json", "Content-Type": "application/json" }
      );
      auth.login(
        data.token,
        data.userId,
        data.name,
        data.refreshToken,
        data.message
      );
    } catch (e) {}
  };
  useEffect(() => {
    console.log(error);
  }, error);
  return (
    <div className="registration">
      <h1 className="registration-title">Войти</h1>
      <div>
        <div className="registration__input-field">
          <label className="registration__input-title">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="введите email"
            onChange={changeHandler}
            required
            className="registration__input-field-input"
          />
        </div>
        <div className="registration__input-field">
          <label className="registration__input-title">Пароль:</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="введите пароль"
            onChange={changeHandler}
            required
            className="registration__input-field-input"
          />
        </div>
        <button
          //type="submit"
          //value="Войти"
          className="registration__button-submit"
          onClick={authHandler}
        >
          Войти
        </button>
      </div>
    </div>
  );
};
