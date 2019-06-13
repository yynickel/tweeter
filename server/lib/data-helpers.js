"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

//
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
      // simulateDelay(() => {
      //   db.tweets.push(newTweet);
      //   callback(null, true);
      // });
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


      // simulateDelay(() => {
      // const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      // callback(null, db.tweets.sort(sortNewestFirst));
      // });
    }

  };
}