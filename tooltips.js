var noticeManager = {
    /*===============STYLES===============*/
    /* virtual stylesheet due to restricted access to the server. Could be (and should be) transfered to proper css files */
    styles: '#special-notice-container {position:fixed; top:0; left: 0; width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.75); cursor: pointer; z-index:9999999; font-family: "SourceSans";} ' +
    '.special-notice   { cursor: default; position: absolute; top: 25%; left: 50%; -webkit-transform: translate(-50%, -25%); transform: translate(-50%, -25%); text-align: center;  z-index: 999999;}' +
    '.special-notice > div {position: relative; display: block; min-width: 400px; font-size: 16px;margin: 0px 0px 70px 0;padding: 20px 30px 10px;-o-border-image: initial;border-image: initial;border-radius: 0; background: repeating-linear-gradient(130deg, #ffffff, #ffffff 25px, #f4f4f4 25px, #f4f4f4 50px ); border: dashed 1px grey; outline: 10px solid white;}' +
    '.special-notice h4{margin: 0 0 16px 0; font-size: 20px; text-align: center;} ' +
    '.special-notice img.notice-close {position: absolute; right: 5px; top: 5px; height: 20px; opacity: 0.6; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;float:right;}' +
    '.special-notice.app .close-notice {    color: #b7b7b7; position: absolute; right: 7px; top: 5px; font-size: 12px; cursor: pointer; display: inline-block;}' +
    '.special-notice img:hover{opacity: 0.9;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)";}' +
    '.special-notice img.main-img{ border: 1px solid #91969f;} ' +
    '.special-notice p{font-size: 16px; margin: 0 0 15px 0; text-align: center;} ' +
    '.special-notice .buttons{margin: 25px 0 20px 0; text-align: center;} ' +
    '.special-notice p.remark{margin: 10px 0 0 0; font-size: 14px;} ' +
    '.special-notice p span{ font-weight: bold; margin: 0 0 0 15px;} ' +
    '.special-notice a{cursor: pointer;     color: #0873e8;}' +
    '.special-notice button{ text-transform: none; font-family: "Ubuntu"; background: #ffffff; display: inline-block; height: auto; margin: 0; padding: 5px 15px; text-align: center; color: #0a46ff; cursor: pointer; opacity: 0.9; font-size: 19px;} ' +
    '.special-notice button.refuse{ border: none; color: gray; text-decoration: none; font-size: 17px; background: none;} ' +
    '.special-notice button.accept{background-color: rgb(68, 199, 103); border-radius: 28px; border: 1px solid rgb(24, 171, 41); display: inline-block; cursor: pointer; color: rgb(255, 255, 255); font-family: Arial; font-size: 18px; padding: 5px 35px; text-decoration: none; text-shadow: rgb(47, 102, 39) 0px 1px 0px; margin: 0 0 0 85px; } ' +
    '.special-notice button.grey{ background: #d4d4d4;} ' +
    '.special-notice button.grey{ background: #d4d4d4;} ' +
    '.special-notice button:focus{ outline:none;} ' +
    '.special-notice button:hover{ opacity:1;} ' +
    '.special-notice.right {left: auto; right: 60px; top: 5px; -webkit-transform: none; transform: none;} ' +
    '.special-notice.right:before, .special-notice.right:after { content: ""; position: absolute; top: 15px; right: -20px; border: 10px solid transparent; border-left: 10px solid #35a7ff;} ' +
    '.special-notice .apps-block {  display: inline-block; width: auto; text-align: center; vertical-align: top; margin: 0 10px;} ' +
    '.special-notice > .socialNotice .apps-block { vertical-align: middle;} ' +
    '.special-notice .apps-block.pc { max-width: 200px;} ' +
    '.special-notice .apps-block.pc p{ margin: 10px 0;  font-size: 14px;  line-height: 20px;} ' +
    '.special-notice .apps-block.pc p a{ margin: 0;} ' +
    '.special-notice .apps-block.mobile { margin: 0 20px 0 10px;} ' +
    '.special-notice .apps-item {  display: inline-block;  } ' +
    '.special-notice .apps-item.ios {margin: 0 60px 0 0;} ' +
    '.special-notice .apps-block img{  height:70px; width: auto;} ' +
    '.special-notice .apps-item > a{  display: block;} ' +
    '.special-notice .apps-item > a {    font-weight: bold;  margin: 15px 0 0 0;} ' +
    '.special-notice .apps-block  h5{ font-size: 20px; font-weight: 400; margin: 35px 0 0 0; max-width: 240px; line-height: 26px;} ' +

    '.special-notice > .socialNotice{ padding: 20px;}' +
    '.special-notice .apps-block.updates  h5{ margin: 0 0 5px 0;} ' +
    '.special-notice .apps-block.updates{ max-width: 150px;} ' +
    '.special-notice .apps-block.updates p{ margin: 0;} ' +
    '.special-notice .apps-block.push p{ margin: 0; max-width: 150px;} ' +
    '.special-notice .apps-block  p > a{ margin: 0 5px 0 0;} ' +
    '.special-notice .apps-block  p > span{ margin: 0; position: relative; cursor: pointer;} ' +
    '.special-notice .apps-block  p > span:hover span{ display:block;} ' +
    '.special-notice .apps-block.icons a{ margin: 0 10px 0 0; font-size: 35px; border: 1px solid gainsboro; width: 40px; height: 40px; display: inline-block; border-radius: 5px;} ' +
    '.special-notice .apps-block.icons a.vk { background: #4c75a3;  color: white;}' +
    '.special-notice .apps-block.icons a.fb { background: #3b5998; color: white;}' +
    '.special-notice .apps-block.icons a.tw {color: #1da1f2; margin: 0;}' +
    '.special-notice .apps-block.icons a i{ vertical-align: middle;} ' +

    '.special-notice span.absolute {position: absolute; left: 15px; top: -80px; width: 180px; text-align: center; font-weight: 300!important; background: #f4f4f4; border-radius: 5px; padding: 10px; margin: 0; border: 1px solid #bfbfbf; line-height: 20px; font-size: 15px; display:none;} ',

    /* add style block with content to the header */
    addStyles: function(css){
        var head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet){
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        head.appendChild(style);
    },


    /*===============NOTICE MANIPULATIONS===============*/

    /* simply close notice */
    closeNotice: function(){
        $('#special-notice-container').fadeOut('fast');
        setTimeout(function(){
            $('#special-notice-container').remove();
            $( document ).trigger( "noticeClose");
        }, 300);
    },

    /* hide notice block if clicked outside of it */
    closeNoticeOnOutsideClick: function(element){
        if(!$(element).closest('#special-notice-container div').length) {
                var container = $('#special-notice-container');
                if (container.length){
                    noticeManager.closeNotice();
                    var marker = container.attr('class');
                    noticeManager.yaCounter.triggerEvent(marker);
                }
            }
    },

    /* Close the passed element's parent .special-notice - used to hide notice on X button */
    hideNoticeByChild: function(el){
        $(el).closest('#special-notice-container').fadeOut('fast');
    },

    /* create notice block to show */
    noticeBlockConstructor: {
        push: function(message, specialClass, marker){
            var block =
                "<div id='special-notice-container' class='" + marker + "'>" +
                "<div class='special-notice " + specialClass + " '>" +
                "<div>" +
                message +
                //"<img class='notice-close' onclick='noticeManager.closeNotice();'  src='/engine/img/chatclose2.png'>" +
                "</div>" +
                "</div>"+
                "</div>";
            return $(block);
        },
        app: function(message, specialClass, marker){
            var block =
                "<div id='special-notice-container' class='" + marker + "'>" +
                "<div class='special-notice " + specialClass + "'>" +
                message +
                "</div>" +
                "</div>";
            return $(block);
        },
    },

    /* show notice in selected lang unless it was already shown, the run its callback */
    publishNotice: function(notice, lang){
        // create corresponding cookie
        createCookie(notice.cookieName, 'done');

        // use english lang if needed
        if (lang != 'ru'){ lang = 'en';}

        //logFromSource('cookie not present - publishing notice', notice, lang);
        noticeManager.showNotice(notice.message[lang], notice.duration, notice.specialClass, notice.outsideClickMarker);
        if (notice.callback){
            notice.callback();
        }
    },

    /* append message block to body */
    showNotice: function(message, duration, specialClass, marker){
        logFromSource('showing notice', message, duration, specialClass, marker);

        var block = noticeManager.noticeBlockConstructor[specialClass](message, specialClass, marker);

        $('body').append(block);
        block.slideDown("fast");

        if (duration){
            setTimeout(function(){
                closeNotice();
            }, duration);

        }
    },




    /*===============MAIN FUNCTIONS===============*/

    /* Launch startup init sequence*/
    noticeInitSequence: function(){
        noticeManager.addStyles(noticeManager.styles);
        // listen for clicks outside of notice to hide it

    },

    // count user deaths and show suggestion on specific counter
     deathTollCheck: function(maxDeathCount, increment){
        // don't check for user login as we probably want to suggest to guests, too
        var deathToll;
        increment = increment || false;
        // check and increment deathToll, as player just died
        if (readCookie('deathToll')){
            deathToll = parseInt(readCookie('deathToll')) + (increment ? 1 : 0);
        } else {
            deathToll = increment ? 1 : 0;
        }
        // update the cookie
        createCookie('deathToll', deathToll);
        //logFromSource('Death toll is', deathToll);


        var showing = false;
        // handle pushes
        if (deathToll >= maxDeathCount){
            // check if we have cookie with oneSignalUserId
            if (!readCookie('oneSignalUserId')){
                //console.log('No oneSignalId found, proceeding with pushSuggestion', 'deathToll is', deathToll);
                // check if notice needs publishing and publish it
                if (!readCookie('pushSuggestion') && (deathToll % maxDeathCount == 0)){
                    //console.log('deathToll is ', deathToll, ' pushSuggestion cookie is', readCookie('pushSuggestion'), 'showing push suggestion');
                    //publish notice if it was never shown on number of deaths divisable by maxDeathCount
                    noticeManager.publishNotice(noticeManager.notices.pushSuggestion, settedlang);
                    showing = true;
                } else if (/*(deathToll == maxDeathCount + 50) || */ (deathToll == maxDeathCount + 150) /* || deathToll % (maxDeathCount + 70) == 0*/){
                    //console.log('deathToll is ', deathToll, ' pushSuggestion cookie is', readCookie('pushSuggestion'), 'showing push suggestion');
                    // open suggestion notice
                    noticeManager.publishNotice(noticeManager.notices.pushSuggestion, settedlang);
                    showing = true;
                }
            } else {
                //logFromSource('no need to show anything, we already have id', readCookie('oneSignalUserId'));
            }
        }

        // handle apps invitation
        if (!showing){
            console.log('deathToll is ', deathToll, ' but we not showing other notices, checking appsSuggestion conditions, cookie is ', readCookie('appsSuggestion'));
            if ((!readCookie('appsSuggestion') && deathToll > 60) || (deathToll == 256)){
                noticeManager.publishNotice(noticeManager.notices.appsSuggestion, settedlang);
            }
        }
    },



    /*===============NOTICES===============*/

    notices: {
        // show push suggestion after first death
        pushSuggestion: {
            callback: function(){
                //createCookie(this.cookieName, 'done');  //uncomment this if this notice needs to be ran only once per user
                //eraseCookie('pushSuggestion');
            },
            cookieName: 'pushSuggestion',
            duration: null,
            message: {
                ru: pushTeaserGenerator({
                        title: 'Скины и скидки бесплатно',
                        couponTitle: 'Купон на скидку через <a href="http://donate.petridish.pw/" target="_blank">Oplata.info:</a>',
                        couponCode: 'B9982EC371FF46D6',
                        message: 'Больше — после подписки',
                        okButtonTXT: 'Отказаться',
                        noButtonTXT: 'Войти в элиту',
                        remark: 'Без почты, спама и в 2 клика'
                    }),
                en: pushTeaserGenerator({
                        title: 'Skins & discounts for free',
                        couponTitle: 'Coupon code for <a href="http://donate.petridish.pw/" target="_blank">Oplata.info:</a>',
                        couponCode: 'B9982EC371FF46D6',
                        message: 'Get more after subscription!',
                        okButtonTXT: 'Refuse',
                        noButtonTXT: 'Join the elite',
                        remark: 'No emails, no spam, just 2 clicks'
                    }),
                fr: pushTeaserGenerator({
                        title: 'Skins & discounts for free',
                        couponTitle: 'Coupon code for <a href="http://donate.petridish.pw/" target="_blank">Oplata.info:</a>',
                        couponCode: 'B9982EC371FF46D6',
                        message: 'Get more after subscription!',
                        okButtonTXT: 'Refuse',
                        noButtonTXT: 'Join the elite',
                        remark: 'No emails, no spam, just 2 clicks'
                    }),
                nl: pushTeaserGenerator({
                        title: 'Skins & discounts for free',
                        couponTitle: 'Coupon code for <a href="http://donate.petridish.pw/" target="_blank">Oplata.info:</a>',
                        couponCode: 'B9982EC371FF46D6',
                        message: 'Get more after subscription!',
                        okButtonTXT: 'Refuse',
                        noButtonTXT: 'Join the elite',
                        remark: 'No emails, no spam, just 2 clicks'
                    })
            },
            specialClass: 'push',
            outsideClickMarker: 'push-detimer-out'
        },
        appsSuggestion: {
            callback: function(){
                //createCookie(this.cookieName, 'done');  //uncomment this if this notice needs to be ran only once per user
                //eraseCookie('pushSuggestion');
            },
            cookieName: 'appsSuggestion',
            duration: null,
            message: {
                ru: appsSuggestionGenerator({
                        title: 'Нравится Чашка Петри?',
                        iosAppDownload: 'Скачать приложение для iPad/iPhone',
                        androidDownload: 'Скачать приложение для Android',
                        pcDownload: 'Скачать приложение для ПК',
                        tryOurMobileApps: 'Попробуй наши мобильные приложения!',
                        tryOurPCApp: 'Без лагов и установки',
                        browserSuggestion: 'Предпочитаешь браузер? Попробуй <a href="http://www.opera.com/ru/computer/neon" title="Браузер Opera Neon для Mac и Windows " target=\"_blank\">этот</a>, Petridish работает в нем быстрее всех. Проверено.',
                        updatesAndDiscounts: 'Обновления и скидки',
                        inSocialNetworks: 'в соцсетях',
                        socialVK: 'Группа Petridish.pw Вконтакте',
                        socialFB: 'Группа Petridish.pw на Facebook',
                        socialTW: 'Petridish.pw в Twitter',
                        instantNews: 'Мгновенные уведомления',
                        pushExplanation: 'После подписки в пару кликов вы будете получать уведомления об акциях и бонусах',
                        closeNotice: 'Закрыть'
                    }),
                en: appsSuggestionGenerator({
                        title: 'Like Petridish?',
                        iosAppDownload: 'Download iPad/iPhone app',
                        androidDownload: 'Download Android app',
                        pcDownload: 'Download PC app',
                        tryOurMobileApps: 'Try our mobile apps!',
                        tryOurPCApp: 'No lags, no installation',
                        browserSuggestion: 'Prefer using browser? Try <a href="http://www.opera.com/ru/computer/neon" title="Browser Opera Neon for Mac or Windows " target=\"_blank\">this</a>, less lags. Tested.',
                        updatesAndDiscounts: 'Updates & Discounts',
                        inSocialNetworks: 'in social networks',
                        socialVK: 'Petridish.pw official group on vk.com',
                        socialFB: 'Petridish.pw on Facebook',
                        socialTW: 'Petridish.pw on Twitter',
                        instantNews: 'Instant news',
                        pushExplanation: 'After subscription in just 2 clicks you\'ll be able to receive various bonuses & promotions',
                        closeNotice: 'Close'
                    }),
                fr: '',
                nl: ''
            },
            specialClass: 'app',
            outsideClickMarker: 'out-form-death'
        }
    },

    /***********Yandex counter************/

    yaCounter: {
        triggerEvent: function(marker){
                try {
                    console.log('reaching goal', marker);
                    yaCounter30886916.reachGoal(marker);
                } catch (err) {console.log('Metrica error!', err);}
            }
    }

};

function pushTeaserGenerator(data){
    return  "<h4>" + data.title + "</h4>" +
            "<p>" + data.couponTitle + "<span>" + data.couponCode + "</span>" + "</p>" +
            "<p>" + data.message + "</p>" +
            "<p class='buttons'>" +
            "<button class='refuse'" +
            " onclick=\"noticeManager.closeNotice();noticeManager.yaCounter.triggerEvent('push-detimer-close');\"" +
            ">" + data.okButtonTXT + "</button>" +
            "<button class='accept' onclick=\" pushOpenPopup('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "'); noticeManager.closeNotice(); noticeManager.yaCounter.triggerEvent('push-detimer-open');\" class=\'grey\'>" + data.noButtonTXT + "</button>" +
            "</p>" +
            "<p class='remark'>" + data.remark + "</p>";
}

function appsSuggestionGenerator(data){

    var images =  {
        android: '/form-pics/google-play.jpg',
        pc: '/form-pics/windows.png',
        ios: '/form-pics/itunes.png'
    },
    links = {
        android: 'https://play.google.com/store/apps/details?id=pw.petridish',
        ios: 'https://appsto.re/ca/PZfxkb.i',
        pc: 'http://pc.petridish.pw/get/PetriDishJ.exe',
        opera: 'http://www.opera.com/ru/computer/neon',
        vk: 'https://vk.com/petridish_pw',
        fb: 'https://www.facebook.com/petridish.pw',
        tw: 'https://twitter.com/petridish_pw',
        push: 'https://push.petridish.pw'
    },
    onclick = {
        ios: 'noticeManager.yaCounter.triggerEvent(\'ios-click-form\');',
        android: 'noticeManager.yaCounter.triggerEvent(\'android-click-form\');',
        pc: 'noticeManager.yaCounter.triggerEvent(\'pc-form-click\');',
        vk: 'noticeManager.yaCounter.triggerEvent(\'vk-form-click\');',
        fb: 'noticeManager.yaCounter.triggerEvent(\'fb-form-click\');',
        tw: 'noticeManager.yaCounter.triggerEvent(\'tw-form-click\');',
        push: 'pushOpenPopup(\'https://push.petridish.pw/?settedLang=' + settedlang.trim() + '\');  noticeManager.yaCounter.triggerEvent(\'push-detimer-open\');',
        close: 'noticeManager.closeNotice();noticeManager.yaCounter.triggerEvent(\'out-form-death\');'
    };

    return  "<div>" +
                "<h4>" + data.title + "</h4>" +
                "<div class='close-notice' onclick=\"" + onclick.close + "\" >" + data.closeNotice + "</div>" +
                "<div class='mobile apps-block'>" +
                    "<div class='apps-item ios'>" +
                        "<a href='" + links.ios + "' title='" + data.iosAppDownload + "' onclick=\"" + onclick.ios + "\" target=\"_blank\">" +
                            "<img src='" + images.ios + "' title='" + data.iosAppDownload + "'>" +
                        "</a>" +
                        "<a href='" + links.ios + "' title='" + data.iosAppDownload + "' class='app-link' onclick=\"" + onclick.ios + "\" target=\"_blank\">Iphone / Ipad</a>" +
                    "</div>" +

                    "<div class='apps-item android'>" +
                        "<a href='" + links.android + "' title='" + data.androidDownload + "' onclick=\"" + onclick.android + "\" target=\"_blank\">" +
                            "<img src='" + images.android + "' title='" + data.androidDownload + "'>" +
                        "</a>" +
                        "<a href='" + links.android + "' title='" + data.androidDownload + "' class='app-link' onclick=\"" + onclick.android + "\" target=\"_blank\">Android</a>" +
                    "</div>" +
                    "<h5>" + data.tryOurMobileApps + "</h5>" +
                "</div>" +

                "<div class='pc apps-block'>" +
                    "<div class='apps-item'>" +
                        "<a href='" + links.pc + "' title='" + data.pcDownload + "' onclick=\"" + onclick.pc + "\" target=\"_blank\">" +
                            "<img src='" + images.pc + "' title='" + data.pcDownload + "'>" +
                        "</a>" +
                        "<a href='" + links.pc + "' title='" + data.pcDownload + "' class='app-link' onclick=\"" + onclick.pc + "\" target=\"_blank\">Windows</a>" +
                        "<p>" + data.tryOurPCApp + "</p>" +
                        "<p>" + data.browserSuggestion + "</p>" +
                    "</div>" +
                "</div>" +
            "</div>" +

            "<div class='socialNotice'>" +
                "<div class='apps-block updates'>" +
                    "<h5>" + data.updatesAndDiscounts + "</h5>" +
                    "<p>" + data.inSocialNetworks + "</p>" +
                "</div>" +
                "<div class='apps-block icons'>" +
                    "<a class='vk' href='" + links.vk + "' title='" + data.socialVK + "' onclick=\"" + onclick.vk + "\" target=\"_blank\">" +
                        "<i class=\"mdi mdi-vk\"></i>" +
                    "</a>" +
                    "<a class='fb' href='" + links.fb + "' title='" + data.socialFB + "' onclick=\"" + onclick.fb + "\" target=\"_blank\">" +
                        "<i class=\"mdi mdi-facebook\"></i>" +
                    "</a>" +
                    "<a class='tw' href='" + links.tw + "' title='" + data.socialTW + "' onclick=\"" + onclick.tw + "\" target=\"_blank\">" +
                        "<i class=\"mdi mdi-twitter\"></i>" +
                    "</a>" +
                "</div>" +
                "<div class='apps-block push'>" +
                    "<p><a href=\" javascript:void(0)\" onclick=\"" + onclick.push + "\">" + data.instantNews + "</a>(<span class='pushExplanation'>?<span class='absolute'>" + data.pushExplanation + "</span></span>)</p>" +
                "</div>" +
            "</div>";
}

/*===============OPEN POPUP URL=================*/

// Create iframe with proper params
var pushCreateHiddenDomIframe = function (url, name) {
    var node = document.createElement("iframe");
    node.style.display = "none";

    node.setAttribute('sandbox', "allow-same-origin allow-scripts allow-popups allow-forms");
    if (!url) {
        url = 'about:blank';
    }
    node.src = url;
    if (name) {
        node.name = name;
    }
    document.body.appendChild(node);
    return node;
};

// Calculate the optimal position and open popup there
var pushOpenPopup = function(url) {
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var thisWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var thisHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        // You can set the dimensions of the popup to be whatever you'd like
        var childWidth = 650;
        var childHeight = 440;
        var left = ((thisWidth / 2) - (childWidth / 2)) + dualScreenLeft;
        var top = ((thisHeight / 2) - (childHeight / 2)) + dualScreenTop;
        window.open(url, "Petridish.pw - Push Subscription", 'scrollbars=yes, width=' + childWidth + ', height=' + childHeight + ', top=' + top + ', left=' + left);
};

// Main push runner
function pushLoadIframeAndSubscriptionStates(showSuggestion) {
    var isSubscribedToOneSignal = false;
    var oneSignalUserId = null;
    var savedTags = null;

    var iframeUrl = 'https://push.petridish.pw/iframe.html?ver=1.25';
    var popupUrl = 'https://push.petridish.pw/index.html?origin=' + location.origin;
    var iframeOrigin = new URL(iframeUrl).origin;
    var iframe = pushCreateHiddenDomIframe(iframeUrl);

    iframe.onload = function() {
        //logFromSource('iFrame @ ' + iframe.src + ' finished loading.');
        iframe.contentWindow.postMessage({
            command: 'query'
        }, iframeOrigin);

        function receiveMessage(event) {

            if (event.data.command === 'reply') {
                var results = event.data.extra;
                isSubscribedToOneSignal = results[0];
                oneSignalUserId = results[1];

                // Dispatch the done event
                window.dispatchEvent(new CustomEvent('iframeinitialize', {
                    detail: {
                        subscribed: results[0],
                        oneSignalUserId: results[1]
                    }}));

            }
        }

        window.addEventListener("message", receiveMessage, false);


        // After the iframe has sent us the user's subscription state, saved tags, and user ID
        // We can decide how to prompt the user


        window.addEventListener('iframeinitialize', function(e) {
            // e.detail = {subscribed: Boolean, oneSignalUserId: undefined / String}

            //logFromSource('iframe initialized', e.detail);
            if (!e.detail.subscribed) {
                // show user invitation window every 20 deaths
                if (!readCookie('pushSuggestion') && showSuggestion){
                    //this func runs on init, so we'll need to specifically state if we want to deathTollCheck on this stage
                    noticeManager.deathTollCheck(8);
                } else {
                    //logFromSource('pushSuggestion cookie found, we already offered sub.');
                    //noticeManager.deathTollCheck(20);
                }

            } else if (e.detail.oneSignalUserId){
                var userId = e.detail.oneSignalUserId;
                // update user session
                pushAJAXreq('https://ytktpmcerfe1mtn1kz.petridish.pw/api/update_push_session', {pushId: userId }, function(success){
                    //logFromSource('Successfully updated session');
                    if (!readCookie('oneSignalUserId')){
                        //logFromSource('no oneSignalUserId cookie found, creating');
                        createCookie('oneSignalUserId', userId);
                    } else {
                        //logFromSource('oneSignalUserId cookie already present');
                    }
                }, function(fail){
                    //logFromSource('Failed to update session');
                }) ;}
        }, false);


    };
}



/*==============SERVICE=================*/


function pushAJAXreq(url, data, callback, errorCallback){
    $.ajax({
        type: 'GET',
        async: true,
        url: url,
        dataType: 'json',
        data: data
    }).done(function (returnedData) {
        if (callback){
            callback(returnedData);
        }
    }).error(function(error, data) {
        if (data){
            console.warn('error data', error, data);
        }
        if (errorCallback){
            errorCallback(data);
        }
    });
}



function logFromSource() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(location.href + ':');
    console.log.apply(console, args);
}


// function to close the window and call the metric
function pushDelayOnEscape(){
    if ($('#special-notice-container').length){
        $('#special-notice-container').remove();
        noticeManager.yaCounter.triggerEvent('push-detimer-out');
    }

}


/*===============TRIGGERS===============*/

// init startup sequence, set styles and closing triggers; this one belongs in $(document).load()

$(document).load(function(){
    noticeManager.noticeInitSequence();
    if (readCookie('oneSignalUserId')){
        // update session with present id
        pushAJAXreq('https://ytktpmcerfe1mtn1kz.petridish.pw/api/update_push_session', {pushId: readCookie('oneSignalUserId') }, function(success){
            //logFromSource('Successfully updated session');
        }, function(fail){
            //logFromSource('Failed to update session');
        });
    } else{
        // run all the stuff
        pushLoadIframeAndSubscriptionStates(false);
    }
});

//close notice by click on anything
$(document).on('click', '#special-notice-container', function(e){
    noticeManager.closeNoticeOnOutsideClick(e.target);
    //noticeManager.closeNotice();
});


// deathToll check - should be fired after death of the player. Fire with $(document).trigger( "playerDeath" );
$(document).on('playerDeath', function(event){
    noticeManager.deathTollCheck(8, true);
});


//$(document).trigger( "playerDeath" );   // this one belongs to death event


/*=============TEST TRIGGERS============*/

noticeManager.noticeInitSequence();
/*
eraseCookie('pushSuggestion');
eraseCookie('oneSignalUserId');
*/
//pushLoadIframeAndSubscriptionStates();    // this one belongs to document load

/*
noticeManager.noticeInitSequence();
if (readCookie('oneSignalUserId')){
    //logFromSource('Id found in cookie', readCookie('oneSignalUserId'));
        // update session with present id
        pushAJAXreq('https://ytktpmcerfe1mtn1kz.petridish.pw/api/update_push_session', {pushId: readCookie('oneSignalUserId') }, function(success){
            //('Successfully updated session');
        }, function(fail){
            //logFromSource('Failed to update session');
        });
    } else{
        //logFromSource('Id not found in cookie');
        // run all the stuff
        pushLoadIframeAndSubscriptionStates();
    }

    */
