# Babbel technical test
## Richard Blondel

---

## Stack

* Node.js v16.14, TypeScript
* Express 4
* MySQL

---

## Running it

Modify the `.env` file with your MySQL hostname, username, password, and desired database name.

Then, run:

```
npm run build && npm start
```

If you wish, you may also use the included `init.sql` script, which contains some sample data.

---

# Routes

**You may also use the included [Insomnia](https://insomnia.rest/) query collection: `Insomnia_collection.json`.**

## Users

`GET /users/:id`

This route lists all fields for a single user.

---
`PUT /users`

This route creates a user from the following parameters, in the request body:
* `firstName`
* `lastName`
* `username`
* `password`

---
`PATCH /users/:id`

This route modifies the targeted user with the following parameters, in the request body:
* `firstName`
* `lastName`
* `username`
* `password`

All parameters are optional.

---
`DELETE /users/:id`

This route deletes the user.


---
## Languages

`GET /languages`

This route lists all fields of all languages.

---
`PUT /languages`

This route creates a language from the following parameters, in the request body:
* `code`
* `name`

where `code` is an [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) 2-letter code.

---
`PATCH /languages/:code`

eg.: `/languages/fr`

This route modifies the targeted language with the following parameters, in the request body:
* `code` eg.: `fr`
* `name` eg.: `French`

---
`DELETE /languages/:code`

This route deletes the language.

---
`DELETE /languages`

This route deletes all languages.


---
## Lessons

`GET /lessons`

This route lists all fields of all lessons.

---
`PUT /lessons`

This route creates a lesson from the following parameters, in the request body:
* `name`
* `language`
* `text`

where `language` is a language identifier.

---
`PATCH /lessons/:id`

This route modifies the targeted language with the following parameters, in the request body:
* `name`
* `language`
* `text`

where `language` is a language identifier. All parameters are optional.

---
`DELETE /lessons/:id`

This route deletes the lesson.

---
## Courses

`GET /courses`

This route lists all fields of all courses.

The query parameter **user**, given a user identifier, can be used to only list this user's courses.

---
`PUT /courses`

This route creates a lesson from the following parameters, in the request body:
* `name`
* `lessons`
* `activeLesson`
* `owner`

where `lessons` is an array of lesson identifiers, `activeLesson` is a lesson identifier, and `owner` is a user identifier..

---
`DELETE /courses/:id`

This route deletes the course.
