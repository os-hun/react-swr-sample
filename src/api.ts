import axios from 'axios';

const main = 'https://api.twitter.com/1.1/search/tweets.json';

export const fetch_tweet = () => {
  return `${main}?q=RTキャンペーン%20OR%20懸賞&result_type=recent&count=100`;
};

export const TwitterInstance = axios.create({
  baseURL: 'https://api.twitter.com/1.1',
  timeout: 1000,
  headers: {
    'authorization': 'OAuth oauth_consumer_key=DSLUvSXj3zMmgVcf0ekitFpN8', 
    'oauth_nonce': 'generated-nonce',
    'oauth_signature': 'generated-signature',
    'oauth_signature_method': 'HMAC-SHA1',
    'oauth_timestamp': 'generated-timestamp',
    'oauth_token': 'access-token-for-authed-user',
    'oauth_version': '1.0'
  }
});
