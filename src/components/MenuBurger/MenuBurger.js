import React from "react";
import { Link } from "react-router-dom";
import "./MenuBurger.css";

function MenuBurger () {
  return (
    <div className="menu-burger">
      <input id="menu__toggle" type="checkbox" />
        <label className="menu__btn" for="menu__toggle">
          <span></span>
        </label>
      <div className="menu-burger__left">
      </div>
      <div className="menu-burger__right">
        <ul className="menu-burger__nav">
          <li className="menu-burger__item">
          <Link
              className="menu-burger__link"
              to='/'
            >
              Главная
            </Link>
          </li>
          <li className="menu-burger__item">
          <Link
              className="menu-burger__link"
              to='/saved-movies'>
                Фильмы
            </Link>
          </li>
          <li className="menu-burger__item">
          <Link
              className="menu-burger__link"
              to='/saved-movies'>
                Сохранённые фильмы
            </Link>
          </li>

            {/* <Route path='/signup'></Route> */}
            <li className="menu-burger__item">
              <Link
              className='menu-burger__link'
              to='/profile'>
              <button className="menu-burger__profile-btn">
                Аккаунт
              </button>
            </Link>
            </li>

        </ul>
      </div>

    </div>
  );
}

export default MenuBurger;