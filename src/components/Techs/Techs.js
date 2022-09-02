import React from "react";
import "./Techs.css";

function Techs() {
  return(
    <section id="techs" className="techs section">
      <div className="content">
      <div className="section__title-wrapper">
        <h2 className="section__title">Технологии</h2>
      </div>
      <div className="techs__description">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__icons">
          <li className="techs__icon"><span className="techs__icon-text">HTML</span></li>
          <li className="techs__icon"><span className="techs__icon-text">CSS</span></li>
          <li className="techs__icon"><span className="techs__icon-text">JS</span></li>
          <li className="techs__icon"><span className="techs__icon-text">React</span></li>
          <li className="techs__icon"><span className="techs__icon-text">Git</span></li>
          <li className="techs__icon"><span className="techs__icon-text">Express.js</span></li>
          <li className="techs__icon"><span className="techs__icon-text">mongoDB</span></li>
        </ul>
      </div>

      </div>
    </section>
  )
}

export default Techs;