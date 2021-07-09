import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment, deleteComment } from "../../actions/post.action";

const CommentForm = ({ addComment, deleteComment, postId }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Inserisci un commento</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Lascia un Commento"
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { addComment, deleteComment })(CommentForm);
