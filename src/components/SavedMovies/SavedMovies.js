import React from "react";
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
}) {
  const value = React.useContext(AppContext);
  const savedMovies = value.savedMovies;
  // console.log({savedMovies});
  return(
    <>
      <MenuBurger />
      <Header />

      <SearchForm
        isLoading={isLoading}
        getMovies={getMovies}
        setShortMovies={setShortMovies}
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