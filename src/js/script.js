
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


  /* ドロワーメニュー */
const drawer = document.querySelector('.js-drawer')
const spMenu = document.querySelectorAll(
    '.js-drawer, .js-header, .js-nav'
)

drawer.addEventListener('click', function (e) {
    e.stopPropagation()
    spMenu.forEach(element => {
        element.classList.toggle('is-open')
    })
})
  /* 領域外をクリックすると閉じる */
document.addEventListener('click', function (e) {
    if (!drawer.contains(e.target)) {
            spMenu.forEach(element => {
            element.classList.remove('is-open')
        })
    }
})

