$(document).on('deviceready', function(){
    var viewHeight = $(window).height();
    var viewWidth = $(window).width();
    $('body').css('height', viewHeight);
    $('.swiper-container').css('width', viewWidth);

    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: false,
        spaceBetween: 30,
        onSlideChangeEnd : function( swiper ){
            console.log( swiper.activeIndex );
            if( swiper.activeIndex == 3 ){
                $('.appTopButton').addClass('active');
            }else{
                $('.appTopButton').removeClass('active');
            }
        }
    });

    var h_window = $(window).height();
    var h_button = $(".controllers").height();
    var h_margin = h_window - 400;
    if ( h_button + 10 >= h_margin ) {
        if ( h_window < 500 ) {
            $(".middle-wrapper").css({"top": "5%", "position": "inherit", "-webkit-transform": "inherit", "transform": "inherit"});
            $(".swiper-pagination").css({"margin-top": "0px"});
            $(".controllers").css({"margin-top": "-10px", "z-index": 10,"position": "absolute", "width": "100%"});
            $(".controllers button.closeButton").css({"margin-top": "5px"});
            $(".swiper-container").css({"height": "auto"});
            $(".swiper-container .swiper-slide img").css({"width": "80%"});
        } else {
            $(".swiper-pagination").css({"margin-top": "-28px"});
            $(".controllers").css({"margin-top": "-12px", "z-index": 10,"position": "absolute", "width": "100%"});
            $(".controllers button.appTopButton").css({"margin-top": "12px"});
            $(".controllers button.closeButton").css({"margin-top": "5px"});
        }
    }
    $(".closeButton").click(function() {
        if (history.length) {
            history.go(-1);
        } else {
            window.location.href = '../../index.html';
        }
    });

});
