/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

const createTweetElement = (tweet) => {
  let $tweet = $('<article>').addClass('tweet');
  //generate header
  let $profilePicture = $("<img>").addClass("profile-picture").attr("src", tweet.user.avatars.small);
  let $username = $("<h1>").addClass("tweet-username").text(tweet.user.name);
  let $hashtag = $("<span>").addClass("hash-tag").text(tweet.user.handle);
  let $header = $("<div>").addClass("tweet-header").append($profilePicture, $username, $hashtag);
  //generate body
  let $tweetContent = $("<p>").addClass("tweet-content").text(tweet.content.text);
  let $body = $("<div>").addClass("tweet-body").append($tweetContent);
  //generate footer
  let $timeStamp = $("<p>").addClass("time-stamp").text(jQuery.timeago(new Date(tweet.created_at)));
  $("<span>").addClass("likes").text("🏳🔃❤️").appendTo($timeStamp);
  let $footer = $("<div>").addClass("tweet-footer").append($timeStamp);
  //assemble
  $tweet.append($header, $body, $footer);
  return $tweet;
};

const renderTweets = (tweets) => {
  return tweets.map(element => createTweetElement(element));
};

const $tweet = renderTweets(data);
console.log($tweet[0]);
$(document).ready(function() {
  $(".tweets-container").append($tweet);
});