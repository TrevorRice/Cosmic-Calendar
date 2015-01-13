jQuery(document).ready(function($){
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

    var width, height, largeHeader, canvas, ctx, points = true;

    // Main
    initHeader();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;

        largeHeader = document.getElementById('intro');
        largeHeader.style.height = height+'px';

        canvas = document.getElementById('intro-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
    }

    function addListeners() {
        // window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }
});