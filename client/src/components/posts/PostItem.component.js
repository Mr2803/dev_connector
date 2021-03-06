import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post.action";

const PostItem = ({
  addLike,
  removeLike,
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  deletePost,
  showActions,
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="Profile_Image" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Postato il <Moment format="DD/MM/YYYY HH:mm">{date}</Moment>
        </p>
        {showActions && (
          <>
            {" "}
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-light"
            >
              {!auth.loading ? (
                <i
                  className={
                    likes.some((e) => e.user === auth.user._id)
                      ? "fas fa-thumbs-up text-primary"
                      : "fas fa-thumbs-up"
                  }
                >
                  {" "}
                  {likes.length > 0 && <span>{likes.length}</span>}
                </i>
              ) : null}
            </button>
            <button
              disabled={
                !auth.loading
                  ? likes.some((e) => e.user === auth.user._id)
                    ? false
                    : true
                  : true
              }
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Commenti
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                type="button"
                onClick={() => deletePost(_id)}
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}{" "}
          </>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
