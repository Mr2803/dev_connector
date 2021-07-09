import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner.component";
import { getGithubRepos } from "../../actions/profile.action";
import capitalize from "../../utils/capitalize";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  if (repos === null) return <Spinner />;

  return (
    <div className="profile-github">
      {repos[0] && (
        <>
          <h2 className="text-primary my-1">Github repos</h2>
          <img
            src={repos[0].owner.avatar_url}
            alt="githubAvatar"
            className="round-img my-1 profile-github-image"
          />
        </>
      )}
      {repos.map((repo) => {
        return (
          <div key={repo.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="nooponer noreferrer"
                >
                  {capitalize(repo.name)}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars:{repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers:{repo.watchers_count}
                </li>
                <li className="badge badge-light">Forks:{repo.forks_count}</li>
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
