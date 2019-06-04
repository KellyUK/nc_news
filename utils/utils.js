exports.formatArticle = articles => {
  if (!articles) return [];
  return articles.map(article => {
    article.created_at = new Date(article.created_at).toISOString();
    return article;
  });
};

// for formatting comments data
exports.createAuthorRef = comment => {
  if (!comment) return {};
  const { created_by, ...restOfObject } = comment;
  const value = comment.created_by;
  const author = value;
  return { ...restOfObject, author };
};

exports.formatComment = comments => {
  if (!comments) return [];
  return comments.map(comment => {
    comment.created_at = new Date(comment.created_at).toISOString();
    return comment;
  });
};

exports.formatArticleId = comments => {};
