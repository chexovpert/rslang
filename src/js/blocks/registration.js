import React from "react";

export default () => {
  const handleSubmit = () => {};
  return (
    <div className="registration">
      <h1 className="registration-title">Регистрация</h1>
      <form action="/add" method="POST" onSubmit={handleSubmit}>
        <div className="registration__input-field">
          <label className="registration__input-title">Email:</label>
          <input
            id="remail"
            name="email"
            type="email"
            placeholder="aga"
            value=""
            onChange={handleSubmit}
            required
            className="registration__input-field-input"
          />
        </div>
        <div className="registration__input-field">
          <label className="registration__input-title">Пароль:</label>
          <input
            id="rpassword"
            name="password"
            type="password"
            placeholder="aga"
            value=""
            onChange={handleSubmit}
            required
            className="registration__input-field-input"
          />
        </div>
        <div className="registration__input-field">
          <label className="registration__input-title">Повторить пароль:</label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="aga"
            value=""
            onChange={handleSubmit}
            required
            className="registration__input-field-input"
          />
        </div>
        <input
          type="submit"
          value="Зарегестрироваться"
          className="registration__button-submit"
        />
      </form>
    </div>
  );
};
