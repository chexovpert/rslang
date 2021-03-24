import React from "react";

export default () => {
  const handleSubmit = () => {};
  return (
    <div className="registration">
      <h1 className="registration-title">Войти</h1>
      <form action="/add" method="POST" onSubmit={handleSubmit}>
        <div className="registration__input-field">
          <label className="registration__input-title">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value="aga"
            onChange={handleSubmit}
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
            value="aga"
            onChange={handleSubmit}
            required
            className="registration__input-field-input"
          />
        </div>
        <input
          type="submit"
          value="Войти"
          className="registration__button-submit"
        />
      </form>
    </div>
  );
};
