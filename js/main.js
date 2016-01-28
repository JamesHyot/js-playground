var questions;

var main = function(){

	var answers = [];
	var i = 0;
	var max = questions.length;
	var q = document.getElementById("QUESTION");
	var a = document.getElementById("a");
	var b = document.getElementById("b");
	var c = document.getElementById("c");
	var d = document.getElementById("d");
	var buttona = $('#buttona');
	var buttonb = $('#buttonb');
	var buttonc = $('#buttonc');
	var buttond = $('#buttond');
	var points = 0;

	q.innerHTML = questions[0].question;
	a.innerHTML = questions[0].choices[0];
	b.innerHTML = questions[0].choices[1];
	c.innerHTML = questions[0].choices[2];
	d.innerHTML = questions[0].choices[3];


	$('#a').click(function(){
		buttona.prop("checked", true);
	})
	$('#b').click(function(){
		buttonb.prop("checked", true);
	})
	$('#c').click(function(){
		buttonc.prop("checked", true);
	})
	$('#d').click(function(){
		buttond.prop("checked", true);
	})
	$('#next-btn').click(function(){
		$('#feedback').remove();
		if(buttona.prop("checked"))
		{
			answers[i] = a.innerHTML; 
			nextQuestion();
		}
		else if(buttonb.prop("checked"))
		{
			answers[i] = b.innerHTML;
			nextQuestion();
		}
		else if(buttonc.prop("checked"))
		{
			answers[i] = c.innerHTML;
			nextQuestion();
		}
		else if(buttond.prop("checked"))
		{
			answers[i] = d.innerHTML;
			nextQuestion();
		}
		else if(!buttona.prop("checked") && !buttonb.prop("checked") && !buttonc.prop("checked") && !buttond.prop("checked"))
		{
			$('#error').append('<div class="red" id="feedback"><br>Please check at least one answer !</div>');
		}
		else{
			nextQuestion();	
		}	
	});

	$('#back-btn').click(function(){
		if(i!=0)
		{
			$('#feedback').remove();
			prevQuestion();
		}
	});

	var nextQuestion = function(){
		++i;
		if(i < max)
		{
			$('#quiz').fadeOut('normal', function(){
					q.innerHTML = questions[i].question;
					a.innerHTML = questions[i].choices[0];
					b.innerHTML = questions[i].choices[1];
					c.innerHTML = questions[i].choices[2];
					d.innerHTML = questions[i].choices[3];
					$('#quiz').fadeIn(600);
					if(i>0)
					{
					$('#back-btn').removeClass('btn-disabled').addClass('btn-primary');
					}
					else{
						$('#back-btn').addClass('btn-disabled').removeClass('btn-primary');
					}
							

			switch(answers[i])
			{
				case questions[i].choices[0].toString():
					buttona.prop("checked", true);
				break;

				case questions[i].choices[1].toString():
					buttonb.prop("checked", true);
				break;

				case questions[i].choices[2].toString():
					buttonc.prop("checked", true);
				break;

				case questions[i].choices[3].toString():
					buttond.prop("checked", true);
				break;

				default:
					buttona.prop("checked", false);
					buttonb.prop("checked", false);
					buttonc.prop("checked", false);
					buttond.prop("checked", false);
				break;				
			}

			});
		}
		else
		{
			endQuiz();
			i=0;
		}
	}

	var prevQuestion = function(){
		i-=2;
		nextQuestion();

	};

	var endQuiz = function(){
			$('#quiz').fadeOut(100, function(){
				for(var index in questions)
				{
					if(questions[index].answer == answers[index])
					{
						points++;
					}
				}
					var textToAppend = "You have answered " + points + " questions out of " + max + " correctly.<br><br>";
					$('#page').append('<div id="result">' + textToAppend + '</div>');
					$('#page').append('<button type="button" id="tryagain" class="btn-back">Try Again ?</button>');
			});
	}

	$("#page").on("click", "#tryagain", function(){
			$('#result').remove();
			$('#tryagain').remove();
			i=-1;
			points = 0;
			nextQuestion();

	});
};

function parseQuestions(callback){
	$.getJSON("js/questions.json", function(json) {
    	questions = json;
    	callback();
	});
}

$(document).ready(parseQuestions(main));