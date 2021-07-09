import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar.component";
import Landing from "./components/layout/Landing.component";
import Login from "./components/auth/Login.component";
import Register from "./components/auth/Register.component";
import Alert from "./components/layout/Alert.component";
import Dashboard from "./components/dashboard/Dashboard.component";
import CreateProfile from "./components/profile-forms/CreateProfile.component";
import AddExperience from "./components/profile-forms/AddExperience.component";
import AddEducation from "./components/profile-forms/AddEducation.component";
import EditProfile from "./components/profile-forms/EditProfile.component";
import Profiles from "./components/profiles/Profiles.component";
import Profile from "./components/profile/Profile.component";
import Posts from "./components/posts/Posts.component";
import Post from "./components/post/Post.component";
import PrivateRoute from "./components/routing/PrivateRoute";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth.action";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/profiles" component={Profiles}></Route>
              <Route exact path="/profile/:id" component={Profile}></Route>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/posts/:id" component={Post} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
