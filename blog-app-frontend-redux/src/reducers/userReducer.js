import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },

        removeUser(state, action) {
            return ''
        },
    },
})

export const { setUser, removeUser } = userSlice.actions

export const userLogin = (credentials) => {
    return async (dispatch) => {
        const user = await loginService.login(credentials)

        dispatch(setUser(user))
    }
}

export default userSlice.reducer
