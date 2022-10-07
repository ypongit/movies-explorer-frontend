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
  savedMovies
}){
  const [queryParams, setQueryParams] = useState({});
    // console.log({queryParams});
    /* const filterShortMovies = localStorage.getItem('filterShortMovies');
    const queryText = localStorage.getItem('queryText'); */
  useEffect(() => {
    setQueryParams({filterShortMovies: localStorage.getItem('filterShortMovies'),
    queryText: localStorage.getItem('queryText')});
  }, []);
  const savedCheckboxVal = localStorage.getItem('filterShortMovies')==='true';

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
      />
      {isLoading && <Preloader />}
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