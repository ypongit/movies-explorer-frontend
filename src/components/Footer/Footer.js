import React from "react";
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
  return(
  <section className="footer section">
    <div className="content">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__content">
        <p className="footer__copyright">&copy;2022</p>

      <nav className="footer__links-container">
        <ul className="footer__links">
          <li className="footer__link-container">
            <Link
              className="footer__link"
              to={{ pathname: 'http://practicum.yandex.ru/' }}
              target='_blank'
            >
              Яндекс.Практикум
            </Link>
          </li>
          <li className="footer__link-container">
            <Link
              className="footer__link"
              to={{ pathname: 'https://github.com/ypongit' }}
              target='_blank'
            >
              Github
            </Link>
          </li>
          <li className="footer__link-container">
            <Link
              className="footer__link"
              to={{ pathname: 'https://vk.com/id435569635' }}
              target='_blank'
            >
              ВКонтакте
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  </section>
  )
}

export default Footer;