import { useState } from "react"
import PropTypes from "prop-types"

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 1,
  marginBottom: 5,
}

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [details, setDetails] = useState(false)

  return (
    <div className="blog" style={blogStyle}>
      {!details ? (
        <div>
          {blog.title} {blog.author}
          <button className="show-btn" onClick={() => setDetails(true)}>
            show
          </button>
        </div>
      ) : (
        <div>
          <p>
            {blog.title} {blog.author}
            <button id="show-btn" onClick={() => setDetails(false)}>
              show
            </button>
          </p>
          <a href="#">{blog.url}</a>
          <p className="like-count">
            {blog.likes}
            <button className="like-btn" onClick={() => updateBlog(blog)}>
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button className="remove-btn" onClick={() => deleteBlog(blog)}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
