import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render } from "@testing-library/react"
import Blog from "./Blog"
import userEvent from "@testing-library/user-event"

describe("<Blog />", () => {
  const blog = {
    title: "Mastering Mongoose Schemas",
    author: "Bob Smith",
    url: "/mastering-mongoose-schemas",
    likes: 21,
    user: {
      username: "Irene",
      name: "Bae Joo Hyun",
    },
  }

  const updateHandler = jest.fn()
  const deleteHandler = jest.fn()

  const user = {
    username: "Irene",
    name: "Bae Joo Hyun",
  }

  test("renders blog", () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={updateHandler}
        deleteBlog={deleteHandler}
        user={user}
      />
    )

    const div = container.querySelector(".blog")
    expect(div).toHaveTextContent("Mastering Mongoose Schemas")
    expect(div).toHaveTextContent("Bob Smith")
    expect(div).not.toHaveTextContent("/mastering-mongoose-schemas")
    expect(div).not.toHaveTextContent("21")
  })

  test("URL and Number of Likes are shown when the button is clicked", () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={updateHandler}
        deleteBlog={deleteHandler}
        user={user}
      />
    )

    const div = container.querySelector(".blog")
    const showButton = div.querySelector(".show-btn")
    fireEvent.click(showButton)

    expect(div).toHaveTextContent("/mastering-mongoose-schemas")
    expect(div).toHaveTextContent("21")
  })

  test("like button is clicked twice", async () => {
    const { container } = render(
      <Blog
        blog={blog}
        updateBlog={updateHandler}
        deleteBlog={deleteHandler}
        user={user}
      />
    )
    const div = container.querySelector(".blog")
    const showButton = div.querySelector(".show-btn")
    fireEvent.click(showButton)

    const userEventCaller = userEvent.setup()
    const likeButton = div.querySelector(".like-btn")
    await userEventCaller.click(likeButton)
    await userEventCaller.click(likeButton)

    expect(updateHandler.mock.calls).toHaveLength(2)
  })
})
