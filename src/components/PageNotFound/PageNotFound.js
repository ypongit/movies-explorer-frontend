import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound () {
  const history = useHistory();
  return (
    <div className="not-found">
      <h3 className="not-found__title">
       <span>404</span>
      </h3>
      <p className="not-found__text">
        Страница не найдена
      </p>
      {/* <Link className="link link_type_to-main" to="/">Назад</Link> */}
      <button className="not-found__back" onClick={() => history.goBack()}>Назад</button>
    </div>
  )
}

export default PageNotFound;