import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({
  experience: { title, company, location, current, to, from, description },
}) => (
  <div>
    {" "}
    <h3 className="text-dark">{company}</h3>{" "}
    <p>
      <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
      {!to ? "Attualmente in corso" : <Moment format="DD/MM/YYYY">{to}</Moment>}
    </p>
    <p>
      <strong>Posizione</strong> {title}
    </p>
    <p>
      <strong>Descrizione</strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
