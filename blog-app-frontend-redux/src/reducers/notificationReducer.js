import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    message: "",
    error: false,
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        addNotification(state, action) {
            return action.payload
        },

        removeNotification() {
            return initialState
        },
    },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification) => {
    return (dispatch) => {
        dispatch(addNotification(notification))

        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
}

export default notificationSlice.reducer
