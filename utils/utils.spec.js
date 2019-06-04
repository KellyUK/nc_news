const {
  formatArticle,
  formatComment,
  createArticleRefObject,
  formatAllComments
} = require("./utils");
const { expect } = require("chai");

describe("formatArticle()", () => {
  it("returns an empty array if passed no articles", () => {
    expect(formatArticle()).to.eql([]);
  });
  it("returns the date in the correct format for seeding", () => {
    const input = [{ created_at: 1471522072389 }];
    const formattedArticle = formatArticle(input)[0];
    expect(formattedArticle.created_at).to.eql(new Date(1471522072389));
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
        created_at: new Date(1471522072389)
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
        created_at: newDate(1471522072389)
      },
      {
        title: "Running a Node App",
        topic: "coding",
        author: "jessjelly",
        body: "This is part.",
        created_at: new Data(1471522072389)
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
    expect(formattedComment.created_at).to.eql(new Date(1471522072389));
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
        created_at: new Date(1490666572472),
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
        created_at: new Date(1490666572472),
        created_by: "tickle122",
        votes: 8
      },
      {
        belongs_to: "The People",
        body: "Voluptas",
        created_at: new Date(1490666572472),
        created_by: "tickle122",
        votes: 8
      }
    ]);
  });
});
describe("createArticleRefObject()", () => {
  xit("returns an empty object if no article passed in", () => {
    expect(createArticleRefObject()).to.eql({});
  });
  it("returns a single article by title to article_id", () => {
    const input = [
      {
        title: "Running a Node App",
        article_id: 1
      }
    ];
    const output = { "Running a Node App": 1 };
    expect(createArticleRefObject(input)).to.eql(output);
  });
  it("returns several objects in correct format", () => {
    const input = [
      {
        title: "Running a Node App",
        article_id: 1
      },
      {
        title: "Running another Node App",
        article_id: 2
      }
    ];
    const output = { "Running a Node App": 1, "Running another Node App": 2 };
    expect(createArticleRefObject(input)).to.eql(output);
  });
});

describe("formatAllComments()", () => {
  it("returns the comment formatted ready to seed", () => {
    const comments = [
      {
        body: "Sed",
        belongs_to: "Running a Node App",
        created_by: "grumpy19",
        votes: 1,
        created_at: 1495968029866
      }
    ];
    const articleRefObj = {
      "Running a Node App": 1
    };
    expect(formatAllComments(comments, articleRefObj)).to.eql([
      {
        body: "Sed",
        article_id: 1,
        author: "grumpy19",
        votes: 1,
        created_at: new Date(1495968029866)
      }
    ]);
  });
});
