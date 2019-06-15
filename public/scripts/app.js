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
  //adding icons
  const $heart = $("<i>").addClass("fas fa-heart").data("numLikes", tweet.num_likes).data("liked", false).data("timeStamp", tweet.created_at).text(tweet.num_likes);
  $("<span>").addClass("likes").html(`<i class='far fa-flag'></i><i class='fas fa-retweet'></i>`).append($heart).appendTo($timeStamp);
  let $footer = $("<div>").addClass("tweet-footer").append($timeStamp);
  //assemble
  $tweet.append($header, $body, $footer);
  return $tweet;
};

//render an array of tweet objects
const renderTweets = (tweets) => {
  sortTweetsByTimeStamp(tweets);
  return tweets.map(element => createTweetElement(element));
};

const sortTweetsByTimeStamp = (tweets) => {
  tweets.sort((a, b) => {
    return b.created_at - a.created_at;
  });
};

//display/hide error message
const displayError = (str) => {
  $(".error-container").slideDown();
  $(".error-message").text(str);
};

const hideError = () => {
  $(".error-container").toggle();
  $(".error-message").text("");
};

//adding functionalities to the like button(heart)
const handleHeart = () => {
  //making heart clickable
  $(".fa-heart").click(function(event) {
    //change the appearance when clicked
    let numberLikes = $(this).data("numLikes");
    if (!$(this).data("liked")) {
      numberLikes++;
      $(this).data("liked", true);
    } else {
      numberLikes--;
      $(this).data("liked", false);
    }
    $(this).data("numLikes", numberLikes);
    $(this).text(numberLikes);
    $(this).toggleClass("liked");
    //update the back-end
    const dataToBeSent = {
      numLikes: numberLikes,
      created_at: $(this).data("timeStamp"),
    };
    $.ajax({
      url: "/tweets",
      method: "PUT",
      dataType: "json",
      data: dataToBeSent,
      success: function(data) {
        console.log("put success" + data);
      }
    });
  });
};





//when document is ready
$(document).ready(function() {
  //bind slide toggle to Compose button
  $("#compose-button").click(function() {
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });
  //render tweet when page is loaded
  $.getJSON("/tweets", (data) => {
    $(".tweets-container").append(renderTweets(data));
    handleHeart();
  });
  //handle submission for new tweet
  $("form").submit(function(event) {
    event.preventDefault();
    if ($(".error-container").is(":visible")) {
      hideError();
    }
    const userInput = $("textarea").val();
    if (!userInput.length) {
      displayError("ERROR: Tweet cannot be empty!");
    } else if (userInput.length > 140) {
      displayError("ERROR: Tweet cannot exceed 140 character maximum length!");
    } else {
      $.post("/tweets", `${$(this).serialize()}`, function(data) {
        $.getJSON("/tweets", (tweets) => {
          sortTweetsByTimeStamp(tweets);
          //prepend the newest tweet at the top
          $(".tweets-container").prepend(createTweetElement(tweets[0]));
        });
      });
      //resetting form
      $(this)[0].reset();
      $("#compose-counter").text(140);
    }
  });
});