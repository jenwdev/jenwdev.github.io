// JavaScript Document
$(document).ready(function() {
	var timeLeft = 45;
	var questionNum = 0; 
	var questions = 
	["The World’s Fair or Columbian Exposition took place in what year?", 
	"Which snack was invented in Chicago?", 
	"The Field Museum’s Tyrannosaurus Rex skeleton is named??", 
	"How many miles of lakefront in Chicago?", 
	"Which one of these is a Chicago invention?"];
	var allAnswers = {
	ans1 : ["1893", "1938", "1905", "1898"],
	ans2 : ["Pringles", "Twinkies", "Skittles", "Oreo"],
	ans3 : ["Molly", "Jane", "Sue", "Dorothy"],
	ans4 : ["32 miles", "26 miles", "52 miles", "33 miles"],
	ans5 : ["Spay Paint", "Ferris Wheel", "Zipper", "All of the above"]
	};
	var answerValues = ["A", "B", "C", "D"];
	var correctAnswers = ["A", "B", "C", "B", "D"];
	var correctAnswersDisplay = ["1893", "Twinkies", "Sue", "26 miles", "All of the above"];
	var correctAnsDisplay;
	var answerKey = [allAnswers.ans1, allAnswers.ans2, allAnswers.ans3, allAnswers.ans4, allAnswers.ans5];
	var whichAnswers = [];
	var guessAns;
	var correctAns;
	var wins = 0;
	var losses = 0;
	var timerId;
	var questionAnswered = 0;
	var nonAnswered = 0;
	var ansImages = ['assets/images/q01.jpg', 'assets/images/q02.jpg', 'assets/images/q03.jpg', 'assets/images/q04.jpg', 'assets/images/q05.jpg'];
	
	$("#timer").hide();
	$("#triviaQuestion").hide();
	$("#restart-button").hide();
	$("#correct").hide();
	$("#wrong").hide();
	$("#nonans").hide();
	
	$("#start-button").on("click", function() {
		startGame();
	});
	
	$("#restart-button").on("click", function() {
		questionNum = 0; 
		wins = 0;
		losses = 0;
		questionAnswered = 0;
	    nonAnswered = 0;
		$("#timer").hide();
		$("#triviaQuestion").hide();
		$("#restart-button").hide();
		$("#correct").hide();
		$("#wrong").hide();
		$("#nonans").hide();
		$("#answers").empty();
		$('#answers').show();
		startGame();
	});
		 
	function startGame() {
		//hide the start button
		$("#start-button").hide();
		$("#timer").show();
		$("#triviaQuestion").show();
		timeLeft = 25;
		questionTimer(); 
		getQuestion();
		getAnswers();
		console.log(questionAnswered);

			// click answer 
			$(".ansBtn").on("click", function() {
			// gets answer value from click
    		guessAns = ($(this).attr("data-answervalue"));
			questionAnswered = 1;
			console.log(questionAnswered);
			checkAnswer();
	 		});
		} 
	
	function getQuestion(){	
		$("#triviaQuestion").text(questions[questionNum]);
		whichAnswers = answerKey[questionNum];
		//console.log(whichAnswers);
		correctAns = correctAnswers[questionNum];
		correctAnsDisplay = correctAnswersDisplay[questionNum];
		//console.log(correctAns);
		questionAnswered = 0;
		
	}
	
	function getAnswers(){
	  for (var i = 0; i < answerValues.length; i++) {
		   var answerBuild = $("<div>");
		   answerBuild.addClass("ansBtn btn-primary btn-lg");
		   answerBuild.text(whichAnswers[i]);
		   answerBuild.attr("data-answervalue", answerValues[i]);
		   $("#answers").append(answerBuild);
	  }  		
	}
		
	function checkAnswer(){	
    	if (questionAnswered === 1) {
			checkIfCorrect();
		} else if (questionAnswered === 0){
			nonAnswered++;
		 	$("#triviaQuestion").text("Times up! The correct answer is: " + correctAnsDisplay);
			$("#answers").hide();
			showImage();
		 	setTimeout(nextQuestion, 4000);
			clearTimeout(timerId);
			}
		}

	function checkIfCorrect(){
    	if (guessAns === correctAns) {
			wins++;
			$("#triviaQuestion").text("That is correct!");
			$("#answers").hide();
			showImage();
			setTimeout(nextQuestion, 4000);
			clearTimeout(timerId);
   		 } else {
			losses++;
		 	$("#triviaQuestion").text("That is incorrect! The correct answer is: " + correctAnsDisplay);
			$("#answers").hide();
			showImage();
		 	setTimeout(nextQuestion, 4000);
			clearTimeout(timerId);
    	}
	}
	
	function showImage() {
		$('#images').show();
		$('#images').html("<img src='"+ansImages[questionNum]+"'>");
	}
		
	//Countdown for Qestions
	function questionTimer(){
		 timerId = setInterval(countdown, 1000);
		//console.log(timerId);
		
		function countdown() {		
 		 	if (timeLeft == 0) {
   				 clearTimeout(timerId);
				 // if answer is blank, show out of time and correct answer, add 1 to unanswered score
				 // call to check if answer is blank
				 checkAnswer();
 		 	} else {
		 		$("#timerDisplay").text(timeLeft); //add "Time Remaining: + seconds.
    	 		timeLeft--;
  		 		}
		 	} 
		}
		
	function nextQuestion(){
		if (questionNum === 4) {
			clearTimeout(timerId);
			$("#triviaQuestion").text("Here's how you did:");
			$('#images').hide();
			$('#timer').hide();
			$("#restart-button").show();
		 	$("#nonans").html("Not Answered: " + nonAnswered);
			$("#wrong").html("Wrong: " +losses);
			$("#correct").html("Correct: " + wins);
			$("#correct").show();
			$("#wrong").show();
			$("#nonans").show();
		}else{
			questionNum++; 
			$('#images').hide();
			$("#answers").empty();
			$('#answers').show();
			startGame();
		}
	}	  
});