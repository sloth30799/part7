import React, { useState } from "react"

const BlogForm = ({ addBlog, setError, setMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [show, setShow] = useState(false)

  const createBlog = async (event) => {
    event.preventDefault()

    try {
      const data = await addBlog(title, author, url)
      setTitle("")
      setAuthor("")
      setUrl("")
      setShow(false)

      setMessage(`A new blog ${data.title} by ${data.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage("Can't create the blog!")
      setTimeout(() => {
        setError(false)
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      {!show ? (
        <button id="new-blog-btn" onClick={() => setShow(true)}>
          New Blog
        </button>
      ) : (
        <form onSubmit={createBlog} className="my-3">
          <h2>Create New</h2>
          <div>
            title
            <input
              id="title"
              type="text"
              value={title}
              placeholder="Title"
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
              id="author"
              type="text"
              value={author}
              placeholder="Author"
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
              id="url"
              type="text"
              value={url}
              placeholder="URL"
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id="create-blog-btn" type="submit">
            Create
          </button>
          <button onClick={() => setShow(false)}>cancel</button>
        </form>
      )}
    </div>
  )
}

export default BlogForm
