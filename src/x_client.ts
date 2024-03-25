import { Client } from 'twitter-api-sdk';
import { TWITTER_BEARER_TOKEN } from './constants';

const client = new Client(TWITTER_BEARER_TOKEN);

async function main() {
  const stream = client.tweets.sampleStream({
    'tweet.fields': ['author_id']
  });
  console.log({ stream });
  for await (const tweet of stream) {
    console.log(tweet.data?.author_id);
  }
}

main();
