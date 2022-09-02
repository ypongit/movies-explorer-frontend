import React from "react";
import { Link } from "react-router-dom";
import "./Promo.css";
import "../AboutProject/AboutProject"

function Promo(){
  return(
    <section className="promo">
        <div className="promo__container">
          <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        </div>
      <nav className="promo__navigation">
        <ul className="promo__link-container">
          <li className="promo__link-wrapper">
            <Link className="promo__link"
              to='/about'
            >
              О проекте
            </Link>
          </li>
          <li className="promo__link-wrapper">
            <Link className="promo__link"
            to='/techs'>
              Технологии
            </Link>
          </li>
          <li className="promo__link-wrapper">
            <Link to='/student'
            className="promo__link">
              Студент
            </Link>
          </li>
        </ul>
      </nav>
    </section>

  )
}

export default Promo;