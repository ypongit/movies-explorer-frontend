import React from "react";
import { Link } from "react-router-dom";
import porticon from '../../images/porticon.svg';
import './Portfolio.css';

function Portfolio() {
  return(
    <section className="portfolio section">
      <div className="content">
        <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__link-container">
          <Link
            className="portfolio__link"
            to={{ pathname: 'https://ypongit.github.io/how-to-learn/' }}
            target='_blank'
          >
            Статичный сайт
          </Link>
          <img src={porticon} className="portfolio__icon" />
        </li>
        <li className="portfolio__link-container">
          <Link
            className="portfolio__link"
            to={{ pathname: 'https://ypongit.github.io/russian-travel/' }}
            target='_blank'
          >
            Адаптивный сайт
          </Link>
          <img src={porticon} className="portfolio__icon" />
        </li>
        <li className="portfolio__link-container">
          <Link
            className="portfolio__link"
            to={{ pathname: 'https://mestoyp.students.nomoredomains.xyz/' }}
            target='_blank'
          >
            Одностраничное приложение
          </Link>
          <img src={porticon} className="portfolio__icon" />
        </li>
      </ul>

      </div>
    </section>
  )
}

export default Portfolio;