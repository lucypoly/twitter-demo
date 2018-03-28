const express = require('express');
const router = express.Router();
const oauth = require('../oauth');
const constants = require('../constants');

/**
 * Returns a collection of relevant Tweets matching a specified query
 * @q - A UTF-8, URL-encoded search query of 500 characters maximum, including operators
 * @count - The number of tweets to return per page, up to a maximum of 100
 * **/
router.get('/:id', (req, res) => {
  oauth.get(
    constants.BASE + 'search/tweets.json?q=' + req.params.id + '&count=10', constants.TOKEN, constants.SECRET,
    function (e, data, response) {
      res.send(data);
    });
});

module.exports = router;



