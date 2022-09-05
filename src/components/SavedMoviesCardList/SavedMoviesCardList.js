import React, { useState } from "react";
import "./SavedMoviesCardList";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";
import initialMovies from '../../utils/savedInitialMovies';

function SavedMoviesCardList() {
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
    <main className="movies content">
      <section className="movies-cards">

        {
          moviesData.map(film => (
            <SavedMoviesCard
              name={film.name}
              link={film.link}
            />
          ))
        }

      </section>
      <div className="movies-cards__more">
        <button className="movies-cards__more-button">Ещё</button>
      </div>
    </main>

  )
}

export default SavedMoviesCardList;