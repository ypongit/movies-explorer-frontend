import React from "react";
import { Link, Route } from 'react-router-dom'
import logo from '../../images/logo1.svg';
import './Header1.css';

function Header1() {
  return (
    <header className="header">
      <div className="header__content">
        <img alt="Логотип" src={logo} className="logo" />
        <div className="header__link-container">

        {/* <Route path='/signin'></Route> */}
        <Link
            className='header__link-movies link'
            to='/movies'>
            Фильмы
        </Link>
        <Link
            className='header__link-movies link header__link-movies_saved'
            to='/saved-movies'>
            Сохранённые фильмы
        </Link>

        {/* <Route path='/signup'></Route> */}
          <Link

            className='header__link link'
            to='/profile'>
            <div className="header__link-profile">
              Аккаунт
            </div>

          </Link>

        </div>
      </div>

    </header>

  );
}

export default Header1;