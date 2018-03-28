const express = require('express');
const router = express.Router();
const oauth = require('../oauth');
const constants = require('../constants');

/**
 * Retrieve the identified Collection, presented as a list of the Tweets curated within
 * @id - The identifier of the Collection for which to return results
 * **/
router.get('/:id', (req, res) => {
  oauth.get(
    constants.BASE + 'collections/entries.json?id=' + req.params.id, constants.TOKEN, constants.SECRET,
    function (e, data, response) {
      res.send(data);
    });
});

/**
 * Create a Collection owned by the currently authenticated user
 * @name - The title of the collection being created, in 25 characters or less
 * **/
router.post('/:id', (req, res) => {
  oauth.post(
    constants.BASE + 'collections/create.json?name=' + req.params.id, constants.TOKEN, constants.SECRET,
    function (e, data, response) {
      res.send(data);
    });
});

/**
 * Curate a Collection by adding Tweets in bulk
 * **/
router.post('/', (req, res) => {
  const params = { id: 'custom-978631851660234753', changes: [{ op: 'add', tweet_id: '390853164611555329' }] };

  oauth.post(
    constants.BASE + 'collections/entries/curate.json', constants.TOKEN, constants.SECRET,
    JSON.stringify(params), 'application/json', function (e, data, response) {
      res.send(data);
    });
});

module.exports = router;



