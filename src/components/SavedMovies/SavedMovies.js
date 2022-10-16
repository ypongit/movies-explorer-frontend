import React, { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MenuBurger from "../MenuBurger/MenuBurger";
import { AppContext } from '../../contexts/AppContext';

function SavedMovies ({
  isSearch,
  isLoading,
  getMovies,
  checkLikeStatus,
  onMovieDelete,
  setShortMovies,
  searchMovies,
  setcheckBoxState,
  getInitialCount,
  setVisibleMoviesCount,
  width
}) {
  const [queryParams, setQueryParams] = useState({});
  const value = React.useContext(AppContext);
  const savedMovies = value.savedMovies;
  const savedCheckboxVal = false;
  // console.log({savedMovies});
  return(
    <>
      <MenuBurger />
      <Header
        headerMain = ""
        moviesMain = ""
        linkProfile = ""
        profileText = "Аккаунт"
      />

      <SearchForm
        isLoading={isLoading}
        getMovies={getMovies}
        searchMovies={searchMovies}
        setShortMovies={setShortMovies}
        queryParams={queryParams}
        savedCheckboxVal={savedCheckboxVal}
        setcheckBoxState={setcheckBoxState}
        getInitialCount={getInitialCount}
        setVisibleMoviesCount={setVisibleMoviesCount}
        width={width}
      />
      {isLoading && <Preloader />}
      {/* <SavedMoviesCardList /> */}
      {/* {savedMovies && <MoviesCardList />} */}
      {savedMovies && (<MoviesCardList
        onMovieDelete={onMovieDelete}
      />)}
      <Footer />
    </>
  )
}

export default SavedMovies;