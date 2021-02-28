var img_hide = false;
var email = false;
var password = false;
var first_time = true;

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

function submitLogin(){
    if (email && password){
        email_val = $("#email-input").val();
        password_val = $("#password-input").val();
        $("#error-msg-login").hide();

        $("#loadingRowLogin").fadeIn();
        $("#loading-text-login").fadeIn();
        $("#olvido-password").hide();
        $("#start-button").hide();
        $("#email-input-group").hide();
        $("#password-input-group").hide();
        $.getJSON("/login/auth/"+String(email_val)+"/"+String(password_val),function (result){
            if(result["login-state"]){
                window.location.href = "/main";
            }
            else{
                $("#loadingRowLogin").hide();
                $("#loading-text-login").hide();
                $("#error-msg-login").fadeIn();
                $("#olvido-password").fadeIn();
                $("#start-button").fadeIn();
                $("#email-input-group").fadeIn();
                $("#password-input-group").fadeIn();
            }
        });
    }
}

function validateEmail(elementValue){      
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailPattern.test(elementValue)){
        email = true;
    }
    else{
        email = false;
    }
    if (email){
        $("#email-error").fadeOut();
        $("#email-vacio").show();
    }
    else{
        $("#email-error").fadeIn();
        $("#email-vacio").hide();
    }
    if (first_time){
        first_time = false;
    }
    enable_disable_button();
}

function validateEmail2(elementValue){
    if (String(elementValue) == ""){
        email = false;
        enable_disable_button();
    }
    
    if (first_time == false){
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (emailPattern.test(elementValue)){
            email = true;
        }
        else{
            email = false;
        }
        if (email){
            $("#email-error").fadeOut();
            $("#email-vacio").show();
        }
        else{
            $("#email-error").fadeIn();
            $("#email-vacio").hide();
        }
        enable_disable_button();
    }     
    
}

function validateEmail3(elementValue){ 
    alert(elementValue)
    if (elementValue == ""){
        email = true;
    }
    else{
        email = false;
    }
    enable_disable_button();
}

function validaPassword(){
    val = $("#password-input").val();
    if (val == ""){
        password = false;
    }
    else{
        password = true;
    }
    if(password){
        $("#password-error").fadeOut();
        $("#pass-vacio").show();
    }
    else{
        $("#password-error").fadeIn();
        $("#pass-vacio").hide();
    }
    enable_disable_button();
}

function enable_disable_button(){
    if (password && email){
        $("#start-button").css({"background-color":"#95C22B"});
        $("#start-button").css({"border":"1px solid #95C22B"});
    }
    else{
        $("#start-button").css({"background-color":"#d8d9e2"});
        $("#start-button").css({"border":"1px solid #d8d9e2"});
    }
}

$("#start-button").css({"background-color":"#d8d9e2"});
$("#start-button").css({"border":"1px solid #d8d9e2"});