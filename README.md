# Northcoders News API

This is the back end of a Northcoders News project which features various endpoints that can be used to interact with and access information in several PSQL databases using [Knex.js - A SQL Query Builder for Javascript](https://knexjs.org/)

## Getting Started

Run _npm install_ to install the project dependencies.

## Available Endpoints

GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id

PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments

GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id

DELETE /api/comments/:comment_id

GET /api

## Built With

- [yo - npm](https://www.npmjs.com/package/yo)
- [Knex.js - A SQL Query Builder for Javascript](https://knexjs.org/)
- [express - npm](https://www.npmjs.com/package/express)
- [supertest - npm](https://www.npmjs.com/package/supertest)
- [mocha - npm](https://www.npmjs.com/package/mocha)
- [chai - npm](https://www.npmjs.com/package/chai)
- [pg - npm](https://www.npmjs.com/package/pg)

## Author

- **Kelly Davidson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- The Northcoders Team
