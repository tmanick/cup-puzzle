var goal = 6;
var cups = [12, 8, 5];
var pieceSize = 30;

$(document).ready(function(){
	initCups(cups);
	initClick();
	$('.jsmh').matchHeight();
});

function initCups(cupSizes) {
	cupPiece = '<div class="piece"></div>';

	$.each( cupSizes, function( x, cs ) {
		cup = $('#cup' + (x+1));
		cup.data('capacity', cs);
		for (i = 0; i < cs; i++) { 
			cup.append(cupPiece);
		}
	});

	for (i = 0; i < goal; i++) { 
		$('.cup-compare').append(cupPiece);
	}
	$('.cup-compare .liquid').css('height', goal * pieceSize);


	$('#cup1 .liquid').css('height', pieceSize * cupSizes[0]);
	$('#cup1').data('liquid', cupSizes[0]);
	updateLiquids();
}

function initClick() {
	
	$cup = $('.cup');
	$cup.on('click touch', function(){
		if ($cup.hasClass('chosen-cup')) {
			if(!$(this).hasClass('chosen-cup')) {
				pourLiquid($('.chosen-cup').attr('id'), $(this).attr('id'));
			} else {
				$(this).removeClass('chosen-cup');
			}
		} else {
			$(this).addClass('chosen-cup');
		}
	});
}

function pourLiquid (fromCup, toCup) {
	$fromCup = $('#' + fromCup);
	$toCup = $('#' + toCup);

	fromCupCurrent = $fromCup.data('liquid');

	toCupCapacity = $toCup.data('capacity');
	toCupCurrent = $toCup.data('liquid');
	toCupAvailable = toCupCapacity - toCupCurrent;

	if(toCupAvailable > 0) {
		if(fromCupCurrent > toCupAvailable) {
			$fromCup.data('liquid', fromCupCurrent - toCupAvailable);
			$toCup.data('liquid', toCupCapacity);
		} else {
			$fromCup.data('liquid', 0);
			$toCup.data('liquid', fromCupCurrent + toCupCurrent);
		}
	}

	updateLiquids();
	$('.cup').removeClass('chosen-cup');
}

function updateLiquids() {
	$('#cup1 .liquid').css('height', $('#cup1').data('liquid') * pieceSize);
	$('#cup2 .liquid').css('height', $('#cup2').data('liquid') * pieceSize);
	$('#cup3 .liquid').css('height', $('#cup3').data('liquid') * pieceSize);

	if($('#cup1').data('liquid') == goal) {
		$('#success').fadeIn();
	}
}