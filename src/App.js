import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("loggedUser"))
  );
  const [createVisible, setCreateVisible] = useState(false);

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        const sortedByLikes = blogs.sort((a, b) => {
          return a.likes < b.likes ? -1 : 1;
        });
        setBlogs(sortedByLikes);
      });
    }
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
      <LoginForm
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    );
  };

  const createForm = () => {
    const hideWhenVisible = { display: createVisible ? "none" : "" };
    const showWhenVisible = { display: createVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button
            id="create-new-blog-button"
            onClick={() => setCreateVisible(true)}
          >
            create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <NewBlog
            setInfo={setInfo}
            setError={setError}
            blogs={blogs}
            setBlogs={setBlogs}
            setCreateVisible={setCreateVisible}
          />
        </div>
      </div>
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
        <ul className="blogs">
          {blogs.map((blog, index) => (
            <Blog
              key={index}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              setError={setError}
              setInfo={setInfo}
            />
          ))}
        </ul>
      </>
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
