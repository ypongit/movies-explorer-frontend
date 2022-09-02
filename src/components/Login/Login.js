import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

import logo from "../../images/logo1.svg";

function Login () {
  return (
    <section className="sign">
      <div className="sign__header">
        <Link to='/' className="sign__home">
        <img src={logo} alt="логотип" className="sign__logo"></img>
      </Link>
      <h2 className="sign__title">Рады видеть!</h2>
    </div>
    <form className="sign__form">
        <label className="sign__label">E-mail
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="sign__input"
          required
        >
        </input>
      </label>
      <label className="sign__label">Пароль
        <input
          type="password"
          name="password"
          placeholder="Пароль, минимум 6 смволов"
          className="sign__input"
          minLength="6"
          maxLength="30"
          required
        >
        </input>
      </label>

      <button
          className="sign__submit"
          type='submit'
        >Войти</button>
        <div className="sign__link-wrapper">
          <span className="sign__question">Ещё не зарегистрированы?</span>
          <Link className="sign__link" to='/signup'>
            Регистрация
          </Link>
        </div>

    </form>

    </section>
  )
}

export default Login;