var noticeManager = {
    /*===============STYLES===============*/
    /* virtual stylesheet due to restricted access to the server. Could be (and should be) transfered to proper css files */
    styles: '#special-notice-container {position:fixed; top:0; left: 0; width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.75); cursor: pointer; z-index:9999999; font-family: "SourceSans";} ' +
    '.special-notice   { cursor: default; position: absolute; top: 25%; left: 50%; -webkit-transform: translate(-50%, 0px); transform: translate(-50%, -50%); text-align: center;  z-index: 999999;}' +
    '.special-notice div {position: relative; display: block; min-width: 400px; font-size: 16px;margin: 0px 0px 10px;padding: 20px 30px 10px;-o-border-image: initial;border-image: initial;border-radius: 0; background: repeating-linear-gradient(130deg, #ffffff, #ffffff 25px, #f4f4f4 25px, #f4f4f4 50px ); border: dashed 1px grey; outline: 10px solid white;}' +
    '.special-notice h4{margin: 0 0 16px 0; font-size: 20px; text-align: center;} ' +
    '.special-notice img.notice-close {position: absolute; right: 5px; top: 5px; height: 20px; opacity: 0.6; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;float:right;}' +
    '.special-notice img:hover{opacity: 0.9;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)";}' +
    '.special-notice img.main-img{ border: 1px solid #91969f;} ' +
    '.special-notice p{font-size: 16px; margin: 0 0 15px 0; text-align: center;} ' +
    '.special-notice p.buttons{margin: 25px 0 20px 0; text-align: center;} ' +
    '.special-notice p.remark{margin: 10px 0 0 0; font-size: 14px;} ' +
    '.special-notice p span{ font-weight: bold; margin: 0 0 0 15px;} ' +
    '.special-notice a{cursor: pointer;}' +
    '.special-notice button{ text-transform: none; font-family: "Ubuntu"; background: #ffffff; display: inline-block; height: auto; margin: 0; padding: 5px 15px; text-align: center; color: #0a46ff; cursor: pointer; opacity: 0.9; font-size: 19px;} ' +
    '.special-notice button.refuse{ border: none; color: gray; text-decoration: none; font-size: 17px; background: none;} ' +
    '.special-notice button.accept{background-color: rgb(68, 199, 103); border-radius: 28px; border: 1px solid rgb(24, 171, 41); display: inline-block; cursor: pointer; color: rgb(255, 255, 255); font-family: Arial; font-size: 18px; padding: 5px 35px; text-decoration: none; text-shadow: rgb(47, 102, 39) 0px 1px 0px; margin: 0 0 0 85px; } ' +
    '.special-notice button.grey{ background: #d4d4d4;} ' +
    '.special-notice button.grey{ background: #d4d4d4;} ' +
    '.special-notice button:focus{ outline:none;} ' +
    '.special-notice button:hover{ opacity:1;} ' +
    '.special-notice.right {left: auto; right: 60px; top: 5px; -webkit-transform: none; transform: none;} ' +
    '.special-notice.right:before, .special-notice.right:after { content: ""; position: absolute; top: 15px; right: -20px; border: 10px solid transparent; border-left: 10px solid #35a7ff;} ',

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
        yaCounter30886916.reachGoal('push-detimer-out');
        createCookie('pushSuggestion', 'done');
        $('#special-notice-container').fadeOut('fast');
        setTimeout(function(){
            $('#special-notice-container').remove();
            $( document ).trigger( "noticeClose");
        }, 300);
    },

    /* hide notice block if clicked outside of it */
    closeNoticeOnOutsideClick: function(element){
        if(!$(element).closest('#special-notice-container div').length) {
                if ($('#special-notice-container').length){
                    noticeManager.closeNotice();
                }
            }
    },

    /* Close the passed element's parent .special-notice - used to hide notice on X button */
    hideNoticeByChild: function(el){
        $(el).closest('#special-notice-container').fadeOut('fast');
    },

    /* create notice block to show */
    noticeBlockConstructor: function(message, specialClass){
        // we can pass classes to constructor to alter notice's appearance independently
        if (!specialClass){ specialClass = '';}

        var block =
            "<div id='special-notice-container'>" +
            "<div class='special-notice " + specialClass + " '>" +
            "<div>" +
            message +
            //"<img class='notice-close' onclick='noticeManager.closeNotice();'  src='/engine/img/chatclose2.png'>" +
            "</div>" +
            "</div>"+
            "</div>";
        return $(block);
    },

    /* show notice in selected lang unless it was already shown, the run its callback */
    publishNotice: function(notice, lang){
        
        //logFromSource('cookie not present - publishing notice', notice, lang);
        noticeManager.showNotice(notice.message[lang], notice.duration, notice.specialClass);
        if (notice.callback){
            notice.callback();
        }
    },

    /* append message block to body */
    showNotice: function(message, duration, specialClass){
        //logFromSource('showing notice', message, duration, specialClass);

        var block = noticeManager.noticeBlockConstructor(message, specialClass);

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

        if (deathToll >= maxDeathCount){
            // check if we have cookie with oneSignalUserId
            if (!readCookie('oneSignalUserId')){
                // check if notice needs publishing and publish it
                if (!readCookie('pushSuggestion') && (deathToll % maxDeathCount == 0)){
                    //publish notice if it was never shown on number of deaths divisable by maxDeathCount
                    noticeManager.publishNotice(noticeManager.notices.pushSuggestion, settedlang);
                }
                if ((deathToll == maxDeathCount + 20) || (deathToll == maxDeathCount + 70) || deathToll % (maxDeathCount + 70) == 0){
                    
                    // open suggestion notice
                    noticeManager.publishNotice(noticeManager.notices.pushSuggestion, settedlang);    
                }
            } else {
                //logFromSource('no need to show anything, we already have id', readCookie('oneSignalUserId'));
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
                        couponTitle: 'Купон на скидку:',
                        couponCode: '43563456345',
                        message: 'Больше — после подписки',
                        okButtonTXT: 'Отказаться',
                        noButtonTXT: 'Войти в элиту',
                        remark: 'Без почты, спама и в 2 клика'
                    }),
                en: pushTeaserGenerator({
                        title: 'Skins & discounts for free',
                        couponTitle: 'Coupon code:',
                        couponCode: '43563456345',
                        message: 'Get more after subscription!',
                        okButtonTXT: 'Refuse',
                        noButtonTXT: 'Join the elite',
                        remark: 'No emails, no spam, just 2 clicks'
                    }),
                fr: pushTeaserGenerator({
                        title: 'Skins & discounts for free',
                        couponTitle: 'Coupon code:',
                        couponCode: '43563456345',
                        message: 'Get more after subscription!',
                        okButtonTXT: 'Refuse',
                        noButtonTXT: 'Join the elite',
                        remark: 'No emails, no spam, just 2 clicks'
                    }),
                nl: pushTeaserGenerator({
                        title: 'Skins & discounts for free',
                        couponTitle: 'Coupon code:',
                        couponCode: '43563456345',
                        message: 'Get more after subscription!',
                        okButtonTXT: 'Refuse',
                        noButtonTXT: 'Join the elite',
                        remark: 'No emails, no spam, just 2 clicks'
                    }),
                specialClass: null
            }
        }
    }
};

function pushTeaserGenerator(data){
            return  "<h4>" + data.title + "</h4>" +
                    "<p>" + data.couponTitle + "<span>" + data.couponCode + "</span>" + "</p>" +
                    "<p>" + data.message + "</p>" +
                    "<p class='buttons'>" +
                    "<button class='refuse'" +
                    " onclick=\"yaCounter30886916.reachGoal('push-detimer-close');noticeManager.closeNotice();\"" +
                    ">" + data.okButtonTXT + "</button>" +
                    "<button class='accept' onclick=\" pushOpenPopup('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "'); yaCounter30886916.reachGoal('push-detimer-open'); noticeManager.closeNotice();\" class=\'grey\'>" + data.noButtonTXT + "</button>" +
                    "</p>" +
                    "<p class='remark'>" + data.remark + "</p>";
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
        yaCounter30886916.reachGoal('push-detimer-out');
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

//noticeManager.noticeInitSequence();
/*
eraseCookie('pushSuggestion');
eraseCookie('oneSignalUserId');
*/
//pushLoadIframeAndSubscriptionStates();    // this one belongs to document load

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