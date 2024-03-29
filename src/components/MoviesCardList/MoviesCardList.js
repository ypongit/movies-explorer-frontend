import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
// import { useCurrentWidth } from '../../hooks/useCurrentWidth';
// import { getByWidth, getInitialCount } from '../../utils/loadByWidth';
import SavedMovies from "../SavedMovies/SavedMovies";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";
import { AppContext } from "../../contexts/AppContext";

function MoviesCardList({
  // movies,
  onMovieSave,
  onMovieDelete,
  checkIsSavedStatus,
  visibleMoviesCount,
  loadMoreFilms,
  lastSearchSavedList
}) {
  const value = React.useContext(AppContext);
  const movies = value.movies;
  const savedMovies = value.savedMovies;
  const [countMoviesOnPage, setCountMoviesOnPage] = useState();
  const handleLoadMore = () => {
   loadMoreFilms();
  }

  useEffect(() => {
    if(movies){
      setCountMoviesOnPage(movies.length);
  }
  })
  /* const isMovieLiked = (id) => {
    return SavedMovies.includes((savedMovie) => savedMovie.id === id);
  } */

  return(
    <main className="movies section">
      {movies && (<Route path='/movies'>
      <section className="movies-cards">
        {
          movies.slice(0, visibleMoviesCount).map(movie => (
            <MoviesCard
              key={movie.id}
              movie={movie}
              onMovieSave={onMovieSave}
              onMovieDelete={onMovieDelete}
              checkIsSavedStatus={checkIsSavedStatus}
            />
          ))
        }
      </section>

      <div className={countMoviesOnPage < 4 || visibleMoviesCount > movies.length ?
        "movies-cards__more_none" : "movies-cards__more"}>
        <button
          type="button"
          className="movies-cards__more-button"
          onClick={handleLoadMore}
        >Ещё</button>
      </div>
      </Route>)}
      {savedMovies && (<Route path='/saved-movies'>
      <section className="movies-cards">
        {
          lastSearchSavedList.map(movie => (
            <SavedMoviesCard
              key={movie.movieId}
              movie={movie}
              onMovieSave={onMovieSave}
              onMovieDelete={onMovieDelete}
              checkIsSavedStatus={checkIsSavedStatus}
            />
          ))
        }
      </section>
      </Route>)}
    </main>

  )
}

export default MoviesCardList;