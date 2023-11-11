import { useState } from "react"
import { useDispatch } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"
import { userLogin } from "../reducers/userReducer"

const LoginBox = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            dispatch(
                userLogin({
                    username,
                    password,
                })
            )
            setUsername("")
            setPassword("")

            dispatch(
                setNotification({
                    message: "Successfully log in!",
                    error: false,
                })
            )
        } catch (exception) {
            dispatch(
                setNotification({
                    message: "Wrong username or password",
                    error: true,
                })
            )
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    id="username"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    id="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button id="login-btn" type="submit">
                login
            </button>
        </form>
    )
}

export default LoginBox
