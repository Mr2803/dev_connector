import React from "react";
import PropTypes from "prop-types";

const _404 = (props) => {
  return (
    <>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle">404 Page Not Found</i>
      </h1>
      <p className="large">Spiacenti , questa pagina non esiste</p>
    </>
  );
};

_404.propTypes = {};

export default _404;
