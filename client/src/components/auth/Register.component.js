import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert.action";
import { register } from "../../actions/auth.action";
import PropTypes from "prop-types";
const Register = ({ setAlert, register, isAuth }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { name, email, password, passwordConfirm } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setAlert("Le password non corrispondono", "danger", 3000);
    } else {
      register({ name, email, password });
    }
  };

  //redirect if logged in
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <h1 className="large text-primary">Registrati</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Crea il tuo account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Password"
            name="password"
            minLength="8"
          />
        </div>
        <div className="form-group">
          <input
            value={passwordConfirm}
            onChange={(e) => onChange(e)}
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            minLength="8"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Hai già un account? <Link to="/login">Vai al Login</Link>
      </p>
    </>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const MapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(MapStateToProps, { setAlert, register })(Register);
