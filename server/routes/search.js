const express = require('express');
const router = express.Router();
const oauth = require('../oauth');
const constants = require('../constants');

// /**
//  * Retrieve the identified Collection, presented as a list of the Tweets curated within
//  * @id - The identifier of the Collection for which to return results
//  * **/
// router.get('/:id', (req, res) => {
//   oauth.get(
//     constants.BASE + 'collections/entries.json?id=' + req.params.id, constants.TOKEN, constants.SECRET,
//     function (e, data, response) {
//       res.send(data);
//     });
// });
//
// /**
//  * Create a Collection owned by the currently authenticated user
//  * @name - The title of the collection being created, in 25 characters or less
//  * **/
// router.post('/:id', (req, res) => {
//   oauth.post(
//     constants.BASE + 'collections/create.json?name=' + req.params.id, constants.TOKEN, constants.SECRET,
//     function (e, data, response) {
//       res.send(data);
//     });
// });
//
// /**
//  * Curate a Collection by adding Tweets in bulk
//  * **/
// router.post('/', (req, res) => {
//   const params = { id: 'custom-978631851660234753', changes: [{ op: 'add', tweet_id: '390853164611555329' }] };
//
//   oauth.post(
//     constants.BASE + 'collections/entries/curate.json', constants.TOKEN, constants.SECRET,
//     JSON.stringify(params), 'application/json', function (e, data, response) {
//       res.send(data);
//     });
// });
/**
 * Retrieve the identified Collection, presented as a list of the Tweets curated within
 * @id - The identifier of the Collection for which to return results
 * **/
async function searchTweets(id, fn) {
  oauth.get(
    constants.BASE + 'search/tweets.json?q=' + id + '&count=10', constants.TOKEN, constants.SECRET,
    (e, data, response) => {
      fn(JSON.stringify(data))
    });
}

/**
 * Create a Collection owned by the currently authenticated user
 * @name - The title of the collection being created, in 25 characters or less
 * **/
async function createTimeline(name, fn) {
  oauth.post(
    constants.BASE + 'collections/create.json?name=' + name, constants.TOKEN, constants.SECRET,
    (e, data, response) => {
      fn(JSON.stringify(data))
    });
}

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

async function getTimeline(id) {
  const timeline = {};
  let data = {};
  let collection = {};
  let tweets;
  let params;

  await searchTweets(id, (result) => {
    data = result;
    console.log(data);
  });
  timeline.next_results = data.search_metadata.next_results;

  await createTimeline(id, (result) => {
    collection = result;
  });

  tweets = collection.statuses.map(item => item.id_str);
  params = { id: timeline.id };
  timeline.id = collection.response.timeline_id;

  params.changes = tweets.map(tweet => {
    return { op: 'add', tweet_id: tweet };
  });

  addTweets(params);

  return timeline;
}


router.get('/:id', (req, res) => {
  // oauth.get(
  //   constants.BASE + 'search/tweets.json?q=' + req.params.id + '&count=10', constants.TOKEN, constants.SECRET,
  //   (e, data, response) => {
  //
  //     //save id for next results
  //     const timeline = {};
  //     timeline.next_results = JSON.parse(data).search_metadata.next_results;
  //
  //     //create new timeline
  //     oauth.post(
  //       constants.BASE + 'collections/create.json?name=' + req.params.id, constants.TOKEN, constants.SECRET,
  //       (e, data, response) => {
  //         console.log(data);
  //         timeline.id = JSON.parse(data).response.timeline_id;
  //       });
  //
  //     //add tweets to timeline
  //     const tweets = JSON.parse(data).statuses.map(item => item.id_str);
  //     const params = { id: timeline.id };
  //     params.changes = tweets.map(tweet => {
  //       return { op: 'add', tweet_id: tweet };
  //     });
  //
  //     oauth.post(
  //       constants.BASE + 'collections/entries/curate.json', constants.TOKEN, constants.SECRET,
  //       JSON.stringify(params), 'application/json', function (e, data, response) {
  //       });

  const timeline = getTimeline(req.params.id);
  res.send(timeline);
});

module.exports = router;



