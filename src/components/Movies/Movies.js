import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MenuBurger from "../MenuBurger/MenuBurger";
import logo from "../../images/logo.svg";
import { AppContext } from "../../contexts/AppContext";

function Movies({
  movies,
  visibleMoviesCount,
  onMovieSave,
  onMovieDelete,
  checkIsSavedStatus,
  getMovies,
  setShortMovies,
  isLoading
}){
  return(
    <>
      <MenuBurger />
      <Header
        headerMain = ""
        moviesMain = ""
        linkProfile = ""
        profileText = "Аккаунт"
        headerLogo={logo}
      />
      <SearchForm
        getMovies={getMovies}
        setShortMovies={setShortMovies}
        isLoading={isLoading}
      />
      {isLoading && <Preloader />}
      <MoviesCardList
        movies={movies}
        visibleMoviesCount={visibleMoviesCount}
        onMovieSave={onMovieSave}
        checkIsSavedStatus={checkIsSavedStatus}
        onMovieDelete={onMovieDelete}
      />
      <Footer />
    </>
  )
}

export default Movies;