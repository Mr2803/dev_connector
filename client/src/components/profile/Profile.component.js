import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner.component";
import ProfileTop from "./ProfileTop.component";
import ProfileAbout from "./ProfileAbout.component";
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
