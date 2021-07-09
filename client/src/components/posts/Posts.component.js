import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner.component";
import PostItem from "./PostItem.component";
import { getPosts } from "../../actions/post.action";
import PostForm from "./PostForm.component";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  console.log(posts);
  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Benvenuto nella comunity
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({ post: state.post });

export default connect(mapStateToProps, { getPosts })(Posts);
