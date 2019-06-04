const { createAuthorRef, formatArticle, formatComment } = require("./utils");
const { expect } = require("chai");

describe("createAuthorRef()", () => {
  it("returns an empty object if passed an empty object", () => {
    expect(createAuthorRef()).to.eql({});
  });
  it("returns the author key instead of the created_by", () => {
    const input = {
      created_by: "cooljmessy"
    };
    const outPut = {
      author: "cooljmessy"
    };
    expect(createAuthorRef(input)).to.eql(outPut);
  });
  it("returns the author key instead of the created_by for a full comment object", () => {
    const input = {
      body: "Voluptas",
      belongs_to: "The People",
      created_by: "tickle122",
      votes: 8,
      created_at: 1490666572472
    };
    const output = {
      body: "Voluptas",
      belongs_to: "The People",
      author: "tickle122",
      votes: 8,
      created_at: 1490666572472
    };
    expect(createAuthorRef(input)).to.eql(output);
  });
});

describe("formatArticle()", () => {
  it("returns an empty array if passed no articles", () => {
    expect(formatArticle()).to.eql([]);
  });
  it("returns the date in the correct format for seeding", () => {
    const input = [{ created_at: 1471522072389 }];
    const formattedArticle = formatArticle(input)[0];
    expect(formattedArticle.created_at).to.eql("2016-08-18T12:07:52.389Z");
  });
  it("returns a single article object with the date in the correct format for seeding", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: 1471522072389
      }
    ];
    const output = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: "2016-08-18T12:07:52.389Z"
      }
    ];
    expect(formatArticle(input)).to.eql(output);
  });
  it("returns the correct date for several objects", () => {
    const input = [
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: 1471522072389
      },
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: 1471522072389
      }
    ];
    expect(formatArticle(input)).to.eql([
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: "2016-08-18T12:07:52.389Z"
      },
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: "2016-08-18T12:07:52.389Z"
      }
    ]);
  });
});
describe("formatComment()", () => {
  it("returns an empty array if passed no comments", () => {
    expect(formatComment()).to.eql([]);
  });
  it("returns the date in correct format for seeding", () => {
    const input = [{ created_at: 1471522072389 }];
    const formattedComment = formatComment(input)[0];
    expect(formattedComment.created_at).to.eql("2016-08-18T12:07:52.389Z");
  });
  it("returns the date in the correct format for a single article object", () => {
    const input = [
      {
        body: "Voluptas",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: 8,
        created_at: 1490666572472
      }
    ];
    const output = [
      {
        belongs_to: "The People",
        body: "Voluptas",
        created_at: "2017-03-28T02:02:52.472Z",
        created_by: "tickle122",
        votes: 8
      }
    ];
    expect(formatComment(input)).to.eql(output);
  });
  it("returns the correct date for several objects", () => {
    const input = [
      {
        body: "Voluptas",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: 8,
        created_at: 1490666572472
      },
      {
        body: "Voluptas",
        belongs_to: "The People",
        created_by: "tickle122",
        votes: 8,
        created_at: 1490666572472
      }
    ];
    expect(formatArticle(input)).to.eql([
      {
        belongs_to: "The People",
        body: "Voluptas",
        created_at: "2017-03-28T02:02:52.472Z",
        created_by: "tickle122",
        votes: 8
      },
      {
        belongs_to: "The People",
        body: "Voluptas",
        created_at: "2017-03-28T02:02:52.472Z",
        created_by: "tickle122",
        votes: 8
      }
    ]);
  });
});
