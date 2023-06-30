
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


});

/* swiper mainView */
const swiper = new Swiper('.mainView-swiper', {
    loop: true,
    autoplay: {
        delay: 4000,
    },
    effect: 'fade',
    speed: 900
});