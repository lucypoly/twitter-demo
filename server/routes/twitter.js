const express = require('express');
const router = express.Router();
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'dnLyZZD6R8XdUwXgD1rE9tuZR',
  consumer_secret: 'ihW0HMn4CtocI1prHYusDYWyUKTOMlJAlydcb0GJENjLDtEfcR',
  access_token_key: '977158521417535489-tNTW4YcvQNLU1aXCj2WPqEgU4vHfGJM',
  access_token_secret: 'l2XPeZUr06Is8R3eaSvFYum4DfdL723IbXGF2QXd6mSwy'
});

router.get('/', (req, res) => {
  client.get('search/tweets', {q: 'node.js'}, function (error, tweets, response) {
    console.log(tweets);
  });
});

module.exports = router;



