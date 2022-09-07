import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import MenuBurger from "../MenuBurger/MenuBurger";
import logo from "../../images/logo.svg";

function SavedMovies () {
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

      <SearchForm />
      {/* <Preloader /> */}
      <SavedMoviesCardList />

      <Footer />
    </>
  )
}

export default SavedMovies;