import React, { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register (props) {
  /* const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    message: ''
  }) */
  const {values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { name, email, password } = values;
  /* const handleChange = (e) => {
    const {name, value} = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value
    }));
  } */
  // let InfoTooltipTitle = props.InfoTooltipTitle.title;
  const handleSubmit = (e) => {
    e.preventDefault();
    // let {name, email, password} = state;
    isValid &&
      props.handleRegister({name, email, password}, () => {
        resetForm();
      });
      // props.handleInfoTooltipClick()
  }

  return (
    <section className="sign">
      <div className="sign__header">
        <Link to='/' className="sign__home">
          <img src={logo} alt="логотип" className="sign__logo"></img>
        </Link>
      <h2 className="sign__title">Добро пожаловать!</h2>
    </div>
    <form
      id="form"
      className="sign__form"
      onSubmit={handleSubmit}
      name='signup_form'
      noValidate
    >

      <label className="sign__label" htmlFor="username">Имя
        <input className="sign__input"
          type='text'
          placeholder="Имя"
          name="name"
          id="name"
          required
          minLength='2'
          maxLength='30'
          onChange={handleChange}
          value={name || ''}
          />
          <span className="sign__err">{errors.name}</span>
      </label>

      <label className="sign__label" htmlFor="email">E-mail
        <input className="sign__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          minLength='2'
          maxLength='30'
          required
          onChange={handleChange}
          value={email || ''}
        />
        <span className="sign__err">{errors.email}</span>
      </label>
      <label className="sign__label" htmlFor="password">Пароль
        <input className="sign__input"
          type="password"
          id='password'
          name="password"
          required
          minLength="6"
          maxLength="20"
          placeholder="Пароль, минимум 6 смволов"
          value={password || ''}
          onChange={handleChange}
        />
        <span className="sign__err">{errors.password}</span>
      </label>
      {/* <p>{InfoTooltipTitle}</p> */}
      <button
          className={isValid ? "sign__submit" : "sign__submit sign__submit_disabled"}
          type='submit'
          aria-label="Кнопка зарегистрироваться"
          disabled={!isValid}
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