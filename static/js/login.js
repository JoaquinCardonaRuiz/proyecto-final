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
            img_hide = true;
        }
    }
    else if ($( window ).width() > 800){
        if (img_hide == true){
            $(".img-login").fadeIn(1000);
            $(".content-container").css({"transform":"translateX(7rem)"});


            img_hide = false;
        }
    } 
}

reduceWindow();
