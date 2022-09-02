import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard"

function MoviesCardList() {
  return(
    <main className="movies content">
      <section className="movies-cards">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </section>
      <div className="movies-cards__more">
        <button className="movies-cards__more-button">Ещё</button>
      </div>
    </main>

  )
}

export default MoviesCardList;