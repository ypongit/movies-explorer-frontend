import React from "react";
import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg';
// import menuhide from '../../images/menuhide.svg';
import './Header.css';
// import MenuBurger from '../MenuBurger/MenuBurger'

function Header({
  loggedIn,
  headerMain,
  moviesMain,
  profileText,
  linkProfile,
  headerLogo
}) {
  console.log(loggedIn);
  // const loggedIn = false;
  const header = "header" + headerMain;
  const linkToMovies = "header__link-movies link" + moviesMain;
  const linkToMoviesSaved = "header__link-movies link header__link-movies_saved" + moviesMain;
  const linkToProfile = "header__link-profile" + linkProfile;
  return (
    <>
    {/* <Route exact path='/'></Route> */}
    <header className={header}>
      {loggedIn ? (

        <div className="header__content">
        <Link
          to='/'
          className="link"
        >
          <img alt="Логотип" src={logo} className="logo" />
        </Link>
        {/* <button type="button" className="header__dropdown-button">
            <img alt="кнопка меню" src={menuhide} className="header__dropdown-icon"/>
          </button> */}
          <nav className="header__link-container">
            {/* <Route path='/signin'></Route> */}
            <Link
                className={linkToMovies}
                to='/movies'>
                Фильмы
            </Link>
            <Link
                className={linkToMoviesSaved}
                to='/saved-movies'>
                Сохранённые фильмы
            </Link>
            {/* <Route path='/signup'></Route> */}
            <Link
              className='header__link link'
              to='/profile'>
              <div className={linkToProfile}>{profileText}</div>
            </Link>
          </nav>

      </div>
      ) : (
        <div className="header__content">

        <Link
          to='/'
        >
          <img alt="Логотип" src={logo} className="logo" />
        </Link>

        <div className="header__link-container">

        {/* <Route path='/signin'></Route> */}
        <Link
            className='header__link-signup link'
            to='/signup'>
            Регистрация
          </Link>

        {/* <Route path='/signup'></Route> */}
          <Link
            className='header__link link'
            to='/signin'>
            <div className="header__link-signin">
              Войти
            </div>
          </Link>
        </div>

        {/* <Route path='/signup'>
          <Link className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path='/signin'>
          <Link className="header__link">
            Войти
          </Link>
        </Route> */}
      </div>
      )}


    </header>
    </>
  );
}

export default Header;