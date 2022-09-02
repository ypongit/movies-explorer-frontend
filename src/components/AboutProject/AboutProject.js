import React from "react";
import "./AboutProject.css"

function AboutProject(){
  return(
    <section className="aboutproject content section">
      <div className="section__title-wrapper">
        <h2 className="section__title">О проекте</h2>
      </div>
      <ul className="aboutproject__table">
        <li className="aboutproject__cell">
          <h3 className="aboutproject__table-title">Дипломный проект включал 5 этапов</h3>
          <p className="aboutproject__table-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className="aboutproject__cell">
          <h3 className="aboutproject__table-title">На выполнение диплома ушло 5 недель</h3>
          <p className="aboutproject__table-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <div className="aboutproject__period">
        <h3 className="aboutproject__period-title">1 неделя</h3>
        <h3 className="aboutproject__period-title">4 недели</h3>
        <p className="aboutproject__period-text">Back-end</p>
        <p  className="aboutproject__period-text">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
