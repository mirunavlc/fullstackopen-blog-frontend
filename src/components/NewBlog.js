import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ setError, setInfo, blogs, setBlogs }) => {
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
      setBlogs(blogs.concat(blog));
      setInfo(`added a new blog ${blog.title} by ${blog.author}`);
    } catch (exception) {
      setError("Unsuccessful creation of blog");
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default NewBlog;
