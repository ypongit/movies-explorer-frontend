import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MenuBurger from "../MenuBurger/MenuBurger";
import logo from "../../images/logo.svg";

function Movies(){
  const loggedIn = true;
  // console.log({movies});
  return(
    <>
      <MenuBurger />
      <Header
        loggedIn={loggedIn}
        headerMain = ""
        moviesMain = ""
        linkProfile = ""
        profileText = "Аккаунт"
        headerLogo={logo}
      />
      <SearchForm />
      {/* <Preloader /> */}
      <MoviesCardList

      />
      <Footer />
    </>
  )
}

export default Movies;