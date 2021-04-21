import React, { useEffect, useState } from "react";
import PostModel from "../../models/PostModel";
import classes from "./NewPost.module.css";
import { EMPTY_POST_MODEL } from "../../container/layout/Layout";

interface newPostProps {
  post: PostModel;
  onClickHandler: (savePost: PostModel) => void;
}

const NewPost: React.FC<newPostProps> = (props) => {
  const [postState, setPostState] = useState<PostModel>(EMPTY_POST_MODEL);
  useEffect(() => setPostState(props.post), [props.post]);

  const valueOnChangeHandler = (value: string, target: keyof PostModel) => {
    setPostState((prevPostState) => {
      const updatedPostState = { ...prevPostState };
      updatedPostState[target] = value;
      return updatedPostState;
    });
  };

  return (
    <form className={classes.NewPost}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={postState.title}
          onChange={(e) => valueOnChangeHandler(e.target.value, "title")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body</label>
        <input
          id="body"
          type="text"
          value={postState.body}
          className="form-control"
          onChange={(e) => valueOnChangeHandler(e.target.value, "body")}
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={postState.author}
          className="form-control"
          onChange={(e) => valueOnChangeHandler(e.target.value, "author")}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={() => {
          props.onClickHandler(postState);
        }}
        type="reset"
      >
        Submit
      </button>
    </form>
  );
};

export default NewPost;
