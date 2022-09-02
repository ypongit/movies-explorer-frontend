import React from "react";
import Header from "../Header/Header";
import Promo from "../Promo/Promo";
// import Navigation from "../Navigation/Navigation";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import "./Main.css";
import logo from '../../images/logo.png';
import MenuBurger from "../MenuBurger/MenuBurger";

function Main() {
  const logged = true;

  return (
    <>
      <MenuBurger />
      <Header
        logged={logged}
        headerMain=" header_main"
        moviesMain=" header__link-movies_main"
        profileText=""
        linkProfile=" header__link-profile_main"
        headerLogo={logo}
      />


      <Promo />
      {/* <Navigation /> */}
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />

      {/* <main className="content">
        <h2>Компонент Main</h2>
      </main> */}
    </>
  );
}

export default Main;