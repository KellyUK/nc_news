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
        it("GET status: 200 responds with a specific user when given a valid username", () => {
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
    describe("/api/articles", () => {
      describe("/api/articles/:article_id, GET BLOCK", () => {
        it("GET status: 200 responds with a specific article when given a valid article_id", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
              expect(body.article[0].comment_count).to.equal("13");
            });
        });
        it("GET status: 400 Bad request, invalid syntax, route not found", () => {
          return request(app)
            .get("/api/articles/hello")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.contain(
                "invalid input syntax for integer"
              );
            });
        });
        it("GET status: 404 invalid", () => {
          return request(app)
            .get("/api/articles/0")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).to.equal("No article found");
            });
        });
      });
      describe("/api/articles/:article_id, PATCH BLOCK", () => {
        it("PATCH status: 200 accepts an object {inc_votes: newVote} and increments votes accordingly", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 1 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article[0]).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes"
              );
              expect(body.article[0].votes).to.equal(101);
            });
        });
        it("PATCH status 400, bad request, invalid syntax, route not found", () => {
          return request(app)
            .patch("/api/articles/hello")
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.contain(
                "invalid input syntax for integer"
              );
            });
        });
        it("PATCH status: 404 invalid", () => {
          return request(app)
            .patch("/api/articles/0")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).to.equal("invalid vote increment");
            });
        });
        xit("PATCH status:? invalid inc_votes", () => {});
      });
    });
  });
});
