import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import MainLayout from "../layouts/MainLayout";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      //console.log(data);
      if(data) {
      auth.login(
        data.token,
        data.userId,
        data.name,
        data.refreshToken,
        data.message
      );
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if(error===403){
    alert("Неправильный пароль")
    }
    if(error===404){
    alert("Пользователь не найден")
    }
  }, [error]);
  return (
    <MainLayout>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              height: "60px",
            }}
          >
            {!loading && (
              <button
                //type="submit"
                //value="Войти"
                className="registration__button-submit"
                onClick={authHandler}
                disabled={loading}
              >
                {loading ? "Загрузка" : "Войти"}
              </button>
            )}
            {loading && <CircularProgress></CircularProgress>}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
