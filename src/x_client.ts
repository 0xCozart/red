import { ETwitterStreamEvent, TwitterApi } from 'twitter-api-v2';
import { TWITTER_API_KEY, TWITTER_API_KEY_SECRET } from './constants';

const authedClient = async () => {
  // const client = new Client(TWITTER_BEARER_TOKEN);
  const client = new TwitterApi({
    appKey: TWITTER_API_KEY,
    appSecret: TWITTER_API_KEY_SECRET
  });
  const authenticatedClient = await client.appLogin();
  console.log({ authenticatedClient });
  // const readOnlyClient = authenticatedClient.readOnly;
  // console.log({ readOnlyClient });
  return authenticatedClient.v2;
};

async function main() {
  const client = await authedClient();

  // get current rules for tweet streams
  const rules = await client.streamRules();
  if (rules.data.length) {
    await client.updateStreamRules({
      delete: { ids: rules.data.map(rule => rule.id) }
    });
  }

  // add search rules
  await client.updateStreamRules({
    add: [{ value: '$ZYN' }]
  });

  // create stream with new rules
  const stream = await client.searchStream({
    'tweet.fields': ['referenced_tweets', 'author_id'],
    expansions: ['referenced_tweets.id']
  });

  stream.autoReconnect = true;

  stream.on(ETwitterStreamEvent.Data, async tweet => {
    console.log(tweet);
  });
}

main();

// console.log({ authedClient });

// import { Client } from 'twitter-api-sdk';
// //Import package
// import { auth } from 'twitter-api-sdk';

// // const client = new Client(process.env.TWITTER_BEARER_TOKEN as string);

// // async function main() {
// //   const stream = client.tweets.sampleStream({
// //     'tweet.fields': ['author_id']
// //   });
// //   console.log({ stream });
// //   for await (const tweet of stream) {
// //     console.log(tweet.data?.author_id);
// //   }
// // }

// // Initialize auth client first
// const authClient = new auth.OAuth2User({
//   client_id: process.env.CLIENT_ID as string,
//   client_secret: process.env.CLIENT_SECRET as string,
//   callback: 'http://localhost:3000',
//   scopes: ['tweet.read', 'users.read', 'offline.access']
// });

// // Pass auth credentials to the library client
// const twitterClient = new Client(authClient);

// console.log({
//   twitterClient: twitterClient.tweets.getTweetsSample10Stream({ partition: 2 })
// });

// // main();
