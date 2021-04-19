var domain = "";
var img_hide = false;


$( window ).resize(function() {
    reduceWindow();
});

$(".content-container").fadeIn();
$(".content-container").css({"transform":"translateX(7rem)"});

function reduceWindow(){
    if($( window ).width() < 1050 && $( window ).width() > 800){
        $(".content-container").css({"transform":"translateX(4rem)"});
    }
    if ($( window ).width() < 800){
        if (img_hide == false){
            $(".img-login").fadeOut();
            $(".content-container").css({"transform":"translateX(-57%)"});
            $("#register-label").css({"width":"130%"});
            $("#register-label").css({"transform":"translateX(-57%)"});
            img_hide = true;
        }
    }
    else if ($( window ).width() > 800){
        if (img_hide == true){
            $(".img-login").fadeIn(1000);
            $(".content-container").css({"transform":"translateX(7rem)"});
            $("#register-label").css({"width":"96%"});
            $("#register-label").css({"transform":"translateX(0%)"});


            img_hide = false;
        }
    } 
}


function setEmail(){
    domain = "";
    add = false;
    email_val = $("#email-direction-label").text();
    for (var i in String(email_val)){
        if (add){
            domain += email_val[i];
        }
        else if (email_val[i] == "@"){
            add = true;
        }
    }
    $("#email-button").text("Ir a " + domain);
}

function redirectBlankES(){
    link = "https://" + domain;
    window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
    );
    }

setEmail();
