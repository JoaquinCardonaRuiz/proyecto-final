var img_hide = false;
var email = true;
var password = true;

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
        $.getJSON("/login/auth/"+String(email_val)+"/"+String(password_val),function (result){
            if(result["login-state"]){
                window.location.href = "/main";
            }
            else{
                console.log(result["login-state"]);
                document.getElementById("email-error").innerHTML = "Usuario o contraseña incorrectos.";
            }
        });
    }
}

reduceWindow();
