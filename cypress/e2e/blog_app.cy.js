describe("Blog app-> login", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("login to app").click();
  });

  it("Login", function () {
    cy.contains("login").click();
    cy.get("input:first").type("danny");
    cy.get("input:last").type("ynnad1999");
    cy.get("#login-button").click();
    cy.contains("Dan Abramov is logged");
  });

  it("fails with wrong credentials", function () {
    cy.contains("login").click();
    cy.get("input:first").type("danny");
    cy.get("input:last").type("ynnad19998");
    cy.get("#login-button").click();
    cy.get(".error").should("contain", "Wrong credentials");
  });
});

describe("Blog app-> create blog", function () {
  describe("When logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
      cy.get("input:first").type("danny");
      cy.get("input:last").type("ynnad1999");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get("#create-new-blog-button").click();
      cy.get("input:first").type("Ego is the enemy");
      cy.get("#authorInput").type("Ryan Holiday");
      cy.get("input:last").type(
        "https://www.amazon.com/Ego-Enemy-Ryan-Holiday/dp/1591847818"
      );
      cy.get("#submit-new-blog-button").click();

      cy.get(".notification").should(
        "contain",
        "added a new blog Ego is the enemy by Ryan Holiday"
      );

      cy.contains("Ego is the enemy by Ryan Holiday has 0 likes");
    });

    it("A like can be given", function () {
      cy.get("#like-button").click();
      cy.contains("Ego is the enemy by Ryan Holiday has 1 likes");
    });

    it("sorted list by likes", function () {
      cy.get("#create-new-blog-button").click();
      cy.get("input:first").type("Never split the difference");
      cy.get("#authorInput").type("Chris Voss");
      cy.get("#submit-new-blog-button").click();

      cy.wait(1000);
      cy.get(".blog").eq(0).should("contain", "Never split the difference");
      cy.get(".blog").eq(1).should("contain", "Ego is the enemy");
    });
  });
});
