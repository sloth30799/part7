import React, { useEffect, useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginBox = ({ setUser, setError, setMessage }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const loginData = window.localStorage.getItem("loginData")
    if (loginData) {
      const data = JSON.parse(loginData)
      setUser(data)
      blogService.setToken(data.token)
    }
  }, [setUser])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginData = await loginService.login({
        username,
        password,
      })

      setUser(loginData)
      blogService.setToken(loginData.token)
      setUsername("")
      setPassword("")
      window.localStorage.setItem("loginData", JSON.stringify(loginData))

      setError(false)
      setMessage("Successfully log in!")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setError(true)
      setMessage("Wrong username or password")
      setTimeout(() => {
        setError(false)
        setMessage(null)
      }, 5000)
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
