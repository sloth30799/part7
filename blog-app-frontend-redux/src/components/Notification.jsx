import React from "react"
import { useSelector } from "react-redux"

const Notification = () => {
    const { message, error } = useSelector((state) => state.notification)

    if (!message) {
        return null
    }

    return <div className={error ? "error" : "success"}>{message}</div>
}

export default Notification
