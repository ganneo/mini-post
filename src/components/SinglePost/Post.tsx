import PostModel from "../../models/PostModel";
interface SinglePostProps {
  post: PostModel;
  editHandler: () => void;
  deleteHandler: (postId: string) => void;
}

const Post: React.FC<SinglePostProps> = (props) => {
  return (
    <div>
      <h2>{props.post.title}</h2>
      <p>{props.post.body}</p>
      <span className="text-muted">{props.post.author}</span>
      <div className="d-flex justify-content-around mt-3">
        <i className="fas fa-edit text-primary" onClick={props.editHandler} />
        <i
          className="fas fa-trash-alt text-danger"
          onClick={() => {
            props.deleteHandler(props.post.id);
          }}
        />
      </div>
    </div>
  );
};

export default Post;
