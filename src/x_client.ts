import { TWITTER_API_KEY, TWITTER_API_KEY_SECRET } from './constants';

import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: TWITTER_API_KEY,
  appSecret: TWITTER_API_KEY_SECRET
});

const authedClient = async () => {
  await client.appLogin();
  console.log({ client });
};

authedClient();

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
