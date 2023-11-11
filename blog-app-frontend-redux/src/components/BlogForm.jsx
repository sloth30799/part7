import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()

    const createBlog = async (event) => {
        event.preventDefault()

        try {
            const data = await addBlog(title, author, url)
            setTitle("")
            setAuthor("")
            setUrl("")
            setShow(false)

            dispatch(
                setNotification({
                    message: `A new blog ${data.title} by ${data.author} added`,
                    error: false,
                })
            )
        } catch (exception) {
            dispatch(
                setNotification({
                    message: "Can't create the blog!",
                    error: false,
                })
            )
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
