process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
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
        it("GET status: 404 no user found", () => {
          return request(app)
            .get("/api/users/hello")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).to.equal("No user found");
            });
        });
      });
    });
    describe("/api/articles", () => {
      it("GET status:200 responds with an array of article objects with relevant keys", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
          });
      });
      it("GET status:200 sorts articles by date in descending order by default", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("created_at");
          });
      });
      it("GET status:200 sorts articles by any specified collumn", () => {
        return request(app)
          .get("/api/articles?sort_by=comment_count")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("votes");
          });
      });
      it("GET status:200 orders articles in ascending order if specified", () => {
        return request(app)
          .get("/api/articles?order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy("created_at");
          });
      });
      // it("GET status:200 filters articles by author if specified", () => {
      //   return request(app)
      //     .get("/api/articles?author=rogersop")
      //     .expect(200)
      //     .then(({ body }) => {
      //       //console.log(body);
      //       expect(body.articles).to.equal("something");
      //     });
      // });
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
        it("GET status: 404 invalid, no article found", () => {
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
        it("PATCH status: 400 bad request, wrong input type", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: "cats" })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.contain("invalid input");
            });
        });
        it("PATCH status: 400 invalid input to increment vote", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: "cat", name: "Mitch" })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.contain("invalid input");
            });
        });
        it("PATCH status: 400 invalid input to increment vote", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: "" })
            .expect(400)
            .then(({ body }) => {
              expect(body.message).to.contain("invalid input");
            });
        });
        describe("/api/articles/:article_id/comments, GET BLOCK", () => {
          it("GET status: 200, returns an array of comments for the given article_id, accepting sort_by and order queries", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0]).to.contain.keys(
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                );
              });
          });
          it("GET status: 200, sorts by created_at, descending as a default", () => {
            return request(app)
              .get("/api/articles/1/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("created_at");
              });
          });
          it("GET status: 200, sorts by another column if specified", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.descendingBy("votes");
              });
          });
          it("GET status: 200, orders by ascending if specified", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.ascendingBy("votes");
              });
          });
        });
        describe.only("/api/articles/:article_id/comments, POST BLOCK", () => {
          it("POST status:201 accepts an object with username and body and returns the posted comment", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .expect(201)
              .send({ username: "lurker", body: "my new comment" })
              .then(({ body }) => {
                console.log(body, "body.comment");
                expect(body.newComment.body).to.equal("my new comment");
              });
          });
        });
      });
    });
    describe("/api/comments", () => {
      describe("/api/comments/:comment_id PATCH BLOCK", () => {
        it("PATCH status:200, accepts an object and increases the votes on the specified comment", () => {
          return request(app)
            .post("/api/comments/2")
            .expect(200)
            .send({ inc_votes: 1 })
            .then(({ body }) => {
              expect(body.comments[0]).to.contain.keys(
                "author",
                "article_id",
                "votes",
                "created_at",
                "body"
              );
            });
        });
      });
    });
  });
});
