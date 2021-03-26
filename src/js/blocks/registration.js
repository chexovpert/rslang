import React, { useEffect, useState } from "react";
import useHttp from "../hooks/http.hook"

export default () => {
  const {loading, error, request} = useHttp()
  const [form, setForm] = useState({name: "", email: "", password: "" });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    //console.log(event.target.name);
    //console.log(event.target.value);
  };
  const registerHandler = async() => {
    try {
      const data = await request("https://react-learnwords-rslang.herokuapp.com/users", 
      "POST", 
      JSON.stringify({...form}), 
      {'Accept': "application/json", "Content-Type": "application/json"})
    } catch(e) {

    }
  };
  useEffect(() => {
    console.log(error);
  }, error)
  return (
    <div className="registration">
      <h1 className="registration-title">Регистрация</h1>
      <form>
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
        <button
          onClick={registerHandler}
          type="submit"
          value="Зарегестрироваться"
          className="registration__button-submit"
        >Регистрация</button>
      </form>
    </div>
  );
};
