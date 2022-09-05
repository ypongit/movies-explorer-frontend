import React from "react";
import "./FilterCheckbox.css";

function FilterCheckbox() {
  return(
    <div className="filter-checkbox">

      <label className="filter-checkbox__label">
        <input
          type='checkbox'
          name="filterCheckbox"
          id="filterCheckbox"
          className="filter-checkbox__input"
        />
        <span></span>
      </label>
      <p className="filter__title">Короткометражки</p>
    </div>
  );
}

export default FilterCheckbox;