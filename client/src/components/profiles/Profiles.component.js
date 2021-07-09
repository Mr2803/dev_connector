import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner.component";
import { connect } from "react-redux";
import {
  getProfiles,
  filterProfileByStatus,
} from "../../actions/profile.action";
import ProfileItem from "./ProfileItem.component";

const Profiles = ({
  getProfiles,
  profile: { profiles, loading, filteredProfiles },
  filterProfileByStatus,
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  const allStatus = [
    "Tutti",
    ...new Set(profiles.map((profile) => profile.status)),
  ];

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <select
            name="status"
            id=""
            onChange={(val) => {
              filterProfileByStatus(val.target.value);
            }}
          >
            {allStatus.map((status, index) => (
              <option key={index}>{status}</option>
            ))}
          </select>
          <h1 className="large text-primary">Devs</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i>Naviga e connettiti con
            altri sviluppatori
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              )
            ) : (
              <h4>Nessun Profilo trovato</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  filterProfileByStatus: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, filterProfileByStatus })(
  Profiles
);
