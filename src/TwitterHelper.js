require('dotenv/config');
const Twitter = require('twitter-lite');

const client = new Twitter({
    subdomain: "api", // "api" is the default (change for other subdomains)
    version: "1.1", // version "1.1" is the default (change for other subdomains)
    consumer_key: process.env.API_KEY, // from Twitter.
    consumer_secret: process.env.API_SECRET, // from Twitter.
    access_token_key: process.env.ACCESS_TOKEN, // from your User (oauth_token)
    access_token_secret: process.env.TOKEN_SECRET // from your User (oauth_token_secret)
  });

class TwitterHelper{
    
    static async tweetThread(status){
         const tweet = await client.post("statuses/update", {
                status: status,
                auto_populate_reply_metadata: true
        }).catch(console.error); 

        if(tweet == undefined){
            return 400;
        }
        return 200;
    }

    static async getTweets (user,count) {
        console.log(user,count);
        const tweets = await client.get("statuses/user_timeline", {
            screen_name: user,
            count:count
          });
          return tweets;
    }

}


module.exports = TwitterHelper;
