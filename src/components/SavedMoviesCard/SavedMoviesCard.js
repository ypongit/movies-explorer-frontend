import React from "react";
import "./SavedMoviesCard.css";
import delmovie from '../../images/delmovie.svg'

function SavedMoviesCard(
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
        {/* <label className="movie__save">
        <input
          type='checkbox'
          name="movieSave"
          id="moviesave"
          className="movie__check"
        />
        <span></span>
      </label> */}

           <button
            className="movie__del-button"
          ><img
            src={delmovie}
            alt="лайк"
          ></img></button>
        </div>

      <span className="movie__duration">1ч42м</span>
    </article>
  )
}

export default SavedMoviesCard;