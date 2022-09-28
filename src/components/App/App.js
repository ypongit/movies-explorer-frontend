import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
// import logo from '../../logo.svg';
// компоненты приложения
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import regSuccess from '../../images/regSuccess.svg';
import regFail from '../../images/regFail.svg';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { AppContext } from '../../contexts/AppContext';
import { SHORT_MOVIES } from '../../utils/constants';

import { useCurrentWidth } from '../../hooks/useCurrentWidth';
import { getByWidth, getInitialCount } from '../../utils/loadByWidth';

function App() {
  const history = useHistory();
  /* для хранения данных о пользователе использовать глобальную стейт-переменную
  currentUser, созданную с помощью createContext; */
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  // Все фильмы
  const [movies, setMovies] = React.useState([]);
  // console.log({movies});
  // сохраненные фильмы (наша api)
  const [savedMovies, setSavedMovies] = React.useState([]);

  // переменные состояния
  const [isLoading, setIsLoading] = useState(false);  // Загрузка фильмов
  const [isSending, setIsSending] = useState(false);  // Сохранение фильмов
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [isShortSavedMovies, setIsShortSavedMovies] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);  // видимость уведомления
  const [InfoTooltipTitle, setInfoTooltipTitle] = useState({
    title: "",
    icon: regFail,
  });
  useEffect(() => {
    checkToken();
  }, []);

  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  };
  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }

useEffect(() => {
    if (loggedIn) {
      history.push("/movies");
      return;
    }
    history.push("/")
  }, [loggedIn]);

// запрос к API за данными пользователя
useEffect(() => {
  if (loggedIn) {
    const token = localStorage.getItem('jwt');
    if (token){
      mainApi.getProfileInfo(token)
      .then(currentUserData => {setCurrentUser(currentUserData);
      })
      .catch((err) => console.log(err));
    // запрос к API за данными о сохраненных фильмах
      mainApi.getUserMovies(token)
      .then(currentSavedMovies => {
        setSavedMovies(currentSavedMovies.movies);
        localStorage.setItem(
          'savedMovieList',
          JSON.stringify(currentSavedMovies)
        );
      })
      .catch((err) => console.log(err));
    }

// Проверка лок. хранилища и запрос к серверу для получения фильмов
/*     const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      try {
        setMovies(JSON.parse(localMovies));
      } catch(err) {
        console.log(err);
        localStorage.removeItem('movies');
        fetchMovies();
      }
    } else {
      fetchMovies();
    } */
  }
}, [loggedIn]);

// Функция добавления фильма в сохраненные
const handleSaveMovie = (movie) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    setIsSending(true);
    mainApi.addMovie(movie, token)
    .then((res) => {
      // console.log('res.movie ->', res.movie);
      let copySavedMovies = Object.assign([], savedMovies);
      copySavedMovies.push(res.movie);
      setSavedMovies(copySavedMovies);
      localStorage.setItem('savedMoviesList', JSON.stringify(savedMovies));
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsSending(false));
  }
}

// Функция удаления фильма
const handleDeleteMovie = (movie) => {
  const token = localStorage.getItem('jwt');
  const movieForDelete = savedMovies.find((i) => i.movieId === movie.id);
    mainApi.deleteMovie(movieForDelete._id, token)
    .then((res) => {
      const newSavedMovies = savedMovies.filter(
        (i) => i.movieId !== movie.id
      );
      setSavedMovies(newSavedMovies);
      localStorage.setItem('savedMovieList', JSON.stringify(newSavedMovies));
      console.log({savedMovies});
      })
    .catch((err) => {
      console.log(err);
    });
  }

// Функция удаления фильма на странице сохраненных
const handleDeleteSavedMovie = (movie) => {
  // console.log('DelSaveMovie ->', movie)
  const token = localStorage.getItem('jwt');
    mainApi.deleteMovie(movie._id, token)
    .then((res) => {
      const newSavedMovies = savedMovies.filter(
        (i) => i._id !== movie._id
      );
      setSavedMovies(newSavedMovies);
      localStorage.setItem('savedMovieList', JSON.stringify(newSavedMovies));
      // console.log({savedMovies});
      })
    .catch((err) => {
      console.log(err);
    });
  }

// Проверка нахождения фильмов в сохраненных
const checkIsSavedStatus = (movie) => {
  if (savedMovies) {
  /* console.log('savedMovies -> ', savedMovies)
  console.log('movies -> ', movies)*/
  // console.log('currentUser._id -> ', currentUser._id)
    return savedMovies.some(
      (i) => i.movieId === movie.id && i.owner === currentUser._id
    );
  }
  return false;
}

// Функция запроса фильмов.
const fetchMovies = () => {
  moviesApi.getMovies()
    .then((res) => {
      setMovies(res);
      localStorage.setItem('movies', JSON.stringify(res));
    });
}
// Функция подгрузки дополнительных фильмов
const width = useCurrentWidth();

const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));
const loadMoreFilms = () => {
  setVisibleMoviesCount((prevCount) => prevCount + getByWidth(width));
  // console.log({visibleMoviesCount});
}
  /* Как только поиск произведён, текст запроса, найденные фильмы и
  состояние переключателя короткометражек сохраняются в хранилище,
  а блок появляется. */
  // функция поиска фильма в локальном хранилище
  const searchMovies = (name) => {
    if (!name) {
      setInfoTooltipTitle({
        icon: regFail,
        title: 'Нужно ввести ключевое слово'
      });
      setIsInfoTooltipOpen(true);
      return;
    }
    const localMovies = localStorage.getItem('movies');
    if (localMovies) {
      try {
        setMovies(JSON.parse(localMovies));
      } catch(err) {
        console.log(err);
        localStorage.removeItem('movies');
        fetchMovies();
      }
    } else {
      fetchMovies();
    }
    const moviesList = JSON.parse(localStorage.getItem('movies'));
    const lastSearchList = moviesList.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
        // movie.description.toLowerCase().includes(name.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(name.toLowerCase())
      );
    });
    setMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    lastSearchList.length === 0 &&
    setTimeout(() => {
        setInfoTooltipTitle({
          icon: regFail,
          title: 'Ничего не найдено'
        });
        setIsInfoTooltipOpen(true);
      }, 1200);
    return lastSearchList;
  }
  const getMoviesList = (name) => {
     if (loggedIn) {
      setIsLoading(true);
      moviesApi.getMovies()
      .then((res) => {
        // console.log('res ', res);
        setMovies(res);
        // console.log('Поиск фильма ', movies);
        localStorage.setItem('movies', JSON.stringify(res));
        searchMovies(name);
      })
      .catch((err) => {
        setInfoTooltipTitle({
          icon: regFail,
          title: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        });
        setIsInfoTooltipOpen(true);
      })
    .finally(() => {
      setIsLoading(false);
    })
    }
  }
  const searchSavedMovies = (name) => {
    const savedMovieList = JSON.parse(localStorage.getItem('savedMoviesList'));
    if (!name) {
      setInfoTooltipTitle({
        icon: regFail,
        title: 'Нужно ввести ключевое слово'
      });
      setIsInfoTooltipOpen(true);
      return;
    }
    if (savedMovieList) {
      const searchSavedMovie = savedMovieList.filter((movie) => {
        const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
        return (
          movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          movie.description.toLowerCase().includes(name.toLowerCase()) ||
          nameEN.toLowerCase().includes(name.toLowerCase())
        );
      });
      setSavedMovies(searchSavedMovie);
    }
  }

  // Проверка лок. хранилища на наличие токена
  // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
  const checkToken = () => {
      if (localStorage.getItem('jwt')){
        const jwt = localStorage.getItem('jwt');
         mainApi.getProfileInfo(jwt)
         .then((res) => {
           if (res){
             setCurrentUser(res);
             setLoggedIn(true);
           }
         })
      }
    }

// Обработчик формы регистрации
  const handleRegister = ({ name, email, password }) => {
    setIsSending(true);
    return mainApi.register({ name, email, password })
    .then((res) => {
      if (res) {
        setCurrentUser(res);
        setInfoTooltipTitle({
          icon: regSuccess,
          title: 'Вы успешно зарегистрировались!'
        });
        // handleInfoTooltipClick();
        mainApi.authorize({ email, password} )
          .then((res) => {
            //setCurrentUser(res);
            setLoggedIn(true);
            history.push('movies');
          })
      } else {
        setInfoTooltipTitle({
          icon: regFail,
          title: "Что-то пошло не так! Попробуйте ещё раз."
        })
        // handleInfoTooltipClick();
      }
      history.push('/movies');
    })
    .catch((err) => {
      setInfoTooltipTitle({
        icon: regFail,
        title: "Что-то пошло не так! Попробуйте ещё раз."
      });
    })
    .finally(() => {
      setIsSending(false);
    });
  }

  // Обработчик формы авторизации
  const handleLogin = (email, password) => {
    setIsSending(true);
    return mainApi
      .authorize(email, password)
      .then((data) => {
       // нужно проверить, есть ли у данных jwt
       if(!data.token){
         return;
      }
         localStorage.setItem('jwt', data.token);
        // сбросьте стейт, затем в колбэке установите
      setLoggedIn(true);
      setCurrentUser(data);
      setInfoTooltipTitle({
        icon: regSuccess,
        title: 'Доступ предоставлен!'
      });
      history.push('/movies');
  })
  .catch((err) => {
    console.log(err);
    setInfoTooltipTitle({
      icon: regFail,
      title: 'Доступ запрещен!'
    });
  })
  .finally(() => {
    setIsSending(false);
  })
  }
  // Функция выхода из профиля
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({ name: '', email: ''});
    history.push('/');
  }

  const infoPopupClose = () => {
    setInfoTooltipTitle(false);
  }
// Функция обновления данных профиля
  const handleUpdateProfile = (data) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.setProfileInfo(data, token)
      .then((data) => {
        console.log({data});
        if (data) {
          setCurrentUser({
            ...currentUser,
            name: data.name,
            email: data.email,
          });
          setInfoTooltipTitle({
            icon: regSuccess,
            title: 'Данные успешно обновлены!'
          });
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setInfoTooltipTitle({
          icon: regFail,
          title: 'Что-то пошло не так! Попробуйте ещё раз.'
        });
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
    }
  }
// Фильтр короткометражек
const toggleShortMovies = () => {
  isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true);
  console.log({isShortMovies});
}
const toggleShortSavedMovies = () => {
  isShortSavedMovies ? setIsShortSavedMovies(false) : setIsShortSavedMovies(true);
  console.log({isShortSavedMovies});
}

useEffect(() => {
  const lastSearchList = JSON.parse(localStorage.getItem('movies'));
  isShortMovies ? setMovies((state) => state.filter((i) => i.duration <= SHORT_MOVIES))
  : setMovies(lastSearchList);
}, [isShortMovies]);

useEffect(() => {
  const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
  isShortSavedMovies ? setSavedMovies((state) => state.filter((i) => i.duration <= SHORT_MOVIES))
  : setSavedMovies(savedMoviesList);
}, [isShortSavedMovies]);

  return (
    // компонент App внедрить контекст через CurrentUserContext.Provider
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          loggedIn: loggedIn,
          isLoading: isLoading,
          movies: movies,
          savedMovies: savedMovies
        }}
      >
        <div className="page">

        <Switch>
            {/* <Route path="/movies"
              loggedIn={loggedIn}
            >
              <Movies
                movies={movies}
              />
            </Route> */}
          {/* защищённые маршруты */}
          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            isLoading={isLoading}
            onMovieSave={handleSaveMovie}
            onMovieDelete={handleDeleteMovie}
            checkIsSavedStatus={checkIsSavedStatus}
            getMovies={getMoviesList}
            searchMovies={searchMovies}
            setShortMovies={toggleShortMovies}
            useCurrentWidth={useCurrentWidth}
            getByWidth={getByWidth}
            getInitialCount={getInitialCount}
            loadMoreFilms={loadMoreFilms}
            visibleMoviesCount={visibleMoviesCount}
          />
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            checkIsSavedStatus={checkIsSavedStatus}
            onMovieDelete={handleDeleteSavedMovie}
            setShortMovies={toggleShortSavedMovies}
            isLoading={isLoading}
            getMovies={searchSavedMovies}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdateUser={handleUpdateProfile}
            logout={handleLogOut}
            isLoading={isLoading}
          />

          <Route path="/signup">
            {loggedIn ? (
              <Redirect to='/' />
            ) : (
            <Register
              handleRegister = {handleRegister}
              isSending = {isSending}
              InfoTooltipTitle={InfoTooltipTitle}
              handleInfoTooltipClick={handleInfoTooltipClick}

            />
            )}
          </Route>
          <Route path="/signin">
            {loggedIn ? (
              <Redirect to='/' />
            ) : (
              <Login
                handleLogin={handleLogin}
                handleInfoTooltipClick={handleInfoTooltipClick}
              />
            )}
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
        {/* информирует пользователя об успешной (или не очень) регистрации. */}
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={InfoTooltipTitle.title}
          icon={InfoTooltipTitle.icon}
          name="infotool"
        />
        {/*<header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
        </header>*/}
      </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>



  );
}

export default App;
