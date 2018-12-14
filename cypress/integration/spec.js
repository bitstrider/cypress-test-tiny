// @ts-check
/* eslint-env mocha */

describe("todos API", () => {

  const initialTags = ["knowledge", "practice", "fun"];

  const initialTodos = [
    {
      id: 1,
      tag: "knowledge",
      task: "read something"
    },
    {
      id: 2,
      tag: "practice",
      task: "write something"
    }
  ];

  let TAGS;

  before(() => {

    // set up request stubbing
    cy.server()
    cy.route("GET", "/tags", initialTags)
    cy.route("GET", "/todos/by-tags/*", initialTodos)

    // request tags async from remote server
    cy.request("/tags")
      .then(tags => TAGS = tags)

  });

  // test for each tag retrieved
  TAGS.forEach(tag => {

    it(`returns todos for tag '${tag}'`, () => {
      cy.request(`/todos/by-tag/${tag}`)
        .its("body")
        .should("be.an", "array");
    });
    
  });
});
