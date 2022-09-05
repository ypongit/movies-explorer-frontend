import React from "react";
import "./Register.css";
import { Link, Route } from "react-router-dom";

import logo from "../../images/logo.svg";

function Register ({
  currentUser,
  currentMail
}) {
  return (
    <section className="sign">
      <div className="sign__header">
        <Link to='/' className="sign__home">
        <img src={logo} alt="логотип" className="sign__logo"></img>
      </Link>
      <h2 className="sign__title">Добро пожаловать!</h2>
    </div>
    <form className="sign__form">
      <label className="sign__label">Имя
        <input
          type="text"
          placeholder="Имя"
          name="name"
          className="sign__input"
          required
        >

        </input>
      </label>
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
          minLength="6"
          maxLength="30"
          name="password"
          placeholder="Пароль, минимум 6 смволов"
          className="sign__input"
          required
        >
        </input>
        <span className="sign__err">Что-то пошло не так...</span>
      </label>

      <button
          className="sign__submit"
          type='submit'
        >Зарегистрироваться</button>
        <div className="sign__link-wrapper">
          <span className="sign__question">Уже зарегистрированы?</span>
          <Link className="sign__link" to="/signin">
            Войти
          </Link>
        </div>

    </form>

    </section>
  )
}

export default Register;