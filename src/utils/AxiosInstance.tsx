import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://mini-react-post-default-rtdb.firebaseio.com/",
});

export default AxiosInstance;
