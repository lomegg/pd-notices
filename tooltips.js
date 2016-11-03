/*===============STYLES===============*/

/* virtual stylesheet due to restricted access to the server. Could be (and should be) transfered to proper css files */
var styles =    '.special-notice   {position: fixed; top: 20px; left: 50%; -webkit-transform: translate(-50%, 0px); transform: translate(-50%, 0px); display: none; text-align: center;  z-index: 999999;}' +
    '.special-notice div {position: relative;display: block;min-width: 400px;box-shadow: rgb(105, 105, 105) 0px -1px 14px -3px inset;font-size: 16px;margin: 0px 0px 10px;padding: 20px 30px 10px;border: 4px solid #35a7ff;-o-border-image: initial;border-image: initial;border-radius: 15px;background: rgb(238, 255, 239);}' +
    '.special-notice img {position: absolute; right: 28px; top: 25px; height: 20px; opacity: 0.6; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;float:right;margin-top:-23px;margin-right:-25px;}' +
    '.special-notice img:hover{opacity: 0.9;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)";}' +
    '.special-notice p{font-size: 18px; margin: 0 0 5px 0;}' +
    '.special-notice a{cursor: pointer;}' +
    '.special-notice.right {left: auto; right: 60px; top: 5px; -webkit-transform: none; transform: none;}' +
    '.special-notice.right:before, .special-notice.right:after { content: ""; position: absolute; top: 15px; right: -20px; border: 10px solid transparent; border-left: 10px solid #35a7ff;}';

/* add style block with content to the header */
function addStyles(css){
    //var css = 'h1 { background: red; }'
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet){
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
}



/*===============HELPERS===============*/

function showServerSelectScreen(){
    $('#stats,#serverstats').hide();
    $('#statssmall, #helloDialog, #lowerhelp, #descriptionDialog').show();
}


/*===============COOKIE OPERATIONS===============*/

/* set play time and return it */
function addPlayTime(seconds){

    if (!seconds){seconds = 0}

    var countedTime = readCookie('countedPlayTime');

    if (!countedTime){
        countedTime = seconds;
    } else if (seconds > 0) {
        countedTime = parseInt(countedTime) + seconds;
    }

    createCookie('countedPlayTime', countedTime);
    return countedTime;
}

/* total counted play time */
function getPlayTime(){
    var countedTime = readCookie('countedPlayTime');

    if (countedTime){
        return parseInt(countedTime);
    } else {
        return 0;
    }
}

/* check if user is logged in with master password */
function userIsLoggedIn(){
    if (readCookie('masterid')){ return true }
}

/*===============NOTICE MANIPULATIONS===============*/

/* simply close notice */
function closeNotice(){
    $('.special-notice').fadeOut('fast');
    setTimeout(function(){
        $('.special-notice').remove();
        $( document ).trigger( "noticeClose");
    }, 300);
}

/* hide notice block if clicked outside of it */
function closeNoticeOnOutsideClick(){
    // accepts parent '.dropdown' div
    $(document).click(function(event) {
        if(!$(event.target).closest('.special-notice').length) {
            if ($('.special-notice').css('display') !== 'none'){
                closeNotice();
            }
        }
    });
}

/* Close the passed element's parent .special-notice - used to hide notice on X button */
function hideNoticeByChild(el){
    $(el).closest('.special-notice').fadeOut('fast');
}

/* create notice block to show */
function noticeBlockConstructor(message, specialClass){
    // we can pass classes to constructor to alter notice's appearance independently
    if (!specialClass){ specialClass = ''}

    var block = "<div class='special-notice " + specialClass + " '>" +
        "<div>" +
        message +
        "<img class='notice-close' onclick='hideNoticeByChild(this);'  src='/engine/img/chatclose2.png'>" +
        "</div>" +
        "</div>";
    return $(block);
}

/* show notice in selected lang unless it was already shown, the run its callback */
function publishNotice(notice, lang){
    if (!readCookie(notice.cookieName)){
        showNotice(notice.message[lang], notice.duration, notice.specialClass);
        if (notice.callback){
            notice.callback();
        }
    }
}

/* append message block to body */
function showNotice(message, duration, specialClass){

    var block = noticeBlockConstructor(message, specialClass);

    $('body').append(block);
    block.slideDown("fast");

    if (duration){
        setTimeout(function(){
            closeNotice();
        }, duration);

    }
}



/*===============NOTICES===============*/

// invitation to go play some other server after numerous deaths
var noticeDeathSuggestion = {
    callback: function(){
        //createCookie(this.cookieName, 'done');  //uncomment this if this notice needs to be ran only once per user
        eraseCookie('deathToll');
    },
    cookieName: 'deathSuggestion',
    duration: null,
    message: {
        ru: '<p>Перенаселение убивает. Попробуй другой сервер или режим игры!</p><p><button onclick="showServerSelectScreen(); closeNotice()" class="btn btn-primary">Выбрать сервер и режим игры</button></p>',
    specialClass: null
    }
};

// discount banner after a certain amount of game time
var noticeDiscountBanner = {
    callback:  function(){
        createCookie(this.cookieName, 'done');
    },
    cookieName: 'discountBanner',
    duration: null,
    message: {
        ru: '<p>Поздравляем! Вы доигрались до скидки на первое пополнение!</p><p><a href="#"> Здесь будет баннер </a></p>'
    },
    specialClass: null
};

// help button reminder
var noticeHelpButtonReminder = {
    callback: function(){
        createCookie(this.cookieName, 'done');
    },
    cookieName: 'helpButtonReminder',
    duration: 14000,
    message: {
        ru: '<p>Остались вопросы? Жми сюда!</p>'
    },
    specialClass: 'right'
};

// rules introduction
var noticeWelcome = {
    callback: function(){
        createCookie(this.cookieName, 'done');
    },
    cookieName: 'noticeWelcome',
    duration: null,
    message: {
        ru: '<p>Пока тебя не сожрали, запомни простое управление:</p> <p><strong>W</strong> - стрелять </p> <p><strong>ПРОБЕЛ</strong> - разделиться</p>'
    },
    specialClass: null
};



/*===============MAIN FUNCTIONS===============*/

/* Launch startup notice init sequence*/
function noticeInitSequence(){

    if (!userIsLoggedIn()){
        // inject css
        addStyles(styles);


        // check/set tutorialStartTime cookie


        // listen for clicks outside of notice to hide it
        closeNoticeOnOutsideClick();
    }
}

// count user deaths and show suggestion on specific counter
function deathTollCheck(maxDeathCount){
    // don't check for user login as we probably want to suggest to guests, too
    var deathToll;
    // check and increment deathToll, as player just died
    if (readCookie('deathToll')){
        deathToll = parseInt(readCookie('deathToll')) + 1;
    } else {
        deathToll = 1;
    }
    // update the cookie
    createCookie('deathToll', deathToll);

    // if all clear, publish the notice
    if ((deathToll >= maxDeathCount) && !readCookie('deathSuggestion')){
        publishNotice(noticeDeathSuggestion, settedlang);
        // clear the death toll
        createCookie('deathToll', 0);
    }
}

// show banner with a discount link after some time
function discountBannerTimer(seconds, limit){
    addPlayTime(seconds);
    console.log(getPlayTime());
    if (getPlayTime() >= limit){
        publishNotice(noticeDiscountBanner, settedlang);
    }
}

// introduction message followed by help button reminder
function introductionMessage(){
    publishNotice(noticeWelcome, settedlang);

    // when introduction is closed, show help button reminder
    $( document ).one( "noticeClose", function() {
        publishNotice(noticeHelpButtonReminder, settedlang);
    });
}



/*===============TRIGGERS===============*/

// init startup sequence, set styles and closing triggers; this one belongs in $(document).load()
noticeInitSequence();

// run introduction notice: Launch on first game start
introductionMessage();

// deathToll check - should be fired after death of the player. Change the number to desired number of deaths
deathTollCheck(10);

//discount time counter - needs to have passed PLAYTIME in seconds from last round stats (like in stats32.js:380) and total LIMIT in seconds, after which bannerwill be shown
//discountBannerTimer(seconds, limit);
discountBannerTimer(200, 3600);