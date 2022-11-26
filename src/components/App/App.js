import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory, Redirect, useLocation } from 'react-router-dom';
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
import { validURL } from '../../utils/validURL';
import { SERVER_URL, UNKNOWN_TRAILER_URL, UNKNOWN_IMAGE_URL, UNKNOWN_CARD_TEXT } from '../../utils/constants';

function App() {
  const history = useHistory();
  const location = useLocation();
  const token = localStorage.getItem('jwt');
  const locLogin = localStorage.getItem('loggedIn');
  /* для хранения данных о пользователе использовать глобальную стейт-переменную
  currentUser, созданную с помощью createContext; */
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(JSON.parse(locLogin));
  // Все фильмы
  const [movies, setMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);

  // сохраненные фильмы (наша api)
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [lastSearchSavedList, setLastSearchSavedList] = useState([]); // переменная для отрисовки найденных фильмов
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
  // Проверка лок. хранилища на наличие токена
  // если у пользователя есть токен в localStorage,
  // эта функция проверит, действующий он или нет
  const checkToken = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      mainApi.getProfileInfo(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err)
          handleLogOut();
        });
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('loggedIn', loggedIn)
      /* if (location.pathname === "/signup" || location.pathname === "/signin") {
        history.push("/movies");
      } else {
        history.push(location.pathname);
      } */
    }
  }, [loggedIn, token/* , history, location.pathname*/]);

  // Открытие и закрытие информационного попапа
  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
  }
  /*
  // Функция запроса фильмов.
  const fetchMovies = () => {
    moviesApi.getMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem('allmovies', JSON.stringify(res));
      });
  }
   const [allMovies, setAllMovies] = useState([]); // все фильмы с сервера
  // Проверка лок. хранилища и запрос к серверу для получения фильмов
  useEffect(() => {
    const allLocalMovies = localStorage.getItem('allMovies');
      if (allLocalMovies) {
        try {
          setAllMovies(JSON.parse(allLocalMovies));
        } catch(err) {
          console.log(err);
          localStorage.removeItem('allMovies');
          fetchMovies();
        }
      } else {
        fetchMovies();
      }
  }, []); */


  // запрос к API за данными пользователя
  useEffect(() => {
    if (loggedIn) {
      if (token) {
        mainApi.getProfileInfo(token)
          .then(currentUserData => {
            setCurrentUser(currentUserData);
          })
          .catch((err) => console.log(err));
      }
      // запрос к API за данными о сохраненных фильмах
      const localSavedMovies = localStorage.getItem('savedMoviesList');
      if (localSavedMovies) {
        try {
          setSavedMovies(JSON.parse(localSavedMovies));
        } catch (err) {
          console.log(err);
          localStorage.removeItem('savedMoviesList');
          mainApi.getUserMovies(token)
            .then((currentSavedMovies) => {
              setSavedMovies(currentSavedMovies.movies)
              localStorage.setItem(
                'savedMoviesList',
                JSON.stringify(currentSavedMovies.movies)
              );
            })
        }
      } else {
        mainApi.getUserMovies(token)
          .then((currentSavedMovies) => {
            setSavedMovies(currentSavedMovies.movies);
            localStorage.setItem(
              'savedMoviesList',
              JSON.stringify(currentSavedMovies.movies)
            );
            setLoggedIn(true);
          })
          .catch((err) => console.log(err));
      }
    }
  }, [loggedIn]);

  // установка фильмов после перезагрузки
  useEffect(() => {
    const lastSearchList = localStorage.getItem('lastSearchList');
    if (lastSearchList) {
      try {
        setMovies(JSON.parse(lastSearchList));
      } catch (err) {
        console.log(err);
        localStorage.removeItem('movies');
        // fetchMovies();
      }
    } else {
      console.log("Список фильмов не обнаружен!")
    }
  }, []);

  // Функция добавления фильма в сохраненные
  const handleSaveMovie = (movie) => {
    let trailerLink = movie.trailerLink;
    const movieDataValid = validURL(trailerLink);
    movieDataValid ? trailerLink = movie.trailerLink : trailerLink = UNKNOWN_TRAILER_URL;
    const movieData = {
      country: movie.country || UNKNOWN_CARD_TEXT,
      director: movie.director || UNKNOWN_CARD_TEXT,
      duration: movie.duration,
      year: movie.year || UNKNOWN_CARD_TEXT,
      description: movie.description || UNKNOWN_CARD_TEXT,
      image: SERVER_URL + movie.image.url || UNKNOWN_IMAGE_URL,
      trailerLink: trailerLink || UNKNOWN_TRAILER_URL,
      thumbnail: SERVER_URL + movie.image.formats.thumbnail.url || UNKNOWN_IMAGE_URL,
      movieId: movie.id,
      nameRU: movie.nameRU || movie.nameEN || UNKNOWN_CARD_TEXT,
      nameEN: movie.nameEN || movie.nameRU || UNKNOWN_CARD_TEXT,
    }

    const token = localStorage.getItem('jwt');
    if (token) {
      setIsSending(true);
      mainApi.addMovie(movieData, token)
        .then((res) => {
          let copySavedMovies = Object.assign([], savedMovies);
          copySavedMovies.push(res.movie);
          setSavedMovies(copySavedMovies);
          localStorage.setItem('savedMoviesList', JSON.stringify(copySavedMovies));
        })
        .catch((err) => {
          console.log(err)
          setInfoTooltipTitle({
            icon: regFail,
            title: `Что-то пошло не так: ${err}`
          });
          setIsInfoTooltipOpen(true);
          return;
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
        localStorage.setItem('savedMoviesList', JSON.stringify(newSavedMovies));
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
        localStorage.setItem('savedMoviesList', JSON.stringify(newSavedMovies));
        // console.log({savedMovies});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Проверка нахождения фильмов в сохраненных
  const checkIsSavedStatus = (movie) => {
    if (savedMovies) {
      return savedMovies.some(
        (i) => i.movieId === movie.id && i.owner === currentUser._id
      );
    }
    return false;
  }

  // Функция подгрузки дополнительных фильмов
  const width = useCurrentWidth();
  // количество отображаемых карточек
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(getInitialCount(width));
  const loadMoreFilms = () => {
    setVisibleMoviesCount((prevCount) => prevCount + getByWidth(width));
    // console.log({visibleMoviesCount});
    setMovies(movies);
  }
  const savedCheckboxVal = localStorage.getItem('filterShortMovies') === 'true';
  const [checkBoxState, setcheckBoxState] = useState(savedCheckboxVal);

  const filterMovies = (moviesList, name) => {
    const lastSearchList = moviesList.filter((movie) => {
      if (checkBoxState === true) {
        return ((
          movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          // movie.description.toLowerCase().includes(name.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(name.toLowerCase())
        ) && movie.duration <= SHORT_MOVIES);
      } else {
        return (
          movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
          // movie.description.toLowerCase().includes(name.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(name.toLowerCase())
        );
      }
    });
    setMovies(lastSearchList);
    localStorage.setItem('lastSearchList', JSON.stringify(lastSearchList));
    localStorage.setItem('filterShortMovies', checkBoxState);

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

  // Поиск фильмов
  const searchMovies = (name) => {
    if (!name) {
      setInfoTooltipTitle({
        icon: regFail,
        title: 'Нужно ввести ключевое слово'
      });
      setIsInfoTooltipOpen(true);
      return;
    }
    // let localMovies = localStorage.getItem('movies');
    setMovies([]);
    localStorage.setItem('queryText', name);
    if (loggedIn) {
      const allLocalMovies = JSON.parse(localStorage.getItem('allMovies'));
      if (allLocalMovies) {
        console.log("Достали фильмы из локального хранилища.")
        filterMovies(allLocalMovies, name);
      } else {
        setIsLoading(true)
        moviesApi.getMovies()
          .then((res) => {
            setAllMovies(res);
            localStorage.setItem('allMovies', JSON.stringify(res));
          })
          .then(() => {
            console.log("В локальном хранилище ничего не было, сходили на сервер.")
            const allLocalMovies = JSON.parse(localStorage.getItem('allMovies'));
            filterMovies(allLocalMovies, name);
          }
          )
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            setIsLoading(false);
          })
      }
    }
  }

  const [foundMovies, setFoundMovies] = useState([]); // фильмы найденные в сохраненных по запросу

  const searchSavedMovies = (name) => {
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));
    if (!name) {
      setInfoTooltipTitle({
        icon: regFail,
        title: 'Нужно ввести ключевое слово'
      });
      setIsInfoTooltipOpen(true);
      return;
    }
    if (savedMoviesList) {
      const searchSavedMovie = savedMoviesList.filter((movie) => {
        const nameEN = movie.nameEN ? movie.nameEN : movie.nameRU;
        if (checkBoxState === true) {
          return ((
            movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
            // movie.description.toLowerCase().includes(name.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(name.toLowerCase())
          ) && movie.duration <= SHORT_MOVIES);
        } else {
          return (
            movie.nameRU.toLowerCase().includes(name.toLowerCase()) ||
            // movie.description.toLowerCase().includes(name.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(name.toLowerCase())
          );
        }
      });
      setFoundMovies(searchSavedMovie);
      setLastSearchSavedList(searchSavedMovie);
    }
  }

  // Обработчик формы регистрации
  const handleRegister = ({ name, email, password }) => {
    setIsSending(true);
    return mainApi.register({ name, email, password })
      .then((res) => {
        if (res) {
          setCurrentUser(res);

          // handleInfoTooltipClick();
          mainApi.authorize({ email, password })
            .then((res) => {
              //setCurrentUser(res);
              setLoggedIn(true);
              setInfoTooltipTitle({
                icon: regSuccess,
                title: 'Вы успешно зарегистрировались!'
              });
              setIsInfoTooltipOpen(true);
              history.push('movies');
            })
        } else {
          setInfoTooltipTitle({
            icon: regFail,
            title: "Что-то пошло не так! Попробуйте ещё раз."
          })
          setIsInfoTooltipOpen(true);
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
        if (!data.token) {
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
      .then(() => {
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipTitle({
          icon: regFail,
          title: err
        });
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        setIsSending(false);
      })
  }
  // Функция выхода из профиля
  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setCurrentUser({ name: '', email: '' });
    localStorage.removeItem('movies');
    localStorage.removeItem('filterShortMovies'); // состояние чекбокса
    localStorage.removeItem('lastSearchList');
    localStorage.removeItem('savedMoviesList'); // сохраненные фильмы
    localStorage.removeItem('queryText'); // текст запроса
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('allMovies');
    setMovies([]);
    setSavedMovies([]);
    history.push('/');
  }

  // Функция обновления данных профиля
  const handleUpdateProfile = (data) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      mainApi.setProfileInfo(data, token)
        .then((data) => {
          console.log({ data });
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
  /* const toggleShortMovies = () => {
    isShortMovies ? setIsShortMovies(false) : setIsShortMovies(true);

  } */
  const toggleShortSavedMovies = () => {
    isShortSavedMovies ? setIsShortSavedMovies(false) : setIsShortSavedMovies(true);
  }

  useEffect(() => {
    const lastSearchList = JSON.parse(localStorage.getItem('lastSearchList'));
    if (lastSearchList) {
      isShortMovies ? setMovies((state) => state.filter((i) => i.duration <= SHORT_MOVIES))
        : setMovies(lastSearchList);
    } else {
      console.log("Массив фильмов пустой!")
    }
  }, [isShortMovies]);

  useEffect(() => {
    const savedMoviesList = JSON.parse(localStorage.getItem('savedMoviesList'));

    isShortSavedMovies ? setLastSearchSavedList((state) => state.filter((i) => i.duration <= SHORT_MOVIES))
      : setLastSearchSavedList(foundMovies);
    // : setSavedMovies(lastSearchSavedList);
  }, [isShortSavedMovies, /* lastSearchSavedList */]);

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
              // getMovies={getMoviesList}
              searchMovies={searchMovies}
              setShortMovies={setIsShortMovies}
              useCurrentWidth={useCurrentWidth}
              getByWidth={getByWidth}
              width={width}
              getInitialCount={getInitialCount}
              setVisibleMoviesCount={setVisibleMoviesCount}
              loadMoreFilms={loadMoreFilms}
              visibleMoviesCount={visibleMoviesCount}
              savedCheckboxVal={savedCheckboxVal}
              setcheckBoxState={setcheckBoxState}
              checkBoxState={checkBoxState}
              isInfoTooltipOpen={isInfoTooltipOpen}
              InfoTooltipTitle={InfoTooltipTitle}
              lastSearchSavedList={lastSearchSavedList}
            />
            <ProtectedRoute
              path="/saved-movies"
              loggedIn={loggedIn}
              component={SavedMovies}
              checkIsSavedStatus={checkIsSavedStatus}
              onMovieDelete={handleDeleteSavedMovie}
              setShortMovies={setIsShortSavedMovies}
              isLoading={isLoading}
              getMovies={searchSavedMovies}
              searchMovies={searchSavedMovies}
              setcheckBoxState={setcheckBoxState}
              getInitialCount={getInitialCount}
              setVisibleMoviesCount={setVisibleMoviesCount}
              width={width}
              lastSearchSavedList={lastSearchSavedList}
              setLastSearchSavedList={setLastSearchSavedList}
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
                  handleRegister={handleRegister}
                  isSending={isSending}
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
