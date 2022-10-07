import React from "react";
import "./SavedMoviesCard.css";
import delmovie from '../../images/delmovie.svg'
import { Link } from "react-router-dom";

function SavedMoviesCard(
  {
    movie,
    onMovieSave,
    onMovieDelete,
    checkIsSavedStatus
  }

) {
  const setDuration = (data) => {
    const hours = Math.floor(data/60);
    const minutes = data % 60;
    return `${hours ? hours + 'ч' : ''} ${minutes}м`;
  }
  const handleDeleteClick = () => {
    // console.log(movie)
    onMovieDelete(movie);
  }
  // console.log("MoviesCard.link =>", link)
  return(
    <article className="movie">
      <Link
      to={{ pathname: movie.trailerLink }}
      target='_blank'
      >
        <img
        alt="фильм"
        src={movie.image}
        // src={movie}
        className="movie__image"
      />
      </Link>

      <div className="movie__heading">
        <h3 className="movie__heading-title">{movie.nameRU}</h3>
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
            type="button"
            className="movie__del-button"
            onClick={handleDeleteClick}
          ><img
            src={delmovie}
            alt="лайк"
          ></img></button>
        </div>

      <span className="movie__duration">{setDuration(movie.duration)}</span>
    </article>
  )
}

export default SavedMoviesCard;