const OAuth = require('OAuth');

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'dD6echVFItcYIWGGquKfASrev',
  '4YCSNevTDeObdW0VGVWiAiI95mG1XF4IIz5VEgV7SFinq5qU2E',
  '1.0A',
  null,
  'HMAC-SHA1'
);

module.exports = oauth;