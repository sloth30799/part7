import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        addNotification(state, action) {
            return action.payload
        },

        removeNotification(state, action) {
            return ''
        },
    },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (text) => {
    return dispatch => {
        dispatch(addNotification(text))

        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export default notificationSlice.reducer
