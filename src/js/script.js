document.addEventListener('DOMContentLoaded',function(){
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
        freeMode: true,
        speed: 900,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        slidesPerView: 1.25,
        spaceBetween: 24,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        /* pc, tab時 */
        breakpoints: {
            768: {
                slidesPerView: 3.2,
                spaceBetween: 20,
            },
            1440: {
                slidesPerView: 3.5,
                spaceBetween: 40,
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
    
    // /* toTop */
    let toTop = document.querySelector('.js-toTop');
    let trigger = document.querySelector('.js-toTopTrigger');
    let footer = document.querySelector('.js-footer');
    
    console.log(footer);
    /* triggerに到達したらtoTopのボタンを表示 */
    gsap.fromTo(toTop, {autoAlpha: 0}, {duration: 0.2, autoAlpha:1, scrollTrigger: {
        trigger: trigger,
        toggleActions: 'play none none reverse',
    }})
})
