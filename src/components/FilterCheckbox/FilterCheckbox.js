import React, { useState, useEffect } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ setShortMovies, queryParams, setcheckBoxState, savedCheckboxVal }) {


  const [isChecked, setIsChecked] = useState(false);
  // const savedCheckboxVal = localStorage.getItem('filterShortMovies')==='true';
  /* console.log('savedCheckboxVal -> ', savedCheckboxVal);
  console.log('isChecked -> ', isChecked); */

  useEffect(() => {
    setIsChecked(savedCheckboxVal);
  }, []);
  useEffect(() => {
    // console.log({isChecked});
    setShortMovies(isChecked);
    setcheckBoxState(isChecked);
  }, [isChecked]);
  const handleChange = (e) => {
    setIsChecked(!isChecked);
  }

  return(
    <div className="filter-checkbox">

      <label className="filter-checkbox__label">
        <input
          type='checkbox'
          name="filterCheckbox"
          id="filterCheckbox"
          className="filter-checkbox__input"
          checked={isChecked || false}
          onChange={handleChange}
        />
        <span></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;