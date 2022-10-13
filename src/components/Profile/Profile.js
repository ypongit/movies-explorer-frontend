import React, { useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import logo from "../../images/logo.svg";
import MenuBurger from "../MenuBurger/MenuBurger";
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from "../Preloader/Preloader";
import { re } from "../../utils/constants";

function Profile ({ onUpdateUser, logout, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  /* const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const { name, email } = values; */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [])

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [nameError, setNameError] = useState('Имя не может быть пустым! ');
  const [emailError, setEmailError] = useState('Email не может быть пустым! ');
  const [ formValid, setFormValid ] = useState(false);

  /* useEffect(() => {
    setName(values.name);
    setEmail(values.email);
  }, [values]); */

  useEffect(() => {
    if (emailError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, nameError]);

  const blurHandler = (e)  => {
    // if(e.target.name === 'email') {setEmailDirty(true)};
    switch (e.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      default:
        console.log("Нет таких значений")
    };
  }

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный емейл!");
      if(!e.target.value) {
        setNameError("Email не может быть пустым!");
      }
    } else {
      setEmailError("");
    }
  }

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value > 40) {
      setNameError("Имя должно быть от 3 до 40 символов");
      if(!e.target.value) {
        setNameError("Имя не может быть пустым!")
      }
    } else {
      setNameError("");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    formValid &&
      onUpdateUser({
        name: name,
        email: email,
      }/* ,
      () => {
        resetForm();
      } */
    );
  }

  return (
    <>
      <MenuBurger />
      <Header
        headerMain = ""
        moviesMain = ""
        linkProfile = ""
        profileText = "Аккаунт"
        headerLogo={logo}
        // loggedIn={loggedIn}
      />

      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        {isLoading && <Preloader />}
        <form
          className="profile__form"
          name="profile__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="profile__label">
            Имя
              <input
              className="profile__input"
              name="name"
              type="text"
              placeholder={currentUser.name}
              required
              minLength="2"
              maxLength="40"
              onChange={e => nameHandler(e)}
              onBlur={e => blurHandler(e)}
              value={name || ""}            >
            </input>
            </label>
            {(nameDirty && nameError) && <span className="profile__err">{nameError}</span>}
            {/* <span className="profile__err">{errors.name}</span> */}
            <label className="profile__label">
            E-mail
              <input
                className="profile__input"
                name="email"
                type="email"
                placeholder="Введите ваш Email" /* {currentUser.email} */
                required
                value={email || ''}
                // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                onChange={e => emailHandler(e)}
                onBlur={e => blurHandler(e)}
              />
            </label>
            {(emailDirty && emailError) && <span className="profile__err">{emailError}</span>}
            {/* <span className="profile__err">{errors.email}</span> */}
        </form>
        <button
          type="submit"
          className={formValid ? "profile__button" : "profile__button profile__button_disabled"}
          onClick={handleSubmit}
          disabled={!formValid}
        >
          {formValid ? 'Сохранить' : 'Редактировать'}
        </button>
        <button
          type="button"
          className="profile__button"
          onClick={logout}
        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  )
}

export default Profile;