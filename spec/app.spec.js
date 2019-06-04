process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET status: 200 responds with an array of topic objects, with slug and description properties", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("GET status: 404 route not found", () => {
        return request(app)
          .get("/api/nottopics")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
      });
    });
    describe("/api/users", () => {
      describe("/api/users/:username", () => {
        it("GET status: 200 reponds with a specific user when given a valid username", () => {
          return request(app)
            .get("/api/users/lurker")
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0]).to.contain.keys(
                "username",
                "name",
                "avatar_url"
              );
              expect(body.user[0]).to.eql({
                username: "lurker",
                name: "do_nothing",
                avatar_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
              });
            });
        });
      });
    });
  });
});
