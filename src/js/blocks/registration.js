import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook";
import MainLayout from "../layouts/MainLayout";
import CircularProgress from "@material-ui/core/CircularProgress";

export default () => {
  const { loading, error, request } = useHttp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    //console.log(event.target.name);
    //console.log(event.target.value);
  };
  const registerHandler = async () => {
    try {
      const data = await request(
        "https://react-learnwords-rslang.herokuapp.com/users",
        "POST",
        JSON.stringify({ ...form }),
        { Accept: "application/json", "Content-Type": "application/json" }
      );
      if(data) {
        alert('успешная регистрация')
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if(error===422){
      alert("Неправильное имя или пароль")
      }
    if(error===417){
      alert("Пользователь с данным email уже существует")
      }
  }, [error]);
  return (
    <MainLayout>
      <div className="registration">
        <h1 className="registration-title">Регистрация</h1>
        <div>
          <div className="registration__input-field">
            <label className="registration__input-title">Email:</label>
            <input
              id="remail"
              name="email"
              type="email"
              placeholder="введите email"
              //value=""
              required
              className="registration__input-field-input"
              onChange={changeHandler}
            />
          </div>
          <div className="registration__input-field">
            <label className="registration__input-title">Имя:</label>
            <input
              id="rname"
              name="name"
              type="name"
              placeholder="введите имя"
              //value=""
              required
              className="registration__input-field-input"
              onChange={changeHandler}
            />
          </div>
          <div className="registration__input-field">
            <label className="registration__input-title">Пароль:</label>
            <input
              id="rpassword"
              name="password"
              type="password"
              placeholder="введите пароль"
              //value=""
              onChange={changeHandler}
              required
              className="registration__input-field-input"
            />
          </div>
          {/* <div className="registration__input-field">
          <label className="registration__input-title">Повторить пароль:</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="введите пароль еще раз"
            //value=""
            onChange={changeHandler}
            required
            className="registration__input-field-input"
          />
        </div> */}
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
                onClick={registerHandler}
                //type="submit"
                value="Зарегестрироваться"
                className="registration__button-submit"
                disabled={loading}
              >
                {loading ? "Загрузка" : "Регистрация"}
              </button>
            )}
            {loading && <CircularProgress></CircularProgress>}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
