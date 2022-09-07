import React, { useState } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import initialMovies from '../../utils/initialMovies';

function MoviesCardList() {
  // const [movies, setMovies] = React.useState([]);

    const moviesData = initialMovies.map(item => {
    return {
      name: item.name,
      link: item.link
    }
  });
  /*
  // Сохраняем карточки в стейт cards
  setMovies(moviesData); */

  return(
    <main className="movies section">
      <section className="movies-cards">
        {
          moviesData.map(film => (
            <MoviesCard
              name={film.name}
              link={film.link}
            />
          ))
        }

      </section>
      <div className="movies-cards__more">
        <button type="button" className="movies-cards__more-button">Ещё</button>
      </div>
    </main>

  )
}

export default MoviesCardList;