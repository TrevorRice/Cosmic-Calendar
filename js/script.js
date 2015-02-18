$(function(){

	addListeners();

});

function addListeners() {
	$(window).scroll(animateNav);
	$(window).scroll(highlightNav);
}

function animateNav() {
	setTimeout(function() {
		var sy = window.pageYOffset || document.documentElement.scrollTop;

		if(sy >= 200) {
			$('nav').addClass('shrink');
		}
		else {
			if($('nav').hasClass('shrink')) {
				$('nav').removeClass('shrink');
			}
		}

	}, 250);

}

/* Hightlight navigation buttons */
function highlightNav() {
	var portVal = $('#portfolio').offset().top - $(window).scrollTop();
	var aboutVal = $('#about').offset().top - $(window).scrollTop();
	var contactVal = $('#contact').offset().top - $(window).scrollTop();
	var footVal = $('footer').offset().top - $(window).scrollTop();

	if(portVal <= 70 && aboutVal > 70) {
		$('.nav-right #a1').addClass('highlight');
	}
	else {
		$('.nav-right #a1').removeClass('highlight');
	}

	if(aboutVal <= 70 && contactVal > 70) {
		$('.nav-right #a2').addClass('highlight');
	}
	else {
		$('.nav-right #a2').removeClass('highlight');
	}

	if(contactVal <= 70 && footVal > 70) {
		$('.nav-right #a3').addClass('highlight');
	}
	else {
		$('.nav-right #a3').removeClass('highlight');
	}
}

/* Smooth scroll */
var $root = $('html, body');

$('.trev-logo').click(function() {
	$root.animate({
		scrollTop: 0
	}, 500);
	return false;
});

$('.nav-right a').click(function() {
	$root.animate({
		scrollTop: $( $.attr(this, 'href') ).offset().top - 70
	}, 500);
	return false;
});

/* Toggle Modal */
$('.project-1, .project-2, .project-3, .project-4').on('click', function() {
	$('.modal').toggleClass('modal-show');
	//$('body').toggleClass('overflow-hidden');
	return false;
});

$('.overlay').on('click', function() {
	$('.modal').toggleClass('modal-show');
	//$('body').toggleClass('overflow-hidden');
	return false;
});

$('.modal_close').on('click', function() {
	$('.modal').toggleClass('modal-show');
	//$('body').toggleClass('overflow-hidden');
	return false;
});

/* Header carousel */
$('#arrow-right').click(function() {
	if($('.slideshow li:nth-child(1) span').hasClass('isvisible')) {
		$('.slideshow li:nth-child(1) span').removeClass('isvisible');
		$('.slideshow li:nth-child(1) span').addClass('notvisible');
		$('.slideshow li:nth-child(2) span').removeClass('notvisible');
		$('.slideshow li:nth-child(2) span').addClass('isvisible');
	}
	else if($('.slideshow li:nth-child(2) span').hasClass('isvisible')) {
		$('.slideshow li:nth-child(2) span').removeClass('isvisible');
		$('.slideshow li:nth-child(2) span').addClass('notvisible');
		$('.slideshow li:nth-child(3) span').removeClass('notvisible');
		$('.slideshow li:nth-child(3) span').addClass('isvisible');
	}
	else if($('.slideshow li:nth-child(3) span').hasClass('isvisible')) {
		$('.slideshow li:nth-child(3) span').removeClass('isvisible');
		$('.slideshow li:nth-child(3) span').addClass('notvisible');
		$('.slideshow li:nth-child(1) span').removeClass('notvisible');
		$('.slideshow li:nth-child(1) span').addClass('isvisible');
	}
});

$('#arrow-left').click(function() {
	if($('.slideshow li:nth-child(1) span').hasClass('isvisible')) {
		$('.slideshow li:nth-child(1) span').removeClass('isvisible');
		$('.slideshow li:nth-child(1) span').addClass('notvisible');
		$('.slideshow li:nth-child(3) span').removeClass('notvisible');
		$('.slideshow li:nth-child(3) span').addClass('isvisible');
	}
	else if($('.slideshow li:nth-child(2) span').hasClass('isvisible')) {
		$('.slideshow li:nth-child(2) span').removeClass('isvisible');
		$('.slideshow li:nth-child(2) span').addClass('notvisible');
		$('.slideshow li:nth-child(1) span').removeClass('notvisible');
		$('.slideshow li:nth-child(1) span').addClass('isvisible');
	}
	else if($('.slideshow li:nth-child(3) span').hasClass('isvisible')) {
		$('.slideshow li:nth-child(3) span').removeClass('isvisible');
		$('.slideshow li:nth-child(3) span').addClass('notvisible');
		$('.slideshow li:nth-child(2) span').removeClass('notvisible');
		$('.slideshow li:nth-child(2) span').addClass('isvisible');
	}
});