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

#### Hosted on Heroku

https://kelly-davidson-nc-news.herokuapp.com/api/

## Getting Started

Run `npm install` to install the project dependencies.

## Available Endpoints

### `GET` /api/topics

Responds with array of topic objects, with the properties: `slug` & `description`.

```javascript
{
  "topics": [
    { "slug": "coding", "description": "I love coding" },
    { "slug": "coffee", "description": "I love coffee" }
  ]
}
```

### `GET` /api/users/:username

Responds with a user object, with the properties: `username`, `avatar_url` & `name`.

```javascript
{
  "user": {
    "username": "KellyUK",
    "avatar_url": "www.address.com",
    "name": "Kelly"
  }
}
```

### `GET` /api/articles/:article_id

Responds with an article object, with the properties: `author`, `title`, `article_id`, `body`, `topic`, `created_at`, `votes`, `comment_count`.

```javascript
{
  "article": {
    "author": "Kelly",
    "title": "introduction to Coding",
    "article_id": 1,
    "body": "Some interesting facts about coding",
    "topic": "coding",
    "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
    "votes": 0,
    "comment_count": 0
  }
}
```

### `PATCH` /api/articles/:article_id

Body accepts an object in the form `{ inc_votes: 1 }`
Responds with an updated article object.

```javascript
{
  "article": {
    "author": "Kelly",
    "title": "introduction to Coding",
    "article_id": 1,
    "body": "Some interesting facts about coding",
    "topic": "coding",
    "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
    "votes": 1,
    "comment_count": 0
  }
}
```

### `POST` /api/articles/:article_id/comments

Body accepts and object in the form ```{ username: "Kelly", body: "Nice work!" }
Responds with the updated comment object.

```javascript
{
  "comment": {
    "comment_id": 1,
    "votes": 2,
    "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
    "author": "Kelly",
    "body": "Nice work!"
  }
}

```

### `GET` /api/articles/:article_id/comments

Responds with an array of comments for a given article_id.
Accepts queries: sort_by (default to created_at) and order (default to desc).

```javascript
{
  "comments": [
    {
      "comment_id": 1,
      "votes": 2,
      "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
      "author": "Kelly",
      "body": "Nice work!"
    },
    {
      "comment_id": 2,
      "votes": 1,
      "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
      "author": "Sally",
      "body": "Great work!"
    }
  ]
}

```

### `GET` /api/articles

Responds with an array of article objects.
Accepts queries: sort_by (default to created_at) and order (default to desc), author and topic.

```javascript
{
  "articles": [
    {
      "author": "Kelly",
      "title": "introduction to Coding",
      "article_id": 1,
      "body": "Some interesting facts about coding",
      "topic": "coding",
      "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
      "votes": 1,
      "comment_count": 0
    },
    {
      "author": "Kelly",
      "title": "introduction to Coffee",
      "article_id": 2,
      "body": "Some interesting facts about coffee",
      "topic": "coffee",
      "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
      "votes": 0,
      "comment_count": 0
    }
  ]
}

```

### `PATCH` /api/comments/:comment_id

Body accepts an object in the form `{ inc_votes: 1 }`
Responds with an updated comment object with votes increased by the given amount.

```javascript
{
  "comment": {
    "comment_id": 1,
    "votes": 6,
    "created_at": "YYYY-MM-DD'T'HH: MM: SS.SSS'Z'",
    "author": "Kelly",
    "body": "Nice work!"
  }
}
```

### `DELETE` /api/comments/:comment_id

Deletes the comment specified by comment_id.

### `GET` /api

Responds with a JSON object describing all endpoints.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- The Northcoders Team
