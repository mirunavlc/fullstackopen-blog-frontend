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
        setError(`Refused update for ${blog.name}`);
      }, 5000);
    }
  };
  return (
    <ul>
      <b>{blog.title}</b> by {blog.author} has <b>{blog.likes}</b> likes
      <button onClick={handleLikesChanges}>+1 like</button>
    </ul>
  );
};

export default Blog;
