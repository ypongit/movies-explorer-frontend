import React from "react";
import { Link, NavLink } from 'react-router-dom'
import logo from '../../images/logo.svg';
// import menuhide from '../../images/menuhide.svg';
import './Header.css';
// import MenuBurger from '../MenuBurger/MenuBurger'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';

function Header({
  headerMain,
  moviesMain,
  profileText,
  linkProfile,
  headerLogo
}) {
  const value = React.useContext(AppContext);
  // console.log('value', value);
  const header = "header" + headerMain;
  const linkToMovies = "header__link-movies link" + moviesMain;
  const linkToMoviesSaved = "header__link-movies link header__link-movies_saved" + moviesMain;
  const linkToProfile = "header__link-profile" + linkProfile;
  return (
    <>
    {/* <Route exact path='/'></Route> */}
    <header className={header}>
      {value.loggedIn ? (

        <div className="header__content">
        <NavLink
          to='/'
          className="link"
          activeClassName="header__link_active"
        >
          <img alt="Логотип" src={logo} className="logo" />
        </NavLink>
        {/* <button type="button" className="header__dropdown-button">
            <img alt="кнопка меню" src={menuhide} className="header__dropdown-icon"/>
          </button> */}
          <nav className="header__link-container">
            {/* <Route path='/signin'></Route> */}
            <NavLink
                className={linkToMovies}
                activeClassName="header__link_active"
                to='/movies'>
                Фильмы
            </NavLink>
            <NavLink
                className={linkToMoviesSaved}
                activeClassName="header__link_active"
                to='/saved-movies'>
                Сохранённые фильмы
            </NavLink>
            {/* <Route path='/signup'></Route> */}
            <NavLink
              className='header__link'
              activeClassName="header__profile_active"
              to='/profile'>
              <div className="header__link-profile">Аккаунт</div>
            </NavLink>
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