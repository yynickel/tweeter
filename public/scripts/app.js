/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
  sortTweetsByTimeStamp(tweets);
  return tweets.map(element => createTweetElement(element));
};

const sortTweetsByTimeStamp = (tweets) => {
  tweets.sort((a, b) => {
    return b.created_at - a.created_at;
  });
};

$(document).ready(function() {
  //bind slide toggle to Compose button
  $("#compose-button").click(function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });
  //render tweet when page is loaded
  $.getJSON("/tweets", (data) => {
    $(".tweets-container").append(renderTweets(data));
  });
  //handle submission for new tweet
  $("form").submit(function(event) {
    event.preventDefault();
    const userInput = $("textarea").val();
    if (!userInput.length) {
      alert("Tweet cannot be empty!");
    } else if (userInput.length > 140) {
      alert("Tweet cannot exceed 140 character maximum length!");
    } else {
      $.post("/tweets", `${$(this).serialize()}`, function(data) {
        $.getJSON("/tweets", (tweets) => {
          sortTweetsByTimeStamp(tweets);
          //prepend the newest tweet at the top
          $(".tweets-container").prepend(createTweetElement(tweets[0]));
        });
      });
    }
    //resetting form
    $(this)[0].reset();
    $("#compose-counter").text(140);
  });
});