const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

const { getAllTags } = require('../db');

tagsRouter.get('/:tagName/posts', async (req, res) => {
    const tags = await getAllTags();

    try {
    // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
    } catch ({ name, message }) {
        // forward the name and message to the error handler
    }
    });

module.exports = tagsRouter;