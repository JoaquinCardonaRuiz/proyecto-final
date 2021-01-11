
if(parseInt($(window).width()) > 1550){
    $("#page-content-1").css({"margin-top":"40vw"});
}
else{
    $("#page-content-1").css({"margin-top":"32vw"});
}


function animations(){
    //alert(window.scrollY);

    //Animación sección tarjetas
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

    //Animación sección flujo básico
    if(window.scrollY >= 1100){
        $("#start-image-flujo-basico").fadeIn(1000);
        $("#start-image-flujo-basico").css({"transform":"translateX(75px)"});
    }
    else{
        $("#start-image-flujo-basico").css({"transform":"translateX(-75px)"});
        $("#start-image-flujo-basico").fadeOut(500);
    }
    
    //Animación sección plantas
    if(window.scrollY >= 1555){
        $("#start-image-plantas").fadeIn(1000);
        $("#start-image-plantas").css({"transform":"translateX(-50px)"});
    }
    else{
        $("#start-image-plantas").css({"transform":"translateX(50px)"});
        $("#start-image-plantas").fadeOut(500);
    }

    //Animación sección green board
    pi_greenBoard = 1940
    if(window.scrollY >= pi_greenBoard){
        $("#page-content-title-green-board").fadeIn(500);
        $("#page-content-title-green-board").css({"transform":"translateY(-90px)"});
    }
    else{
        $("#page-content-title-green-board").css({"transform":"translateY(90px)"});
        $("#page-content-title-green-board").fadeOut(500);
    
    }

    if(window.scrollY >= pi_greenBoard + 250){
        $("#row-page-content-green-board-1").fadeIn(500);
        $("#row-page-content-green-board-1").css({"transform":"translateX(30px)"});
        if(window.scrollY >= pi_greenBoard + 450){
            $("#row-page-content-green-board-2").fadeIn(500);
            $("#row-page-content-green-board-2").css({"transform":"translateX(-30px)"});
            if(window.scrollY >= pi_greenBoard + 650){
                $("#row-page-content-green-board-3").fadeIn(500);
                $("#row-page-content-green-board-3").css({"transform":"translateX(30px)"});
            }
        }
    }
    else{
        $("#row-page-content-green-board-1").css({"transform":"translateX(-65px)"});
        $("#row-page-content-green-board-1").fadeOut(500);
        $("#row-page-content-green-board-2").css({"transform":"translateX(65px)"});
        $("#row-page-content-green-board-2").fadeOut(500);
        $("#row-page-content-green-board-3").css({"transform":"translateX(-65px)"});
        $("#row-page-content-green-board-3").fadeOut(500);
    
    }
}