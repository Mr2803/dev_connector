import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner.component";
import ProfileTop from "./ProfileTop.component";
import ProfileAbout from "./ProfileAbout.component";
import ProfileExperience from "./ProfileExperience.component";
import ProfileEducation from "./ProfileEducation.component";
import ProfileGithub from "./ProfileGithub.component";
import { getProfileById } from "../../actions/profile.action";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Ritorna ai profili
          </Link>
          {auth.isAuth &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <>
                <Link to="/edit-profile" className="btn btn-dark">
                  Modifica profilo
                </Link>
                <h3>Questo è il tuo profilo pubblico</h3>
              </>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Esperienze</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((exp) => {
                    return <ProfileExperience key={exp._id} experience={exp} />;
                  })}
                </>
              ) : (
                <h4>Nessuna esperienza inserita</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Formazione</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((edu) => {
                    return <ProfileEducation key={edu._id} education={edu} />;
                  })}
                </>
              ) : (
                <h4>Nessuna esperienza inserita</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
