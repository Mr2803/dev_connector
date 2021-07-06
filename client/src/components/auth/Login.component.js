import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth.action";

function Login({ login, isAuth }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //redirect if logged in
  if (isAuth) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <h1 className="large text-primary">Effettua il Login</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Esegui il login con il tuo account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Non hai un account ? <Link to="/register">Vai alla registrazione</Link>
      </p>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
};

const MapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(MapStateToProps, { login })(Login);
