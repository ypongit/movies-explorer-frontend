import React from "react";
import "./MoviesCard.css";
import movie from '../../images/cardimg/33words.png';
import like from '../../images/likeactive.svg'

function MoviesCard() {
  return(
    <article className="movie">
      <img
        alt="фильм"
        src={movie}
        className="movie__image"
      />
      <div className="movie__heading">
        <h3 className="movie__heading-title">33 слова о дизайне</h3>
        <div className="movie__like-wrapper">
          <button
            className="movie__like-button"
          ><img
            src={like}
            alt="лайк"
          ></img></button>
        </div>
      </div>
      <span className="movie__duration">1ч42м</span>
    </article>
  )
}

export default MoviesCard;