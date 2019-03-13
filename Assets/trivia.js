var triviaQuestions = [{
	question: "Who was the last left-handed pitcher to win NL Rookie of the Year?",
	answerList: ["Justin Verlander", "Jacob deGrom", "Dontrelle Willis", "Clayton Kershaw"],
    answer: 3,
},{
	question: "Which team was the last to have three players reach 30 stolen bases in the same season?",
	answerList: ["2012 Brewers", "2017 Cubs", "1999 Reds", "2008 Giants"],
	answer: 0
},{
	question: "Who has won the most Gold Glove Awards in Red Sox history?",
	answerList: ["Brandon Phillips", "Dwight Evans", "Ken Griffey Jr.", "Clayton Kershaw"],
	answer: 1
},{
	question: "Who was the first player to win the Triple Crown in major league baseball?",
	answerList: ["Tommy Bond", "Pete Rose", "Phil Rizzuto", "Babe Ruth"],
	answer: 0
},{
	question: "Which is the oldest stadium in major league baseball?",
	answerList: ["Fenway Park", "Giants Stadium", "Wrigley Field", "Dodger Stadium"],
	answer: 2
},{
	question: "What is the most home runs hit by one player in a single major leaque game?",
	answerList: ["5", "3", "4", "7"],
	answer: 2
},{
	question: "When was the designated hitter rule created?",
	answerList: ["1954", "1967", "1973", "1999"],
	answer: 2
},{
	question: "What did Babe Ruth do in his first major league at bat?",
	answerList: ["Hit a home-run", "Hit a triple", "Hit an RBI", "Strike-out"],
	answer: 3
},{
	question: "Whose number is the only number to be retired in all of baseball history?",
	answerList: ["Babe Ruth", "Ken Griffey", "Jackie Robinson", "Tommy Bond"],
	answer: 2
},{
	question: "In how many seasons did Lou Gehrig play every inning of every game?",
	answerList: ["One", "Three", "Seven", "Nine"],
	answer: 0
},{
	question: "	The most strikeouts Tom Seaver had against any batter was 44. Which player -- a Hall of Famer -- is it?",
	answerList: ["Tony Perez", "Dwight Evans", "Chuck Klein", "Babe Ruth"],
	answer: 0
},{
	question: "What governor was on hand at home plate to greet Hank Aaron when he broke Babe Ruth's home run record?",
	answerList: ["Theodore Roosevelt", "George W. Bush", "Ronald Reagan", "Jimmy Carter"],
	answer: 3
},{
	question: "A baseball field is approximately what size? ",
	answerList: ["100 feet", "900 feet", "1 acre", "2 acres"],
	answer: 3
},{
	question: "Which major league player said - 'growing old is just a helpless hurt.'?",
	answerList: ["Willie Mays", "Ken Griffey", "Frank Robinson", "Jackie Robinson"],
	answer: 0
},{
	question: "'Which former Giants star is the godfather of Barry Bonds?",
	answerList: ["Pete Rose", "Babe Ruth", "Willie Mays", "Jackie Robinson"],
	answer: 2
}];

var gifArray = ['Question1', 'Question2', 'Question3', 'Question4', 'Question5', 'Question6', 'Question7', 'Question8', 'Question9', 'Question10', 'Question11', 'Question12', 'Question13','Question14','Question15'];
// var gifArray = new Array (); 
//     gifArray[0] = new gif();
//     gifArray[0].src = "/Users/savannadubell/Documents/Bootcamp/Homework/Trivia Game/Assets/Gif Images/Question1.gif"; 


var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, you have hit a home run!",
	incorrect: "No, that's a strike.",
	endTime: "Out of time, no more timeouts!",
	finished: "Time to look at the scoreboard."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	// When an answer is clicked the time is stopped
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	// Timer that counts down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    // puts image in using concatination 
	$('#gif').html('<img src = "Assets/gif_images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The right answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The right answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Rematch');
}