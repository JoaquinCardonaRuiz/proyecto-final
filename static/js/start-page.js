if(parseInt($(window).width()) > 1550){
    $("#page-content-1").css({"margin-top":"40vw"});
    $("#page-content-plantas").css({"margin-left":"20%"});
    $("#page-content-plantas").css({"margin-right":"15%"});
}
else{
    $("#page-content-1").css({"margin-top":"32vw"});
    $("#page-content-plantas").css({"margin-left":"15%"});
    $("#page-content-plantas").css({"margin-right":"13%"});


}

//Acomoda los textos en base a la posición de los circulos.
function orderCirclesText(){
    var pos_circulo_1 = document.getElementById("circle1").offsetTop;
    $("#circle-title-1").css({top: pos_circulo_1, position:'absolute'});
    $("#desc-1-circles").css({top: pos_circulo_1 + 35, position:'absolute'});

    var pos_circulo_2 = document.getElementById("circle2").offsetTop;
    $("#circle-title-2").css({top: pos_circulo_2, position:'absolute'});
    $("#desc-2-circles").css({top: pos_circulo_2 + 35, position:'absolute'});


    var pos_circulo_3 = document.getElementById("circle3").offsetTop;
    $("#circle-title-3").css({top: pos_circulo_3, position:'absolute'});
    $("#desc-3-circles").css({top: pos_circulo_3 + 35, position:'absolute'});


    var pos_circulo_4 = document.getElementById("circle4").offsetTop;
    $("#circle-title-4").css({top: pos_circulo_4, position:'absolute'});
    $("#desc-4-circles").css({top: pos_circulo_4 + 35, position:'absolute'});
}




var circleFilled = false;

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

function fillCircles(numero){
    numero = parseInt(numero);
    if (circleFilled != numero){
        if (circleFilled == 1){
            $("#circle1").css({"background":"transparent"});
            $("#circle-image-1-w").hide();
            $("#circle-image-1").show();
        }
        else if (circleFilled == 2){
            $("#circle2").css({"background":"transparent"});
            $("#circle-image-2-w").hide();
            $("#circle-image-2").show();
        }
        else if (circleFilled == 3){
            $("#circle3").css({"background":"transparent"});
            $("#circle-image-3-w").hide();
            $("#circle-image-3").show();
        }
        else if (circleFilled == 4){
            $("#circle4").css({"background":"transparent"});
            $("#circle-image-4-w").hide();
            $("#circle-image-4").show();
        }
       
        
        
        $("#circle" + String(numero)).css({"background":"#95C22B"});
        $("#circle-image-" + String(numero) + "").hide();
        $("#circle-image-" + String(numero) + "-w").fadeIn();
        $("#circle" + String(numero)).fadeIn();
    }
    circleFilled = numero;
}

fillCircles(1);
orderCirclesText();