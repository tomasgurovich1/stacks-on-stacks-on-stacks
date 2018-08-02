$(document).ready(function() {
	// globals
	var canJump = false;
	var gameIsInProgress = false;
	var brickCreatorInterval;
	var score = 0;
	var highscore = 0;

	// start the game
	$('#startButton').on('click', function() {
		$('#startButton, #instructions').hide();
		$('h2').css('visibility', 'hidden');
		$('.catContainer').removeClass('homeScreen');
		$('.catContainer, .brickContainer').animate({
			top: 40,
		}, function() {
			canJump = true;
			gameIsInProgress = true;
			if (typeof brickCreatorInterval === 'undefined') {
				brickCreatorInterval = setInterval(function() {
					sendBrick();
				}, 2500);
			}
		});
	});

	// jump
	$(document).on('keyup', function() {
		if (canJump) {
			canJump = false;
			$('.catContainer').addClass('jump');
			setTimeout(function() {
				$('.catContainer').removeClass('jump');
				canJump = true;
			}, 700);
		}
	});

	function sendBrick() {
		// move the stack down
		$('.brick').animate({ top: '+=20' });
		// $('.catContainer, .brick').animate({ top: '+=20' });

		// create a new brick
		var startingSide = Math.random() > 0.5 ? '-' : '';
		var speed = Math.floor(Math.random() * 500) + 1500;
		$('.brickContainer').prepend('<div class="brick" style="left: ' + startingSide + '1000px;"></div>');
		$('.brick').eq(0).animate({
			left: '50%',
		}, speed, function() {
			score++;
			$('#score #value').text(score);
		});
	}
});
