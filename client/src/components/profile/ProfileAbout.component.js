import React from "react";
import PropTypes from "prop-types";
import capitalize from "../../utils/capitalize";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  console.log(skills);
  const skill = skills.map((skill, index) => (
    <div className="p-1" key={index}>
      <i className="fa fa-check"></i> {capitalize(skill)}
    </div>
  ));
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <>
          <h2 className="text-primary">{capitalize(name)} Bio</h2>

          <p>{bio}</p>
        </>
      )}

      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">{skill}</div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
