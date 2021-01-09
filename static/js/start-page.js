
if(parseInt($(window).width()) > 1550){
    $("#page-content-1").css({"margin-top":"40vw"});
}
else{
    $("#page-content-1").css({"margin-top":"32vw"});
}

function animations(){
    if(window.scrollY >= 430){
        $("#start-card1").fadeIn(800);
        $("#start-card2").fadeIn(1300);
        $("#start-card3").fadeIn(1800);


    }
    else{
        $("#start-card1").hide();
        $("#start-card2").hide();
        $("#start-card3").hide();
    }

    if(window.scrollY >= 1100){
        $("#start-image2").fadeIn(1200);
        $("#start-image2").css({"transform":"translateX(-40px)"});
    }
    else{
        $("#start-image2").css({"transform":"translateX(40px)"});
        $("#start-image2").fadeOut(500);
    }
    
}