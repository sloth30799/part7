import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },

        removeUser() {
            return null
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export const userLogin = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)

        dispatch(setUser(user))
        window.localStorage.setItem("loginData", JSON.stringify(user))
    }
}

export const userLogout = () => {
    return (dispatch) => {
        dispatch(removeUser())
        window.localStorage.removeItem("loginData")
    }
}

export default userSlice.reducer
