import React, { useState, useEffect } from "react";
import "./FilterCheckbox.css";

function FilterCheckbox({ setShortMovies, savedCheckboxVal/* queryParams,  setcheckBoxState,  */}) {


  const [isChecked, setIsChecked] = useState(savedCheckboxVal);
  const [checkBoxState, setcheckBoxState] = React.useState(savedCheckboxVal);

  useEffect(() => {
    localStorage.setItem('filterShortMovies', checkBoxState);

  }, [checkBoxState]);

  useEffect(() => {
    // console.log({isChecked});
    setShortMovies(isChecked);
    setcheckBoxState(isChecked);

    // localStorage.setItem('filterShortMovies', checkBoxState);
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