document.addEventListener('DOMContentLoaded',function(){
    jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる


    });


    /* opening animation */
    gsap.utils.toArray('.js-curtain').forEach((openingCurtain) => {
        const openingTl = gsap.timeline();
        const openingTitle = document.querySelector('.js-openingTitle');
        const header = document.querySelector('.js-header');
        const mainTitle = document.querySelector('.js-mainTitle');
        const openingBody = document.querySelector('.js-opening');

        // スクロールを無効化
        const handle = (event) => {
            event.preventDefault();
        }
        gsap.set(header, {y: '-100%'})
        gsap.set(mainTitle, {y: 30, autoAlpha: 0})


        openingTl
        .add(function() {
            document.addEventListener('touchmove', handle, { passive: false });
            document.addEventListener('mousewheel', handle, { passive: false });
        })
        .fromTo(openingTitle, {autoAlpha: 0, y: 30}, {autoAlpha: 1, y: 0})
        .to(openingTitle, {autoAlpha: 0, duration:1})
        .to(openingCurtain, {y: '-100%', duration: 2.5, ease: Power3.easeInOut}, '-=0.5')
        .to(openingBody, {autoAlpha: 0})
        .to(header, {y: '0%', ease: Power2.easeIn},'-=1')
        .to(mainTitle, {autoAlpha: 1, y: 0}, '<')
        .add(function() {
            document.removeEventListener('touchmove', handle, { passive: true });
            document.removeEventListener('mousewheel', handle, { passive: true });
        }, '<')
    });

    /* drower */
    const drawer = document.querySelector('.js-drawer')
    const spMenu = document.querySelectorAll(
        '.js-drawer, .js-header, .js-nav'
    );
    const body =document.querySelector('body');
    drawer.addEventListener('click', function (e) {
        e.stopPropagation()
        spMenu.forEach(element => {
            element.classList.toggle('is-open')
        });
        body.classList.toggle('is-open');
    });
    /* 領域外をクリックすると閉じる */
    document.addEventListener('click', function (e) {
        if (!drawer.contains(e.target)) {
                spMenu.forEach(element => {
                element.classList.remove('is-open')
            });
        };
    });

    /* swiper mainView */
    const mainviewSwiper = new Swiper('.mainViewSwiper', {
        loop: true,
        autoplay: {
            delay: 7000,
        },
        effect: 'fade',
        speed: 900
    });

    /* swiper campaig */
    const campaignSwiper = new Swiper('.campaignSwiper__slider', {
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

    // /* toTop */
    let toTop = document.querySelector('.js-toTop');
    let trigger = document.querySelector('.js-toTopTrigger');

    /* triggerに到達したらtoTopのボタンを表示 */
    gsap.fromTo(toTop, {autoAlpha: 0}, {duration: 0.2, autoAlpha:1, scrollTrigger: {
        trigger: trigger,
        toggleActions: 'play none none reverse',
    }});

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
    });
})