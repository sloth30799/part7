import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },

        createBlog(state, action) {
            const newBlog = action.payload

            state.push(newBlog)
        },

        updateBlog(state, action) {
            const id = action.payload.id

            return state.map((blog) => (id === blog.id ? action.payload : blog))
        },

        deleteBlog(state, action) {
            const id = action.payload

            return state.filter((blog) => blog.id !== id)
        },
    },
})

export const { setBlogs, createBlog, updateBlog, deleteBlog } =
    blogSlice.actions

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()

        dispatch(setBlogs(blogs))
    }
}

export const createOneBlog = (newBlog) => {
    return async (dispatch) => {
        const blog = await blogService.createBlog(newBlog)

        dispatch(createBlog(blog))
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.likeBlog(blog)

        dispatch(updateBlog(updatedBlog))
    }
}

export const removeBlog = (id) => {
    return async (dispatch) => {
        await blogService.deleteBlog(id)

        dispatch(deleteBlog(id))
    }
}

export default blogSlice.reducer
