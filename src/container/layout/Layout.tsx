import AxiosInstance from "../../utils/AxiosInstance";
import React from "react";
import PostPreviews from "../../components/PostPreviews/PostPreviews";
import PostModel from "../../models/PostModel";
import Loader from "../../UI/Loader/Loader";
import Modal from "../../UI/Modal/Modal";
import Post from "../../components/SinglePost/Post";
import NewPost from "../../components/NewPost/NewPost";

const REFRESH_TIME = 3000000;
let currentTime = new Date();
export const EMPTY_POST_MODEL = new PostModel("", "", "", "");
const NULLABLE_POST_MODEL: PostModel | null = null;

interface LayoutState {
  posts: Array<PostModel>;
  showModal: boolean;
  savedPost: PostModel | null;
  displayPost: PostModel;
  deletePostId: string;
}

class Layout extends React.Component<any, LayoutState> {
  state = {
    posts: [],
    showModal: false,
    savedPost: NULLABLE_POST_MODEL,
    displayPost: EMPTY_POST_MODEL,
    deletePostId: "",
  };

  componentDidMount() {
    if (
      new Date().getTime() - currentTime.getTime() > REFRESH_TIME ||
      this.state.posts.length === 0
    ) {
      this.retrievePosts();
    }
  }

  private retrievePosts() {
    AxiosInstance.get("posts.json").then((posts) => {
      const data = posts.data;
      const postModels = Object.keys(data).map((postId) => {
        return new PostModel(
          data[postId].title,
          data[postId].body,
          data[postId].author,
          postId
        );
      });
      this.setState({ posts: postModels });
      currentTime = new Date();
    });
  }

  async componentDidUpdate() {
    if (this.state.savedPost !== NULLABLE_POST_MODEL) {
      if (this.state.savedPost!.id) {
        const url = "posts/" + this.state.savedPost!.id + ".json";
        await AxiosInstance.put(url, this.state.savedPost);
      } else {
        await AxiosInstance.post("posts.json", this.state.savedPost);
      }

      this.retrievePosts();

      this.setState({
        savedPost: NULLABLE_POST_MODEL,
      });
    }

    if (this.state.deletePostId) {
      const url = "posts/" + this.state.deletePostId + ".json";
      await AxiosInstance.delete(url);

      this.retrievePosts();

      this.setState({
        showModal: false,
        deletePostId: "",
        displayPost: EMPTY_POST_MODEL,
      });
    }
  }

  modalClickHandler = () => {
    this.setState({ showModal: false, displayPost: EMPTY_POST_MODEL });
  };

  postClickHandler = (post: PostModel) => {
    this.setState({ showModal: true, displayPost: post });
  };

  savePostClickHandler = (savedPost: PostModel) => {
    this.setState({
      displayPost: EMPTY_POST_MODEL,
      savedPost: savedPost,
    });
  };

  editHandler = () => {
    this.setState({
      showModal: false,
    });
  };

  deleteHandler = (postId: string) => {
    this.setState({ deletePostId: postId });
  };

  render() {
    const postPreviews =
      this.state.posts.length === 0 ? (
        <Loader />
      ) : (
        <PostPreviews
          posts={this.state.posts}
          postClickHandler={this.postClickHandler}
        />
      );

    return (
      <React.Fragment>
        {postPreviews}
        <Modal
          active={this.state.showModal}
          modalClickHandler={this.modalClickHandler}
        >
          <Post
            post={this.state.displayPost}
            editHandler={this.editHandler}
            deleteHandler={this.deleteHandler}
          />
        </Modal>
        <NewPost
          post={this.state.displayPost}
          onClickHandler={this.savePostClickHandler}
        />
      </React.Fragment>
    );
  }
}

export default Layout;
