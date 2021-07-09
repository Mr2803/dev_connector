import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login.component";
import Register from "../auth/Register.component";
import Alert from "../layout/Alert.component";
import Dashboard from "../dashboard/Dashboard.component";
import CreateProfile from "../profile-forms/CreateProfile.component";
import AddExperience from "../profile-forms/AddExperience.component";
import AddEducation from "../profile-forms/AddEducation.component";
import EditProfile from "../profile-forms/EditProfile.component";
import Profiles from "../profiles/Profiles.component";
import Profile from "../profile/Profile.component";
import Posts from "../posts/Posts.component";
import Post from "../post/Post.component";
import _404 from "../layout/_404.component";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/profiles" component={Profiles}></Route>
        <Route exact path="/profile/:id" component={Profile}></Route>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={_404} />
      </Switch>
    </section>
  );
};

export default Routes;
