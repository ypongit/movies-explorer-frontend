import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import logo from "../../images/logo1.svg";

function Profile ({
  currentUser
}) {
  return (
    <>
      <Header
        headerMain = ""
        moviesMain = ""
        linkProfile = ""
        profileText = "Аккаунт"
        headerLogo={logo}
      />

      <section className="profile">
        <h2 className="profile__title">Привет, {currentUser}!</h2>
        <form
          className="profile__form"
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              name="name"
              type="text"
              placeholder="currentUser"
              >
            </input>
            </label>
            <label className="profile__label">
            E-mail
              <input
                className="profile__input"
                name="email"
                type="email"
                placeholder="currentUser"
                >
              </input>

            </label>
        </form>
        <button
          type="submit"
          className="profile__button"

        >
          Редактировать
        </button>
        <button
          type="button"
          className="profile__button"

        >
          Выйти из аккаунта
        </button>
      </section>
    </>
  )
}

export default Profile;