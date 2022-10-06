import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedUser"))
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const loginForm = () => {
    return (
      <>
        <h2>login to app</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const blogForm = () => {
    return (
      <>
        <h2>blogs</h2>
        <p>
          {user.name} is logged
          <button onClick={handleLogout}>log out</button>
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  const createForm = () => {
    return (
      <NewBlog
        setInfo={setInfo}
        setError={setError}
        blogs={blogs}
        setBlogs={setBlogs}
      />
    );
  };

  return (
    <div>
      <Notification message={info} />
      <Error message={error} />
      {user === null && loginForm()}
      {user !== null && createForm()}
      {user !== null && blogForm()}
    </div>
  );
};

export default App;
