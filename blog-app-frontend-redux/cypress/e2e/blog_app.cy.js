describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`)
    const user = {
      name: "Bae Joohyun",
      username: "Irene",
      password: "irene",
    }

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user)

    const user2 = {
      name: "Kim Taeyeon",
      username: "Taeyeon",
      password: "taeyeon",
    }

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2)
    cy.visit("")
  })

  it("Login form is shown", function () {
    cy.contains("Log in to application")
    cy.get("#username")
    cy.get("#password")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Irene")
      cy.get("#password").type("irene")
      cy.get("#login-btn").click()

      cy.contains("Irene logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("Seulgi")
      cy.get("#password").type("seulgi")
      cy.get("#login-btn").click()

      cy.get(".error").should("contain", "Wrong username or password")
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)")
      cy.get(".error").should("have.css", "border-style", "solid")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Irene", password: "irene" })

      cy.createBlog({
        title: "11:11",
        author: "Taeyeon",
        url: "www.taeyeon.com/11:11",
      })
    })

    it("A blog can be created", function () {
      cy.get("#new-blog-btn").click()
      cy.get("#title").type("What a chill kill")
      cy.get("#author").type("Red velvet")
      cy.get("#url").type("www.redvelvet.com/what-a-chill-kill")
      cy.get("#create-blog-btn").click()

      cy.contains("What a chill kill")
    })

    it("Users can like a blog", function () {
      cy.contains("11:11").find("button").as("theButton")
      cy.get("@theButton").click()
      cy.get(".like-btn").click()
      cy.get(".like-count").should("contain", "1")
    })

    it("User who created a blog can delete it", function () {
      cy.contains("11:11").find("button").as("theButton")
      cy.get("@theButton").click()
      cy.get(".remove-btn").click()
      cy.contains("11:11").should("not.exist")
    })

    it("only the creator can see the delete button of a blog", function () {
      cy.login({ username: "Taeyeon", password: "taeyeon" })

      cy.contains("11:11").find("button").as("theButton")
      cy.get("@theButton").click()
      cy.get(".remove-btn").should("not.exist")
    })

    it("the blogs are ordered according to likes with the blog with the most likes being first", function () {
      cy.createBlog({
        title: "Spicy",
        author: "Asepa",
        url: "www.asepa.com/spicy",
      })

      cy.createBlog({
        title: "Gods",
        author: "Newjeans",
        url: "www.newjeans.com/gods",
      })

      cy.get(".show-btn").each(($button) => {
        cy.wrap($button).click({ multiple: true })
      })

      cy.get(".like-btn").eq(2).click()
      cy.get(".like-count").eq(0).should("contain", "1")
      cy.get(".like-btn").eq(0).click()
      cy.get(".like-count").eq(0).should("contain", "2")
      cy.get(".like-btn").eq(0).click()
      cy.get(".like-count").eq(0).should("contain", "3")

      cy.get(".like-btn").eq(2).click()
      cy.get(".like-count").eq(1).should("contain", "1")
      cy.get(".like-btn").eq(1).click()
      cy.get(".like-count").eq(1).should("contain", "2")

      cy.get(".blog").eq(0).should("contain", "Gods")
      cy.get(".blog").eq(1).should("contain", "Spicy")
      cy.get(".blog").eq(2).should("contain", "11:11")
    })
  })
})

Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loginData", JSON.stringify(body))
    cy.visit("")
  })
})

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env("BACKEND")}/blogs`,
    method: "POST",
    body: { title, author, url },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loginData")).token
      }`,
    },
  })

  cy.visit("")
})
