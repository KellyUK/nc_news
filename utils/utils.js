exports.formatArticle = articles => {
  if (!articles) return [];
  return articles.map(article => {
    article.created_at = new Date(article.created_at).toISOString();
    return article;
  });
};

exports.formatComment = comments => {
  if (!comments) return [];
  return comments.map(comment => {
    comment.created_at = new Date(comment.created_at);
    return comment;
  });
};

exports.createArticleRefObject = articles => {
  const refObj = {};
  articles.forEach(article => {
    refObj[`${article.title}`] = article.article_id;
  });
  return refObj;
};

exports.formatAllComments = (comments, createArticleRefObject) => {
  return comments.map(comment => {
    const { belongs_to, created_at, created_by, ...restOfComment } = comment;
    const formattedComment = {
      ...restOfComment,
      created_at: new Date(created_at),
      article_id: createArticleRefObject[belongs_to],
      author: created_by
    };
    return formattedComment;
  });
};
