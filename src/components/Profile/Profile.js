import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import logo from "../../images/logo.svg";
import MenuBurger from "../MenuBurger/MenuBurger";
import useFormWithValidation from '../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Preloader from "../Preloader/Preloader";

function Profile ({ onUpdateUser, logout, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
    const { name, email } = values;

  function handleSubmit(e) {
    e.preventDefault();
    isValid &&
      onUpdateUser({
        name: name,
        email: email,
      },
      () => {
        resetForm();
      }
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
              onChange={handleChange}
              value={name || ""}            >
            </input>
            </label>
            <span className="profile__err">{errors.name}</span>
            <label className="profile__label">
            E-mail
              <input
                className="profile__input"
                name="email"
                type="email"
                placeholder={currentUser.email}
                required
                value={email || ''}
                onChange={handleChange}
              />
            </label>
            <span className="profile__err">{errors.email}</span>
        </form>
        <button
          type="submit"
          className={isValid ? "profile__button" : "profile__button profile__button_disabled"}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          {isValid ? 'Сохранить' : 'Редактировать'}
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