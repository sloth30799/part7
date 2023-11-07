import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<BlogForm /> calls the event handler with right details", async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()
  const mockHandler = jest.fn()

  render(
    <BlogForm
      addBlog={addBlog}
      setError={mockHandler}
      setMessage={mockHandler}
    />
  )

  const showButton = screen.getByText("New Blog")
  fireEvent.click(showButton)

  const titleInput = screen.getByPlaceholderText("Title")
  const authorInput = screen.getByPlaceholderText("Author")
  const urlInput = screen.getByPlaceholderText("URL")
  const createBtn = screen.getByText("Create")

  await user.type(titleInput, "One Piece")
  await user.type(authorInput, "Oda")
  await user.type(urlInput, "www.onepiece.com")
  await user.click(createBtn)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog).toHaveBeenCalledWith("One Piece", "Oda", "www.onepiece.com")
})
