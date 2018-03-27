const express = require('express');
const router = express.Router();
const client = require('./../client');

/**
 * Returns a collection of relevant Tweets matching a specified query
 * @q - A UTF-8, URL-encoded search query of 500 characters maximum, including operators
 * @count - The number of tweets to return per page, up to a maximum of 100
 * **/
router.get('/:id', (req, res) => {
  client.get('search/tweets', {q: '#' + req.params.id, count: 10}, function (error, tweets, response) {
    res.send(tweets);
  });
});

module.exports = router;



