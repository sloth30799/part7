import axios from "axios"
const baseUrl = "/api/blogs"

let token

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.get(baseUrl, config)
    return response.data
}

const createBlog = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const likeBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const res = await axios.delete(`${baseUrl}/${id}`, config)
    return res.status
}

export default { setToken, getAll, createBlog, likeBlog, deleteBlog }
