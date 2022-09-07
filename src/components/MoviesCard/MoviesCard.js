import React from "react";
import "./MoviesCard.css";
import movie from '../../images/cardimg/33words.png';
import like from '../../images/likeactive.svg'

function MoviesCard(
  { name,
    link
  }
) {
  console.log("MoviesCard.link =>", link)
  return(
    <article className="movie">
      <img
        alt="фильм"
        src={link}
        // src={movie}
        className="movie__image"
      />
      <div className="movie__heading">
        <h3 className="movie__heading-title">{name}</h3>
        <label className="movie__save">
        <input
          type='checkbox'
          name="movieSave"
          id="moviesave"
          className="movie__check"
        />
        <span></span>
      </label>
        {/*<div className="movie__save-wrapper">
           <button
            type="button"
            className="movie__save-button"
          ><img
            src={like}
            alt="лайк"
          ></img></button>
        </div>*/}
      </div>
      <span className="movie__duration">1ч42м</span>
    </article>
  )
}

export default MoviesCard;