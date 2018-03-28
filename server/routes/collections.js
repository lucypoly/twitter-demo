const express = require('express');
const router = express.Router();
const oauth = require('../oauth');

const BASE = 'https://api.twitter.com/1.1/';
const TOKEN = '977158521417535489-2UVt090gQKdF1uaTCPhZIQMrFoNaj1j';
const SECRET = '9dYZc2oGzeaQaCkkkmgDAahVsGYe7QpjKkElPyesrcpMU';

/**
 * Retrieve the identified Collection, presented as a list of the Tweets curated within
 * @id - The identifier of the Collection for which to return results
 * **/
router.get('/:id', (req, res) => {
  oauth.get(
    BASE + 'collections/entries.json?id=' + req.params.id, TOKEN, SECRET, function (e, data, response) {
      res.send(data);
    });
});

/**
 * Create a Collection owned by the currently authenticated user
 * @name - The title of the collection being created, in 25 characters or less
 * **/
router.post('/:id', (req, res) => {
  oauth.post(
    BASE + 'collections/create.json?name=' + req.params.id, TOKEN, SECRET, function (e, data, response) {
      res.send(data);
    });
});

/**
 * Curate a Collection by adding Tweets in bulk
 * **/
router.post('/', (req, res) => {
  const params = {id: 'custom-978631851660234753', changes: [{op: 'add', tweet_id: '390853164611555329'}]};

  oauth.post(
    BASE + 'collections/entries/curate.json', TOKEN, SECRET, JSON.stringify(params), 'application/json', function (e, data, response) {
      res.send(data);
    });
});

module.exports = router;



