import React from "react";
import "./SearchForm.css";
import findButton from "../../images/findButton.svg";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox.js"

function SearchForm(){
  return(
    <section className="search section">
      <div className="search__wrapper">
        <form className="search__form">
            <input
              className="search__input"
              type="text"
              name="film"
              placeholder="Фильм"
              required
            />
            <button type="submit" className="search__button">
              <img src={findButton}
                alt="кнопка поиска"

              />
            </button>
            <FilterCheckbox />
        </form>
      </div>

    </section>

  )
}

export default SearchForm;