import React, { useState, useEffect } from "react";
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
  searchMovies,
  setShortMovies,
  isLoading,
  useCurrentWidth,
  getByWidth,
  getInitialCount,
  loadMoreFilms,
  fetchMovies,
  savedMovies,
  setcheckBoxState,
  isInfoTooltipOpen
}){
  const value = React.useContext(AppContext);
  const savedCheckboxVal = localStorage.getItem('filterShortMovies')==='true';
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    setQueryParams({ queryText: localStorage.getItem('queryText') });
  }, []);

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
        searchMovies={searchMovies}
        setShortMovies={setShortMovies}
        isLoading={isLoading}
        queryParams={queryParams}
        fetchMovies={fetchMovies}
        savedCheckboxVal={savedCheckboxVal}
        setcheckBoxState={setcheckBoxState}
      />
      {isLoading && <Preloader />}
      {/* {isInfoTooltipOpen && <h2>Нужно ввести ключевое слово</h2>} */}
      <MoviesCardList
        movies={movies}
        visibleMoviesCount={visibleMoviesCount}
        onMovieSave={onMovieSave}
        checkIsSavedStatus={checkIsSavedStatus}
        onMovieDelete={onMovieDelete}
        useCurrentWidth={useCurrentWidth}
        getByWidth={getByWidth}
        getInitialCount={getInitialCount}
        loadMoreFilms={loadMoreFilms}
        savedMovies={savedMovies}
      />
      <Footer />
    </>
  )
}

export default Movies;