document.addEventListener('DOMContentLoaded',function(){
    jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

        /* modal */
        $('.js-modal__trigger > img').click(function() {
            let src = $(this).attr('src');
            $(body).css('overflow-y', 'hidden')
            $('.js-modal').fadeIn();
            $('.js-modal__image > img').attr('src', src);
        })

        $('.js-modal, .js-modal__image > img').click(function(e) {
            //モーダルをクリックすると閉じる
            $(body).css('overflow-y', 'auto')
            $('.js-modal').fadeOut();
        })

        /* タブメニュー */
        //任意のタブにURLからリンクするための設定
        function GethashID (hashIDName){
            if(hashIDName){
                //タブ設定
                $('.js-tab li').find('a').each(function() { //タブ内のaタグ全てを取得
                    var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得
                    if(idName == hashIDName){ //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
                        var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
                        $('.js-tab li').removeClass("is-active"); //タブ内のliについているactiveクラスを取り除き
                        $(parentElm).addClass("is-active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
                        //表示させるエリア設定
                        $(".js-tabMenu").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
                        $(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
                    }
                });
            }
        }

        //タブをクリックしたら
        $('.js-tab a').on('click', function() {
            var idName = $(this).attr('href'); //タブ内のリンク名を取得
            GethashID (idName);//設定したタブの読み込みと
            return false;//aタグを無効にする
        });


        // 上記の動きをページが読み込まれたらすぐに動かす
        $(window).on('load', function () {
            $('.js-tab li:first-of-type').addClass("is-active"); //最初のliにactiveクラスを追加
            $('.js-tabMenu:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
            var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
            GethashID (hashName);//設定したタブの読み込み
        });

        /* accordiong blog-archive */
        $(function() {
            $('.js-accordionItem:first-of-type .js-accordionContents').css('display', 'block');
            $('.js-accordionItem:first-of-type .js-accordionTrigger').addClass('is-open');
            $('.js-accordionTrigger').on('click', function() {
                $(this).next().slideToggle(400);
                $(this).toggleClass('is-open', 400);
            });
        });

        /* accordiong faq */
        $(function() {
            $('.js-faq:first-of-type .js-faqContents').css('display', 'block');
            $('.js-faq:first-of-type .js-faqIcon').addClass('is-open');
            $('.js-faqTrigger').on('click', function() {
                $(this).next().slideToggle(400);
                $(this).children('.js-faqIcon').toggleClass('is-open', 400);
            });
        });

        /* contact form */
        $('#form').submit(function (event) {
            var formData = $('#form').serialize();
            if (
                $('#form input[type="text"]').val() !== "" &&
                $('#form input[type="email"]').val() !== "" &&
                $('#form input[type="checkbox"]').val() !== "" &&
                $('#form').prop('checked') === true
            ) {
                $.ajax({
                    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSesb19wEo6UAarKohTwEdeozorvVF_ZvGRpKxk2B6W4vkjKqQ/formResponse",
                    data: formData,
                    type: "POST",
                    dataType: "xml",
                    statusCode: {
                        0: function () {
                            $("#form").fadeOut();
                            $(".js-thanks").fadeIn();
                        },
                }});
                event.preventDefault();
            } else {
                $('.form__error').addClass('is-error');
            }
        });
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
    const mainviewSwiper = new Swiper('.js-mainViewSwiper', {
        loop: true,
        autoplay: {
            delay: 7000,
        },
        effect: 'fade',
        speed: 900
    });

    /* swiper campaig */
    const campaignSwiper = new Swiper('.js-campaignSwiper__slider', {
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