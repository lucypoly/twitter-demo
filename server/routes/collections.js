const express = require('express');
const router = express.Router();
const client = require('./../client');

/**
 * Retrieve the identified Collection, presented as a list of the Tweets curated within
 * @id - The identifier of the Collection for which to return results
 * **/
router.get('/:id', (req, res) => {
  client.post('collections/entries', {id: req.params.id}, function (error, collection, response) {
    res.send(collection);
  });
});

/**
 * Create a Collection owned by the currently authenticated user
 * @name - The title of the collection being created, in 25 characters or less
 * **/
router.post('/:id', (req, res) => {
  client.post('collections/create', {name: 'lucy' + req.params.id}, function (error, collection, response) {
    res.send(collection);
  });
});

/**
 * Add a specified Tweet to a Collection
 * @id - The identifier of the Collection receiving the Tweet
 * **/
router.put('/:id', (req, res) => {
  client.post('collections/entries/add', {id: 'custom-978282164990160897', tweet_id: '978284048299773953'}, function (error, collection, response) {
    res.send(collection);
  });
});

module.exports = router;



