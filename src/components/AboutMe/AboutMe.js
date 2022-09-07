import React from "react";
import { Link } from "react-router-dom";
import myfoto from '../../images/myfoto.jpg';
import './AboutMe.css';

function AboutMe(){
  return(
    <section className="aboutme section">
      {/* <div className="content"></div> */}
      <div className="section__title-wrapper">
        <h2 className="section__title">Студент</h2>
      </div>
      <div className="aboutme__container">
        <div className="aboutme__info">
          <h2 id="student" className="aboutme__name">Юрий</h2>
          <p className="aboutme__profession">Фронтенд-разработчик, 45 лет</p>
          <p className="aboutme__description">Я родился в Москве, живу в подмосковном городе Ивантеевка. Закончил факультет информатики и телекоммуникаций МГИЭМ.
            С ноября 2021 года проходил курс "Веб разработчик" в  Яндекс.Практикум, который рассчитан на 10 месяцев.
            По итогам прохождения обучения, выполнения всех заданий и защиты дипломного проекта,
            мною будет получен Сертификат. Полученные на сегодняшний день навыки: HTML, CSS
            (семантика, методология БЭМ, Flexbox, Grid Layout, адаптивная
            верстка), Figma, JavaScript (es6), взаимодействие с DOM,
            Ajax-запросы, React JS, REST API, Babel, сборка Webpack, Git, Node.js,
            Express, MongoDB. По завершении планирую искать удаленную работу, в связи с тем, что временно проживаю за границей.</p>
          <ul className="aboutme__social">
            <li className="aboutme__link-container">
              <Link
                to={{ pathname: 'https://vk.com/id435569635' }}
                target='_blank'
                className="aboutme__social-link"
              >
                Facebook
              </Link>
            </li>
            <li className="aboutme__link-container">
            <Link
                to={{ pathname: 'https://github.com/ypongit' }}
                target='_blank'
                className="aboutme__social-link"
              >
                Github
              </Link>
            </li>
          </ul>
        </div>
        <img alt="фото" src={myfoto} className="aboutme__foto" />
      </div>


    </section>
  )
}

export default AboutMe;