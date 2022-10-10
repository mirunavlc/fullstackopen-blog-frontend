import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ setCreateVisible, setError, setInfo, blogs, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.post({
        title: title,
        author: author,
        url: url,
      });

      setTitle("");
      setAuthor("");
      setUrl("");
      const sortedByLikes = blogs.concat(blog).sort((a, b) => {
        return a.likes < b.likes ? -1 : 1;
      });
      setBlogs(sortedByLikes);
      setInfo(`added a new blog ${blog.title} by ${blog.author}`);
      setTimeout(() => {
        setInfo(null);
      }, 5000);
      setCreateVisible(false);
    } catch (exception) {
      setError("Unsuccessful creation of blog");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="titleInput">title</label>
          <input
            id="titleInput"
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="authorInput">author</label>
          <input
            id="authorInput"
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="urlInput">url</label>
          <input
            id="urlInput"
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlog;
