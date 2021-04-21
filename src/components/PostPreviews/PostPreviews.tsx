import PostModel from "../../models/PostModel";
import PostPreview from "./PostPreview/PostPreview";
import classes from "./PostPreviews.module.css";

interface PostPreviewsProps {
  posts: Array<PostModel>;
  postClickHandler: (post: PostModel) => void;
}

const PostPreviews: React.FC<PostPreviewsProps> = (props) => {
  const postEles = props.posts.map((post, idx) => (
    <div key={idx}>
      <PostPreview post={post} postClickHandler={props.postClickHandler} />
    </div>
  ));
  return <div className={classes.PostPreviews + " card-group"}>{postEles}</div>;
};

export default PostPreviews;
