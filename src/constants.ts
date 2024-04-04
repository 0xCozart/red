import * as dotenv from 'dotenv';

import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const {
  TWITTER_BEARER_TOKEN,
  TWITTER_ACCESS_TOKEN,
  TWITTER_ACCESS_TOKEN_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_KEY_SECRET,
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL
} = <{ [key: string]: string }>process.env;
