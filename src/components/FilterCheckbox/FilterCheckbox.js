import React, { useState } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ setShortMovies }) {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    setShortMovies();
  }
  return(
    <div className="filter-checkbox">

      <label className="filter-checkbox__label">
        <input
          type='checkbox'
          name="filterCheckbox"
          id="filterCheckbox"
          className="filter-checkbox__input"
          checked={isChecked}
          onChange={(e) => handleChange(e)}
        />
        <span></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;