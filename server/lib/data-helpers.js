"use strict";

//route of the database for storage
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(mongoClient) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      mongoClient.connect(MONGODB_URI, (err, db) => {
        db.collection("tweets").insertOne(newTweet);
        callback(null, true);
        db.close();
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      mongoClient.connect(MONGODB_URI, (err, db) => {
        db.collection("tweets").find().toArray((err, tweets) => {
          const sortNewestFirst = (a, b) => a.created_at - b.created_at;
          callback(null, tweets.sort(sortNewestFirst));
          db.close();
        });
      });
    },

    //update the likes of a tweet using time created
    updateLikes: function(tweet, callback) {
      mongoClient.connect(MONGODB_URI, (err, db) => {
        db.collection("tweets").updateOne({ "created_at": Number(tweet.created_at) }, { $set: { num_likes: tweet.numLikes } }, (err, r) => {
          console.log("update error: " + r);
        });
        callback(null, true);
        db.close();
      });
    }
  }
};