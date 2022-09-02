import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from '../../logo.svg';
import Main from '../Main/Main';
// import Header from '../Header/Header';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Register from '../Register/Register';
import Login from '../Login/Login';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (

      <div className="page">

        <Switch>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/saved-movies">
            <SavedMovies />
          </Route>
          <Route path="/profile">
            <Profile
              currentUser="Юрий"
            />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login  />
          </Route>
          <Route path="/about">
            <AboutProject />
          </Route>
          <Route path="/techs">
            <Techs />
          </Route>
          <Route path="/student">
            <AboutMe />
          </Route>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        {/*<header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
        </header>*/}
      </div>


  );
}

export default App;
