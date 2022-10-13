// файл будет содержать описание запросов к нашему Api
// api.movies-explorer.ypon.nomoredomains.xyz 130.193.55.132
import { BASE_URL } from '../utils/constants';

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json()
    .then((res) => {
      // console.log({res});
      throw res.message;
    })
}
// Регистрация пользователя
export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  // credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({name, email, password})
})
.then(checkResponse);
};
// Авторизация пользователя
export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    // credentials: 'include',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};
// загрузка данных профиля
export const getProfileInfo = (token) => {
  return fetch(`${BASE_URL}/users/me `, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ token }`,
    },
  })
  .then(checkResponse)
}
  // изменение данных профиля на сервере
  export const setProfileInfo = (data, token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ token }`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email
      }),
    })
    .then(checkResponse)
  }

// сохранение фильма
export const addMovie = (data, token) => {
  // console.log({token})
  //console.log({data})
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ token }`,
    },
    body: JSON.stringify({...data}),
  })
  .then(checkResponse)
}
// Удаление фильма
export const deleteMovie = (_id, token) => {
  return fetch(`${BASE_URL}/movies/${_id}`, {
    method: 'DELETE',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ token }`,
    },
  }).then(checkResponse);
};

export const getUserMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${ token }`,
    },
}).then(checkResponse)
};

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`,
      }
    })
    .then(res => res.json())
  }