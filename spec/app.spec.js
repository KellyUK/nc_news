process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
chai.use(require("chai-sorted"));
chai.use(require("chai-json"));
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  it("GET status: 404, returns an error for invalid path", () => {
    return request(app)
      .get("/notValidRoute")
      .then(({ body }) => {
        expect(body.msg).to.equal("Route Not Found");
      });
  });
  it("GET status 200 returns a json of all the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200);
  });
  it("GET status:404, returns error for invalid path", () => {
    return request(app)
      .get("/notApi")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).to.equal("Route Not Found");
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
    it("GET status: 404 returns  error for an invalid path", () => {
      return request(app)
        .get("/api/notValidRoute")
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
            expect(body.user).to.contain.keys("username", "name", "avatar_url");
            expect(body.user).to.eql({
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
      it("Invalid Method, status: 405 returns error for invalid method invocation", () => {
        return request(app)
          .put("/api/users/3")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
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
    it("GET status:400 returns an error when invalid query to sort by column that does not exist", () => {
      return request(app)
        .get("/api/articles?sort_by=notValidColumn")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).to.include("does not exist");
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
    it("GET status:200 filters articles by author and topic if specified", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge&topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.equal("butter_bridge");
          expect(body.articles[0].topic).to.equal("mitch");
        });
    });
    it("GET status:200 filters articles by topic alone if specified", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].topic).to.equal("cats");
        });
    });
    it("GET status:200 filters articles by author alone if specified", () => {
      return request(app)
        .get("/api/articles?author=icellusedkars")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles[0].author).to.equal("icellusedkars");
        });
    });
    it("GET status:404 returns an error if non-existent topic is passed in as a query", () => {
      return request(app)
        .get("/api/articles?topic=not-A-Topic")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal("does not exist");
        });
    });
    it("GET status:404 returns an error if non-existent author is passed in as a query", () => {
      return request(app)
        .get("/api/articles?author=not-An-authoR")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).to.equal("does not exist");
        });
    });
    it("GET status:405 returns an error if invalid method on route", () => {
      return request(app)
        .put("/api/articles")
        .expect(405)
        .then(({ body }) => {
          expect(body.msg).to.equal("Method Not Allowed");
        });
    });
    describe("/api/articles/:article_id, GET BLOCK", () => {
      it("GET status: 200 responds with a specific article when given a valid article_id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes",
              "comment_count"
            );
            expect(body.article.comment_count).to.equal("13");
          });
      });
      it("GET status: 400 Bad request, invalid syntax, route not found", () => {
        return request(app)
          .get("/api/articles/hello")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.contain("invalid input syntax for integer");
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
            expect(body.article).to.contain.keys(
              "author",
              "title",
              "article_id",
              "body",
              "topic",
              "created_at",
              "votes"
            );
            expect(body.article.votes).to.equal(101);
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
      it("PATCH status: 200 for request with no information, returning unchanged article to client", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({})
          .expect(200)
          .then(({ body }) => {
            expect(body.article).to.have.keys(
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            );
            expect(body.article.votes).to.equal(100);
          });
      });
      it("Invalid Method, status: 405 returns error for invalid method invocation", () => {
        return request(app)
          .put("/api/articles/3")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
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
        it("GET status: 200, orders by ascending if specified", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes&order=asc")
            .expect(200)
            .then(({ body }) => {
              expect(body.comments).to.be.ascendingBy("votes");
            });
        });
        it("GET status: 404, returns an error for article_id that does not exist", () => {
          return request(app)
            .get("/api/articles/1000/comments")
            .expect(404)
            .then(({ body }) => {
              expect(body.message).to.equal("does not exist");
            });
        });
      });
      describe("/api/articles/:article_id/comments, POST BLOCK", () => {
        it("POST status:201 accepts an object with username/author and body and returns the posted comment", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .expect(201)
            .send({ username: "lurker", body: "my new comment" })
            .then(({ body }) => {
              expect(body.comment.body).to.equal("my new comment");
            });
        });
        it("POST status:400 returns an error when required fields are not passed", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .expect(400)
            .send({ username: "lurker" })
            .then(({ body }) => {
              expect(body.message).to.include(
                'null value in column "body" violates not-null constraint'
              );
            });
        });
        it("POST status:404 returns error where invalid article_id is passsed in", () => {
          return request(app)
            .post("/api/articles/99999/comments")
            .expect(404)
            .send({ username: "lurker", body: "new comment" })
            .then(({ body }) => {
              expect(body.message).to.include(
                'update on table "comments" violates foreign key constraint'
              );
            });
        });
      });
    });
  });
  describe("/api/comments", () => {
    it("GET status:404 returns error for an invalid path", () => {
      return request(app)
        .get("/api/notValidPath")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Route Not Found");
        });
    });
    describe("/api/comments/:comment_id PATCH BLOCK", () => {
      it("PATCH status:200, accepts an object and increases the votes on the specified comment", () => {
        return request(app)
          .patch("/api/comments/2")
          .expect(200)
          .send({ inc_votes: 1 })
          .then(({ body }) => {
            expect(body.comment).to.contain.keys(
              "author",
              "comment_id",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
            expect(body.comment.votes).to.equal(15);
          });
      });
      it("PATCH status:404 for a comment_id that does not exist", () => {
        return request(app)
          .patch("/api/comments/999999")
          .expect(404)
          .send({ inc_votes: 1 })
          .then(({ body }) => {
            expect(body.message).to.equal("No comment found");
          });
      });
      it("PATCH status:404 for a comment_id that does not exist", () => {
        return request(app)
          .patch("/api/comments/1")
          .expect(200)
          .send({})
          .then(({ body }) => {
            expect(body.comment.votes).to.equal(16);
          });
      });
      it("PATCH status:400 for an invalid input", () => {
        return request(app)
          .patch("/api/comments/9")
          .expect(400)
          .send({ inc_votes: "helloo" })
          .then(({ body }) => {
            expect(body.message).to.contain("invalid input syntax");
          });
      });
    });
    describe("/api/comments/:comment_id DELETE BLOCK", () => {
      it("DELETE status:204 deletes a comment by comment_id", () => {
        return request(app)
          .delete("/api/comments/9")
          .expect(204);
      });
      it("DELETE status: 400 returns error for invalid  type of comment_id", () => {
        return request(app)
          .delete("/api/comments/hello")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).to.include("invalid input syntax");
          });
      });
      it("DELETE status: 404 returns error for comment_id not found", () => {
        return request(app)
          .delete("/api/comments/99999999")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).to.equal("comment not found");
          });
      });
      it("Invalid Method, status: 405 returns error for invalid method invocation", () => {
        return request(app)
          .put("/api/comments/3")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("Method Not Allowed");
          });
      });
    });
  });
});
