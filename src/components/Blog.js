import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, setError, setInfo }) => {
  const updateBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    id: blog.id,
    user: blog.user,
    likes: blog.likes + 1,
  };

  const handleLikesChanges = () => {
    try {
      blogService.put(updateBlog);
      const updatedBlogs = blogs.map((b) => {
        if (b.id !== updateBlog.id) return b;
        else return updateBlog;
      });
      const sortedByLikes = updatedBlogs.sort((a, b) => {
        return a.likes < b.likes ? -1 : 1;
      });
      setBlogs(sortedByLikes);
      setInfo(`Successful update for ${blog.title}`);
      setTimeout(() => {
        setInfo(null);
      }, 5000);
    } catch (exception) {
      setTimeout(() => {
        setError(`Refused update for ${blog.title}`);
      }, 5000);
    }
  };

  const handleRemove = () => {
    if (!window.confirm(`Remove blog ${blog.title}?`)) return;
    try {
      const resp = blogService.remove(blog);
      console.log(resp);
      const updatedBlogs = blogs.filter((b) => {
        if (b.id !== blog.id) return true;
        else return false;
      });
      const sortedByLikes = updatedBlogs.sort((a, b) => {
        return a.likes < b.likes ? -1 : 1;
      });
      setBlogs(sortedByLikes);
      setInfo(`Successful remove of  ${blog.title}`);
      setTimeout(() => {
        setInfo(null);
      }, 5000);
    } catch (exception) {
      setTimeout(() => {
        setError(`Refused remove of ${blog.title}`);
      }, 5000);
    }
  };
  return (
    <li className="blog">
      <b>{blog.title}</b> by {blog.author} has <b>{blog.likes}</b> likes
      <button id="like-button" onClick={handleLikesChanges}>
        +1 like
      </button>
      <button onClick={handleRemove}>remove</button>
    </li>
  );
};

export default Blog;
