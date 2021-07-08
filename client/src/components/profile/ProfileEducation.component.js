import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
  education: { school, degree, current, description, fieldfofstudy, from, to },
}) => (
  <div>
    {" "}
    <h3 className="text-dark">{school}</h3>{" "}
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {!to ? "Attualmente in corso" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Titolo :</strong> {degree}
    </p>
    <p>
      <strong>Tipo di studi :</strong>{" "}
      {!fieldfofstudy ? "Non specificato" : fieldfofstudy}
    </p>
    <p>
      <strong>Descrizione</strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
