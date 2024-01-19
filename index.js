//initialize arrays
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  var audio = new Audio("sounds/" + randomChosenColor + ".mp3")
  audio.play();
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){ 
      if(gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence,1000)
    }
  }
    else{
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over")},200)
      $("h1").text("Game Over, Press any key to Restart");
      startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(this);
    checkAnswer(userClickedPattern.length - 1);
  })

$(document).on("keypress",function(){
  if(!started){
    nextSequence();
    started = true;
  }
})

