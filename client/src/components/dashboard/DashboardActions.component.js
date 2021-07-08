import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = ({ user: { _id } }) => {
  console.log(_id);
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
      <Link to={`/profile/${_id}`} className="btn btn-light">
        <i className="fas fa-users text-primary"></i> Profilo Pubblico
      </Link>
    </div>
  );
};

export default DashboardActions;
