import PostModel from "../../../models/PostModel";
import classes from "./PostPreview.module.css";

interface PostPreviewProps {
  post: PostModel;
  postClickHandler: (post: PostModel) => void;
}

const PostPreview: React.FC<PostPreviewProps> = (props) => {
  return (
    <div
      className={classes.PostPreview + " card mt-3 m-1 p-3"}
      onClick={() => {
        props.postClickHandler(props.post);
      }}
    >
      <h3 className="card-title">{props.post.title}</h3>
      <h5 className="card-text">{props.post.author}</h5>
    </div>
  );
};

export default PostPreview;
