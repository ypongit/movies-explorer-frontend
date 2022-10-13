import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import findButton from "../../images/findButton.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js";
import useFormWithValidation from "../../hooks/useFormWithValidation";
/* После сабмита формы поиска производится валидация. Если в поле не введён текст, выводится ошибка «Нужно ввести ключевое слово».
Если слово введено, то осуществляется запрос к API. Сервис, к которому нужно обратиться — https://api.nomoreparties.co/beatfilm-movies.
Вам не нужно настраивать параметры запроса — получите все данные с сервиса, а фильтровать их вы уже будете на клиентской части.
После получения данных от сервера нужно отобразить их в блоке результатов. О нём далее.
 */
function SearchForm({
  isLoading,
  getMovies,
  searchMovies,
  setShortMovies,
  queryParams,
  savedCheckboxVal,
  setcheckBoxState
}) {
  // Стейт, в котором содержится значение инпута
  const [searchValue, setSearchValue] = React.useState('');

  const [isChecked, setIsChecked] = useState(savedCheckboxVal);
  // const [checkBoxState, setcheckBoxState] = useState(savedCheckboxVal);

  /* useEffect(() => {
    localStorage.setItem('filterShortMovies', checkBoxState);
  }, [checkBoxState]); */

  // console.log({checkBoxState})
  useEffect(() => {
    setSearchValue(queryParams.queryText)
  },[queryParams])
  const errText = "Нужно ввести ключевое слово";
  const [inputValidity, setInputValidity] = React.useState('');

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  // const { name } = values;
  const name = searchValue;
  function changeSearchText(event) {
    setSearchValue(event.target.value);
 }
  function handleSubmit(e) {
    e.preventDefault();

    /* isValid &&  */
    searchMovies(name);
    localStorage.setItem('queryText', name);
    // localStorage.setItem('filterShortMovies', checkBoxState);

    // resetForm();
  }

  return(
    <section className="search section">
      <div className="search__wrapper">
        <form
          className="search__form"
          name="search_form"
          title="Поиск"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="search__input">
            <input
              className="search__input"
              type="text"
              name="name"
              placeholder="Фильм"
              required
              maxLength="60"
              onChange={changeSearchText}/* handleChange */
              value={searchValue || ''} /* {name || '' } */
            />
            <span className={`search__input-err ${!isValid ? 'search__input-err_enable' : ''}`}>{errors.name}</span>
          </div>

            <button
              type="submit"
              /* className={`search__button ${
                !isValid ? 'search__button_disabled' : ''
              }`} */
              className="search__button"
              // disabled={!isValid}
            >
              <img src={findButton}
              alt="кнопка поиска"
              />
            </button>
            <FilterCheckbox
              setShortMovies={setShortMovies}
              queryParams={queryParams}
              setIsChecked={setIsChecked}
              setcheckBoxState={setcheckBoxState}
              savedCheckboxVal={savedCheckboxVal}
            />
        </form>
      </div>

    </section>

  )
}

export default SearchForm;