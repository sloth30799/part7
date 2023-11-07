import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginBox from './components/LoginBox'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (user) {
            blogService.getAll().then((blogs) => setBlogs(blogs))
        }
    }, [user])

    const addBlog = async (title, author, url) => {
        const blog = await blogService.createBlog({
            title,
            author,
            url,
        })

        blog.user = user
        setBlogs(blogs.concat([blog]))

        return blog
    }

    const updateBlog = async (blog) => {
        const blogToUpdate = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        const updatedBlog = await blogService.likeBlog(blogToUpdate)

        const updatedBlogs = blogs.map((bg) => {
            if (bg.id === updatedBlog.id) {
                return updatedBlog
            } else {
                return bg
            }
        })

        setBlogs(updatedBlogs)
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            const status = await blogService.deleteBlog(blog.id)
            if (status === 204) {
                const updatedBlogs = blogs.filter((bg) => bg.id !== blog.id)

                setBlogs(updatedBlogs)
            }
        }
    }

    const logout = async () => {
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loginData')
    }

    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return user === null ? (
        <div>
            <h2>Log in to application</h2>
            {message && <Notification message={message} error={error} />}
            <LoginBox
                setUser={setUser}
                setMessage={setMessage}
                setError={setError}
            />
        </div>
    ) : (
        <div>
            <h2>blogs</h2>
            <p>
                {user.username} logged in
                <button onClick={logout}>logout</button>
            </p>
            {message && <Notification message={message} error={error} />}
            <BlogForm
                addBlog={addBlog}
                setMessage={setMessage}
                setError={setError}
            />
            {sortedBlogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                    user={user}
                />
            ))}
        </div>
    )
}

export default App
