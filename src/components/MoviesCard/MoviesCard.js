import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./MoviesCard.css";
// import movie from '../../images/cardimg/33words.png';
import like from '../../images/likeactive.svg';
import { SERVER_URL, UNKNOWN_TRAILER_URL } from '../../utils/constants';

function MoviesCard(
  {
    movie,
    onMovieSave,
    onMovieDelete,
    checkIsSavedStatus,

  }
) {
  const isSaved = checkIsSavedStatus(movie);
  const setDuration = (data) => {
    const hours = Math.floor(data/60);
    const minutes = data % 60;
    return `${hours ? hours + 'ч' : ''} ${minutes}м`;
  }
  const handleSaveClick = () => {
    onMovieSave(movie);
  }

  const handleDeleteClick = () => {
    onMovieDelete(movie);
  }
  const toggleSaveMovie = () => {
    {isSaved ? onMovieDelete(movie) : onMovieSave(movie)}
  }
  return(
    <article className="movie">
      <Link
        to={{ pathname: movie.trailerLink }}
        target='_blank'
      >
        <img
          alt="фильм"
          src={ `https://api.nomoreparties.co${movie.image.url}`}
          // src={movie}
          className="movie__image"
        />
      </Link>
      <div className="movie__heading">
        <h3 className="movie__heading-title">{movie.nameRU}</h3>
        <label className="movie__save">
        <input
          type='checkbox'
          name="movieSave"
          id="moviesave"
          className="movie__check"
          onChange={toggleSaveMovie}
          /* onClick={handleSaveClick}*/
          checked={isSaved}
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
      <span className="movie__duration">{setDuration(movie.duration)}</span>
    </article>
  )
}

export default MoviesCard;