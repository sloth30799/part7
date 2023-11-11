import { useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import LoginBox from "./components/LoginBox"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import {
    createOneBlog,
    initializeBlogs,
    likeBlog,
    removeBlog,
} from "./reducers/blogReducer"
import { setUser, userLogout } from "./reducers/userReducer"

const App = () => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    useEffect(() => {
        const loginData = window.localStorage.getItem("loginData")
        if (loginData) {
            const data = JSON.parse(loginData)
            dispatch(setUser(data))
        }
    }, [])

    useEffect(() => {
        if (user) {
            blogService.setToken(user.token)
            dispatch(initializeBlogs())
        }
    }, [user])

    const addBlog = async (title, author, url) => {
        const blog = {
            title,
            author,
            url,
        }

        dispatch(createOneBlog(blog))

        return blog
    }

    const updateBlog = async (blog) => {
        const blogToUpdate = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        }

        dispatch(likeBlog(blogToUpdate))
    }

    const deleteBlog = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            dispatch(removeBlog(blog.id))
        }
    }

    const logout = async () => {
        blogService.setToken(null)
        dispatch(userLogout())
    }

    return user === null ? (
        <div>
            <h2>Log in to application</h2>
            <Notification />
            <LoginBox />
        </div>
    ) : (
        <div>
            <h2>blogs</h2>
            <p>
                {user.username} logged in
                <button onClick={logout}>logout</button>
            </p>
            <Notification />
            <BlogForm addBlog={addBlog} />
            {sortedBlogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                />
            ))}
        </div>
    )
}

export default App
