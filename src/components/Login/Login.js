import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function Login ({
  handleLogin,
  handleInfoTooltipClick
}) {
  const {values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { email, password } = values;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    isValid && handleLogin({email, password}, () => {
      resetForm();
    });
    // handleInfoTooltipClick();
  }

  return (
    <section className="sign">
      <div className="sign__header">
        <Link to='/' className="sign__home">
        <img src={logo} alt="логотип" className="sign__logo"></img>
      </Link>
      <h2 className="sign__title">Рады видеть!</h2>
    </div>
    <form className="sign__form"
      onSubmit={handleSubmit}
      name="signin_form"
      noValidate
    >
        <label className="sign__label" htmlFor="email">E-mail
        <input className="sign__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
          title="Доменная часть адреса электронной почты указана неверно"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
          onChange={handleChange}
          value={email || ''}
        >
        </input>
        <span className="sign__err">{errors.email}</span>
      </label>
      <label className="sign__label" htmlFor="password">Пароль
        <input className="sign__input"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="30"
          required
          value={password || ''}
          onChange={handleChange}
        />
        <span className="sign__err">{errors.password}</span>
      </label>

      <button
          className={isValid ? "sign__submit" : "sign__submit sign__submit_disabled"}
          type='submit'
          aria-label="Кнопка войти"
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