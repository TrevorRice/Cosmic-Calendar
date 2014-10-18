(function() {
	var width, height, largeHeader, target, ctx, canvas = true;

	// Main
	initHeader();

	function initHeader() {
		width = window.innerWidth;
		height = window.innerHeight;
		//target = {x: 0, y: height};

		largeHeader = document.getElementById('large-header');
		largeHeader.style.height = height+'px';

        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

	}

	// Even Handling
	function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    // Only need if I want animations to stop
    /*function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }*/

	function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

})();

