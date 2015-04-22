var width, height, largeHeader, points;
var canvas;
var ctx;
var screenH;
var screenW;
var titleOffset;
var titleOffsetHeight;
var year;
// var stars = [];
// var fps = 50;
// var numStars = 1000;

//jQuery(document)
$('document').ready(function($){
    var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;

    //Open date content and start video
    $('.calendar-wrap').find('a').on('click', function(event){
        event.preventDefault();
        var selected_member = $(this).data('type');
        $('.month-info.'+selected_member+'').addClass('slide-in');
        $('.month-info-close').addClass('is-visible');
        $('#jan-vid').get(0).play();

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

    //Close date content and pause video
    $(document).on('click', '.cal-overlay, .month-info-close', function(event){
        event.preventDefault();
        $('.month-info').removeClass('slide-in');
        $('.month-info-close').removeClass('is-visible');
        $('#jan-vid').get(0).pause();

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

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;

        largeHeader = document.getElementById('intro');
        largeHeader.style.height = height+'px';

        titleOffset = document.getElementById('main-title').offsetTop - (document.getElementById('main-title').offsetHeight/2);
        titleOffsetHeight = document.getElementById('main-title').offsetHeight;
    }

    function addListeners() {
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';

        titleOffset = document.getElementById('main-title').offsetTop - (document.getElementById('main-title').offsetHeight/2);
        titleOffsetHeight = document.getElementById('main-title').offsetHeight;
    }

    function scrollCheck() {
          if( window.pageYOffset > titleOffset && document.getElementById('main-title').className!='main-title sticky' ){          
              document.getElementById('main-title').className='main-title sticky';          
          } 
          if( window.pageYOffset < titleOffset && document.getElementById('main-title').className!='main-title' ){
              document.getElementById('main-title').className='main-title';
          }
          if( window.pageYOffset + titleOffsetHeight > document.getElementsByClassName('calendar-wrap')[0].offsetTop ){
              document.getElementById('main-title').className='main-title anchor';
          }
      }

    // Start creating stars to draw on canvas
    // screenH = $(window).height();
    // screenW = $(window).width();

    // canvas = document.getElementById('intro-canvas');
    // canvas.height = screenH;
    // canvas.width = screenW;
    // ctx = canvas.getContext('2d');

    // for(var i = 0; i < numStars; i++) {
    //     var x = Math.round(Math.random() * screenW);
    //     var y = Math.round(Math.random() * screenH);
    //     var radius = Math.random() * 3;
    //     var opacity = Math.random();

    //     var star = new Star(x, y, radius, opacity);

    //     stars.push(star);
    // }

    // setInterval(animate, 1000/fps);
});

// Draw and animate stars
// function animate() {
//     ctx.clearRect(0, 0, screenW, screenH);
//     $.each(stars, function() {
//         this.draw(ctx);
//     })
// }

// function Star(x, y, radius, opacity) {
//     this.x = parseInt(x);
//     this.y = parseInt(y);
//     this.radius = radius;
//     this.opacity = opacity;
//     this.factor = 1;
//     this.increment = Math.random() * .03;
// }

// Star.prototype.draw = function() {
//     ctx.rotate((Math.PI * 1 / 10));
//     ctx.save();
//     ctx.translate(this.x, this.y);
  
//     if(this.opacity > 1) {
//         this.factor = -1;
//     }
//     else if(this.opacity <= 0) {
//         this.factor = 1;
//         this.x = Math.round(Math.random() * screenW);
//         this.y = Math.round(Math.random() * screenH);
//     }

//     this.opacity += this.increment * this.factor;
    
//     ctx.beginPath();

//     var grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 3 * this.radius);
//     grd.addColorStop(0, "rgba(255,255,255," + this.opacity +")");
//     grd.addColorStop(1, "rgba(255,255,200," + this.opacity +")");

//     ctx.arc(this.x,this.y,this.radius, Math.PI * 2,false);
//     ctx.fillStyle = grd;
//     ctx.shadowBlur = 50;
//     ctx.shadowColor = '#ffff33';
//     ctx.fill();
//     ctx.restore();
// }

$('.month').hover(
    function() {
        var year = new Date().getFullYear();
        var monthNum = $(this).attr('id').split('month-')[1];
        var startPosition = new Date(year, monthNum-1, 1).getDay();
        var numDays = daysInMonth(monthNum, year);

        $(this).append($('.days'));

        for(var i = 0; i < numDays; i++) {
            var curPosition = i + startPosition + 1;
            $('div.days > div:nth-child(' + curPosition + ')').append(document.createTextNode(i+1));
        }

    }, function() {
        $('div.days > div').contents().filter(function() {
            return this.nodeType == 3;
        }).remove();
    }
)

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}