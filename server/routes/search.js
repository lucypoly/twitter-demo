const express = require('express');
const router = express.Router();
const oauth = require('../oauth');
const constants = require('../constants');

/**
 * Retrieve the identified Collection, presented as a list of the Tweets curated within
 * @id - The identifier of the Collection for which to return results
 * **/
const searchTweets = (id) => new Promise((resolve, reject) => {
  return oauth.get(
    constants.BASE + 'search/tweets.json?q=' + id + '&count=10', constants.TOKEN, constants.SECRET,
    (e, data, response) => {
      resolve(JSON.parse(data));
    });
});

/**
 * Create a Collection owned by the currently authenticated user
 * @name - The title of the collection being created, in 25 characters or less
 * **/
const createTimeline = (name) => new Promise((resolve, reject) => {
  return oauth.post(
    constants.BASE + 'collections/create.json?name=' + name, constants.TOKEN, constants.SECRET,
    (e, data, response) => {
      resolve(JSON.parse(data));
    });
});

/**
 * Returns a collection of relevant Tweets matching a specified query
 * @q - A UTF-8, URL-encoded search query of 500 characters maximum, including operators
 * @count - The number of tweets to return per page, up to a maximum of 100
 * **/
function addTweets(params) {
  oauth.post(
    constants.BASE + 'collections/entries/curate.json', constants.TOKEN, constants.SECRET,
    JSON.stringify(params), 'application/json', (e, data, response) => JSON.parse(data));
}

getTimeline = async (id) => {
  const timeline = {};
  let tweets;
  let params;

  let result = await searchTweets(id);
  timeline.next_results = result.search_metadata.next_results;
  console.log(timeline);

  let collection = await createTimeline(id);
  console.log(collection);

  timeline.id = collection.response.timeline_id;
  console.log(timeline);

  params = { id: timeline.id };
  tweets = collection.statuses.map(item => item.id_str);
  params.changes = tweets.map(tweet => {
    return { op: 'add', tweet_id: tweet };
  });

  addTweets(params);

  return timeline;
};


router.get('/:id', (req, res) => {
  const timeline = getTimeline(req.params.id);
  console.log(timeline);

  res.send(timeline);
});

module.exports = router;



