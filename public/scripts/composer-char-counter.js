$(document).ready(function() {
  const counter = $("#compose-counter");
  //predefined max character for a tweet
  const totalCharacter = 140;
  counter.text(totalCharacter);
  $("#compose-text").on("input", function(event) {
    let characterLeft = totalCharacter - $(this).val().length;
    counter.text(characterLeft);
    counter.toggleClass("over-max-character", characterLeft < 0);
  });
});