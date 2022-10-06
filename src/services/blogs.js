import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  if (!token) {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (user) setToken(user.token);
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const post = async (blog) => {
  if (!token) {
    const user = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (user) setToken(user.token);
  }
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

export default { getAll, setToken, post };
