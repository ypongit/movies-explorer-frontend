import React, { useState, useEffect } from "react";
import "./Movies.css";
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
  setVisibleMoviesCount,
  width,
  loadMoreFilms,
  fetchMovies,
  savedMovies,
  setcheckBoxState,
  checkBoxState,
  isInfoTooltipOpen,
  InfoTooltipTitle
}){
  const value = React.useContext(AppContext);
  const savedCheckboxVal = localStorage.getItem('filterShortMovies')==='true';
  const [queryParams, setQueryParams] = useState({});
  useEffect(() => {
    localStorage.setItem('filterShortMovies', checkBoxState);
  }, [checkBoxState])
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
        checkBoxState={checkBoxState}
        getInitialCount={getInitialCount}
        setVisibleMoviesCount={setVisibleMoviesCount}
        width={width}
      />
      {isInfoTooltipOpen && (<p className="movies__message">{InfoTooltipTitle.title}</p>)}
      {isLoading ? (<Preloader />) : (
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
      )}


      <Footer />
    </>
  )
}

export default Movies;