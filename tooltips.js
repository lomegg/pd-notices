var noticeManager = {
    /*===============STYLES===============*/
    /* virtual stylesheet due to restricted access to the server. Could be (and should be) transfered to proper css files */
    styles: '#special-notice-container {position:fixed; top:0; left: 0; width: 100%; height: 100%;  background: rgba(0, 0, 0, 0.75); cursor: pointer; z-index:9999999; font-family: "SourceSans";} ' +
    '.special-notice   {position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, 0px); transform: translate(-50%, -50%); text-align: center;  z-index: 999999;}' +
    '.special-notice div {position: relative;display: block;min-width: 400px;box-shadow: rgb(105, 105, 105) 0px -1px 14px -3px inset;font-size: 16px;margin: 0px 0px 10px;padding: 20px 30px 10px;border: 2px solid #266fff;-o-border-image: initial;border-image: initial;border-radius: 5px;background: #fff;}' +
    '.special-notice img.notice-close {position: absolute; right: 5px; top: 5px; height: 20px; opacity: 0.6; -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)"; -webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;float:right;}' +
    '.special-notice img:hover{opacity: 0.9;-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=90)";}' +
    '.special-notice img.main-img{ border: 1px solid #91969f;}' +
    '.special-notice p{font-size: 18px; margin: 0 0 15px 0;}' +
    '.special-notice p.buttons{margin: 20px 0 10px 0;}' +
    '.special-notice a{cursor: pointer;}' +
    '.special-notice button{font-family: "SourceSansSemiBold"; background: #1e58cc; display: inline-block;  height: 40px; margin: 0 10px; padding: 0 15px; text-align: center; color:#fff; border: none; border-radius: 20px;cursor: pointer; opacity:0.9;}' +
    '.special-notice button.grey{ background: #959595;}' +
    '.special-notice button:focus{ outline:none;}' +
    '.special-notice button:hover{ opacity:1;}' +
    '.special-notice.right {left: auto; right: 60px; top: 5px; -webkit-transform: none; transform: none;}' +
    '.special-notice.right:before, .special-notice.right:after { content: ""; position: absolute; top: 15px; right: -20px; border: 10px solid transparent; border-left: 10px solid #35a7ff;}',

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

    /*===============HELPERS===============*/


    /*===============COOKIE OPERATIONS===============*/

    /* check if user is logged in with master password */
    userIsLoggedIn: function (){
        if (readCookie('masterid')){ return true; }
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
    closeNoticeOnOutsideClick: function(){
        // accepts parent '.dropdown' div
        $(document).click(function(event) {
            if(!$(event.target).closest('#special-notice-container').length) {
                if ($('#special-notice-container').length){
                    noticeManager.closeNotice();
                }
            }
        });
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
            "<img class='notice-close' onclick='noticeManager.closeNotice();'  src='/engine/img/chatclose2.png'>" +
            "</div>" +
            "</div>"+
            "</div>";
        return $(block);
    },

    /* show notice in selected lang unless it was already shown, the run its callback */
    publishNotice: function(notice, lang){
        if (!readCookie(notice.cookieName)){
            noticeManager.showNotice(notice.message[lang], notice.duration, notice.specialClass);
            if (notice.callback){
                notice.callback();
            }
        }
    },

    /* append message block to body */
    showNotice: function(message, duration, specialClass){

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
        noticeManager.closeNoticeOnOutsideClick();

        /*if (!noticeManager.userIsLoggedIn()){
            // inject css

        }*/
    },

    // count user deaths and show suggestion on specific counter
     deathTollCheck: function(maxDeathCount){
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
        if ((deathToll >= maxDeathCount) && !readCookie('pushSuggestion')){
            noticeManager.publishNotice(noticeManager.notices.pushSuggestion, settedlang);
            // clear the death toll
            //createCookie('deathToll', 0);
        } else if ((deathToll >= 100 ) && (deathToll % 100) == 0){
            noticeManager.publishNotice(noticeManager.notices.pushSuggestion, settedlang);
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
                ru: "<p>Подпишись на пуш-уведомления от PetriDish и получай безумные бонусы!</p>" +
                    "<img class='main-img' src='https://o-zarabotkeonline.ru/wp-content/uploads/2016/08/nastroyki-formyi-podpiski-na-push.png'" +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">"+
                    "<p class='buttons'>" +
                    "<button " +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">Где моя большая ложка?</button>" +
                    "<button onclick=\'\' class=\'grey\'>Может, потом</button>" +
                    "</p>",
                en: "<p>Subscribe to push notifications from PetriDish and get exclusive content and bonuses!</p>" +
                    "<img class='main-img' src='https://o-zarabotkeonline.ru/wp-content/uploads/2016/08/nastroyki-formyi-podpiski-na-push.png'" +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">"+
                    "<p class='buttons'>" +
                    "<button " +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">Where's my big spoon?</button>" +
                    "<button onclick=\'\' class=\'grey\'>Maybe later</button>" +
                    "</p>",
                fr: "<p>Subscribe to push notifications from PetriDish and get exclusive content and bonuses!</p>" +
                    "<img class='main-img' src='https://o-zarabotkeonline.ru/wp-content/uploads/2016/08/nastroyki-formyi-podpiski-na-push.png'" +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">"+
                    "<p class='buttons'>" +
                    "<button " +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">Where's my big spoon?</button>" +
                    "<button onclick=\'\' class=\'grey\'>Maybe later</button>" +
                    "</p>",
                nl: "<p>Subscribe to push notifications from PetriDish and get exclusive content and bonuses!</p>" +
                    "<img class='main-img' src='https://o-zarabotkeonline.ru/wp-content/uploads/2016/08/nastroyki-formyi-podpiski-na-push.png'" +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">"+
                    "<p class='buttons'>" +
                    "<button " +
                    " onclick=\"window.open('https://push.petridish.pw/?settedLang=" + settedlang.trim() + "', '', 'height=440, width=650, menubar=no, location=no, titlebar=no, status=no, top=200, left=200'); createCookie('pushSuggestion', 'done'); \"" +
                    ">Where's my big spoon?</button>" +
                    "<button onclick=\'\' class=\'grey\'>Maybe later</button>" +
                    "</p>",
                specialClass: null
            }
        }
    }
};


/*===============TRIGGERS===============*/

// init startup sequence, set styles and closing triggers; this one belongs in $(document).load()

$(document).load(function(){
    noticeManager.noticeInitSequence();
});

//close notice by click on anything
$(document).on('click', '#special-notice-container', function(){
    noticeManager.closeNotice();
});


// deathToll check - should be fired after death of the player. Fire with $(document).trigger( "playerDeath" );
$(document).on('playerDeath', function(event){
    noticeManager.deathTollCheck(1);
});


// test triggers
noticeManager.noticeInitSequence();
eraseCookie('pushSuggestion');
$(document).trigger( "playerDeath" );