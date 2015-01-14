var width, height, largeHeader, points;
var canvas;
var ctx;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 2000;

//jQuery(document)
$('document').ready(function($){
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

    //Open date content
    $('.calendar-wrap').find('a').on('click', function(event){
        event.preventDefault();
        var selected_member = $(this).data('type');
        $('.month-info.'+selected_member+'').addClass('slide-in');
        $('.month-info-close').addClass('is-visible');

        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        if( is_firefox ) {
            $('main').addClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').addClass('overflow-hidden');
                $('html').addClass('overflow-hidden');
            });
        } else {
            $('main').addClass('slide-out');
            $('body').addClass('overflow-hidden');
            $('html').addClass('overflow-hidden');
        }

    });

    //Close date content
    $(document).on('click', '.cal-overlay, .month-info-close', function(event){
        event.preventDefault();
        $('.month-info').removeClass('slide-in');
        $('.month-info-close').removeClass('is-visible');

        if( is_firefox ) {
            $('main').removeClass('slide-out').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
                $('body').removeClass('overflow-hidden');
                $('html').removeClass('overflow-hidden');
            });
        } else {
            $('main').removeClass('slide-out');
            $('body').removeClass('overflow-hidden');
            $('html').removeClass('overflow-hidden');
        }
    });

    // var width, height, largeHeader, canvas, ctx, points = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;

        largeHeader = document.getElementById('intro');
        largeHeader.style.height = height+'px';

        // canvas = document.getElementById('intro-canvas');
        // canvas.width = width;
        // canvas.height = height;
        // ctx = canvas.getContext('2d');
    }

    function addListeners() {
        // window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        // canvas.width = width;
        // canvas.height = height;
    }

    screenH = $(window).height();
    screenW = $(window).width();

    canvas = document.getElementById('intro-canvas');
    canvas.height = screenH;
    canvas.width = screenW;
    ctx = canvas.getContext('2d');

    for(var i = 0; i < numStars; i++) {
        var x = Math.round(Math.random() * screenW);
        var y = Math.round(Math.random() * screenH);
        var length = 1 + Math.random() * 2;
        var opacity = Math.random();

        var star = new Star(x, y, length, opacity);

        stars.push(star);
    }

    setInterval(animate, 1000/fps);
});

function animate() {
    ctx.clearRect(0, 0, screenW, screenH);
    $.each(stars, function() {
        this.draw(ctx);
    })
}

function Star(x, y, length, opacity) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.length = parseInt(length);
    this.opacity = opacity;
    this.factor = 1;
    this.increment = Math.random() * .03;
}

Star.prototype.draw = function() {
    ctx.rotate((Math.PI * 1 / 10));
    ctx.save();
    ctx.translate(this.x, this.y);

    if(this.opacity > 1) {
        this.factor = -1;
    }
    else if(this.opacity <= 0) {
        this.factor = 1;

        this.x = Math.round(Math.random() * screenW);
        this.y = Math.round(Math.random() * screenH);
    }

    this.opacity += this.increment * this.factor;

    ctx.beginPath();

    for (var i = 5; i--;) {
        ctx.lineTo(0, this.length);
        ctx.translate(0, this.length);
        ctx.rotate((Math.PI * 2 / 10));
        ctx.lineTo(0, - this.length);
        ctx.translate(0, - this.length);
        ctx.rotate(-(Math.PI * 6 / 10));
    }

    ctx.lineTo(0, this.length);
    ctx.closePath();
    ctx.fillStyle = "rgba(255, 255, 200, "+ this.opacity + ")";
    ctx.shawdowBlur = 5;
    ctx.shawdowColor = '#ffff33';
    ctx.fill();
    ctx.restore();
}