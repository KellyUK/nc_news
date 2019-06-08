# Northcoders News API

## About

This is the back end of a Northcoders News project which features various endpoints that can be used to interact with and access information in several PSQL databases using [Knex.js - A SQL Query Builder for Javascript](https://knexjs.org/)

### Built With

- [yo - npm](https://www.npmjs.com/package/yo)
- [Knex.js - A SQL Query Builder for Javascript](https://knexjs.org/)
- [express - npm](https://www.npmjs.com/package/express)
- [supertest - npm](https://www.npmjs.com/package/supertest)
- [mocha - npm](https://www.npmjs.com/package/mocha)
- [chai - npm](https://www.npmjs.com/package/chai)
- [pg - npm](https://www.npmjs.com/package/pg)

#### Author: Kelly Davidson

## Getting Started

Run `npm install` to install the project dependencies.

## Available Endpoints

### `GET` /api/topics

Responds with array of topic objects, with the properties: `slug` & `description`.

```javascript
{
  topics: [{slug: "coding", description: "I love coding}, {slug: "coffee", description: "I love coffee}];
}
```

### GET /api/users/:username

Responds with a user object, with the properties: `username`, `avatar_url` & `name`.

```javascript
{
  user:{username: "KellyUK", avatar_url: www.address.com, name: "Kelly"}
}
```

### GET /api/articles/:article_id

Responds with an article object, with the properties: `author`, `title`, `article_id`, `body`, `topic`, `created_at`, `votes`, `comment_count`.

```javascript
{
  article:{author:"Kelly", title: "introduction to Coding", article_id: 1, body: "Some interesting facts about coding", topic: "coding", created_at: time, votes: 0, comment_count: 0}
}
```

### PATCH /api/articles/:article_id

### POST /api/articles/:article_id/comments

### GET /api/articles/:article_id/comments

### GET /api/articles

### PATCH /api/comments/:comment_id

### DELETE /api/comments/:comment_id

### GET /api

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- The Northcoders Team
