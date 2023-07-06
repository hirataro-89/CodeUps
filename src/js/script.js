document.addEventListener('DOMContentLoaded',function(){
    jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


    });


    /* opening animation */
    gsap.utils.toArray('.js-openingImage').forEach((openingImage) => {
        const openingTl = gsap.timeline();
        const openingBody = document.querySelector('.js-opening');
        const openingTitle = document.querySelector('.js-openingTitle');
        // スクロールを無効化
        const handle = (event) => {
            event.preventDefault();
        }
        openingTl
        .add(function() {
            document.addEventListener('touchmove', handle, { passive: false });
            document.addEventListener('mousewheel', handle, { passive: false });
        })
        .fromTo(openingTitle, {autoAlpha: 0, scale: 0.9, y: 30}, {autoAlpha: 1, scale: 1, y: 0, duration: 1})
        .to(openingImage, {y: '0%', duration: 2.5, ease: Power3.easeInOut}, '-=0.3')
        .to(openingBody, {scale: 1.2, autoAlpha: 0, duration: 1}, '+=0.5')
        .add(function() {
            document.removeEventListener('touchmove', handle, { passive: false });
            document.removeEventListener('mousewheel', handle, { passive: false });
        }, '-=0.8')
    })

    /* swiper mainView */
    const mainviewSwiper = new Swiper('.mainViewSwiper', {
        loop: true,
        autoplay: {
            delay: 8000,
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

    /* triggerに到達したらtoTopのボタンを表示 */
    gsap.fromTo(toTop, {autoAlpha: 0}, {duration: 0.2, autoAlpha:1, scrollTrigger: {
        trigger: trigger,
        toggleActions: 'play none none reverse',
    }})

    /* slideImage animation */
    gsap.utils.toArray('.js-slideImage').forEach((slideImage) => {
        let image = slideImage.querySelectorAll('img');
        let Tl = gsap.timeline({scrollTrigger: {
            trigger: slideImage,
            start: 'top 90%',
        }});
        Tl
        .fromTo(slideImage, {autoAlpha: 0, '--toLeft': '100%'}, {autoAlpha: 1, '--toLeft': '0%'})
        .to(image, {clipPath: 'inset(0 0 0 0%)'}, '<')
        .to(slideImage, {'--toRight': '100%'})
    })
})