
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


});

/* swiper mainView */
const mainviewSwiper = new Swiper('.mainViewSwiper', {
    loop: true,
    autoplay: {
        delay: 4000,
    },
    effect: 'fade',
    speed: 900
});

/* swiper campaig */
const campaignSwiper = new Swiper('.campaignSwiper__slide', {
    loop: true,
    speed: 900,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    spaceBetween: 24,
    slidesPerView: 1.2,
    /* pc時 */
    breakpoints: {
        768: {
            slidesPerView: 3.5,
            spaceBetween: 40,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        }
    }
});
