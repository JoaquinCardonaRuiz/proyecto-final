var img_hide = false;

$( window ).resize(function() {
    reduceWindow();
});

function reduceWindow(){
    if ($( window ).width() < 800){
        if (img_hide == false){
            $(".img-login").fadeOut();
            $(".login-container").css({"transform":"translateX(-250px)"});
            $("#register-label").css({"transform":"translateX(70px)"});
            $("#register-label").css({"width":"135%"});

            $(".ingresar-label").css({"transform":"translateX(70px)"});

            $(".buttons-container").css({"width":"130%"});
            $(".buttons-container").css({"transform":"translateX(-47.5px)"});
            $(".img-container").css({"transform":"translateX(37.5px)"});
            img_hide = true;
            olvido-password
        }
    }
    else if ($( window ).width() > 800){
        if (img_hide == true){
            $("#register-label").css({"transform":"translateX(0px)"});
            $("#register-label").css({"width":"96%"});
            $(".img-login").fadeIn();
            $(".login-container").css({"transform":"translateX(0px)"});
            $(".img-container").css({"transform":"translateX(0px)"});
            $(".buttons-container").css({"width":"38%"});
            $(".buttons-container").css({"transform":"translateX(0px)"});
            $(".ingresar-label").css({"transform":"translateX(0px)"});


            img_hide = false;
        }
    } 
}

reduceWindow();
