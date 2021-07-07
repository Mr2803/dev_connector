import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile.action";

const Education = ({ education = [], deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
        {edu.to === null ? (
          "Attualmente in corso"
        ) : (
          <Moment format="DD/MM/YYYY">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(edu._id)}
        >
          Elimina
        </button>
      </td>
    </tr>
  ));
  if (education.length === 0) {
    return <h1>Nessuna Formazione aggiunta</h1>;
  }
  return (
    <>
      <h2 className="my-2">Formazione</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Scuola</th>
            <th className="hide-sm">Grado</th>
            <th className="hide-sm">Periodo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
