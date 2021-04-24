var circleFilled = false;


//Acomoda los margenes en base al tamaño de pantalla. Se llama también cada vez que hay un resize.
function setMarings(){
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

//Maneja las animaciones que dependen de la posición de pantalla de todas las secciones del Landing page
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
    if(window.scrollY >= 2450){
        $("#start-image-plantas").fadeIn(1000);
        $("#start-image-plantas").css({"transform":"translateX(-50px)"});
    }
    else{
        $("#start-image-plantas").css({"transform":"translateX(50px)"});
        $("#start-image-plantas").fadeOut(500);
    }

    //Animación sección green board
    pi_greenBoard = 2850
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
            if(window.scrollY >= pi_greenBoard + 680){
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

    //Anumación TOP 5 preguntas
    first_question_pi = 3900;
    if(window.scrollY >= first_question_pi){
        $("#question-row-1").fadeIn(300);
        $("#question-row-1").css({"transform":"translate(-1%)"});
        if (window.scrollY >= first_question_pi + 75){
            $("#question-row-2").fadeIn(300);
            $("#question-row-2").css({"transform":"translate(-1%)"});
            if (window.scrollY >= first_question_pi + 175){
                $("#question-row-3").fadeIn(300);
                $("#question-row-3").css({"transform":"translate(-1%)"});
                if (window.scrollY >= first_question_pi + 230){
                    $("#question-row-4").fadeIn(300);
                    $("#question-row-4").css({"transform":"translate(-1%)"});
                    if (window.scrollY >= first_question_pi + 260){
                        $("#question-row-5").fadeIn(300);
                        $("#question-row-5").css({"transform":"translate(-1%)"});
                    }
                }
            }
        }
    }
    else{
        $("#question-row-1").css({"transform":"translate(-10%)"});
        $("#question-row-1").fadeOut(500);
        $("#answer-1").fadeOut(500);
        $("#question-1").css({"transition" : "color 0.3s ease-in-out","color": "black"});


        $("#question-row-2").css({"transform":"translate(-10%)"});
        $("#question-row-2").fadeOut(500);
        $("#answer-2").fadeOut(500);
        $("#question-2").css({"transition" : "color 0.3s ease-in-out","color": "black"});

        $("#question-row-3").css({"transform":"translate(-10%)"});
        $("#question-row-3").fadeOut(500);
        $("#answer-3").fadeOut(500);
        $("#question-3").css({"transition" : "color 0.3s ease-in-out","color": "black"});

        $("#question-row-4").css({"transform":"translate(-10%)"});
        $("#question-row-4").fadeOut(500);
        $("#answer-4").fadeOut(500);
        $("#question-4").css({"transition" : "color 0.3s ease-in-out","color": "black"});

        $("#question-row-5").css({"transform":"translate(-10%)"});
        $("#question-row-5").fadeOut(500);
        $("#answer-5").fadeOut(500);
        $("#question-5").css({"transition" : "color 0.3s ease-in-out","color": "black"});

    }

    //Animación sección top 5 preguntaas
    if(window.scrollY >= 3950){
        $("#question-img").fadeIn(1000);
        $("#question-img").css({"transform":"translateX(0px)"});
    }
    else{
        $("#question-img").css({"transform":"translateX(-150px)"});
        $("#question-img").fadeOut(500);
    }
}

//Cambia las las imagenes y los colores de los circulos en la sección de circulos verdes.
function fillCircles(numero){
    numero = parseInt(numero);
    if (circleFilled != numero){
        if (circleFilled == 1){
            $("#circle1").css({"background":"transparent"});
            $("#circle-image-1-w").hide();
            $("#circle-image-1").show();
            $("#devices-img-1").hide();
        }
        else if (circleFilled == 2){
            $("#circle2").css({"background":"transparent"});
            $("#circle-image-2-w").hide();
            $("#circle-image-2").show();
            $("#devices-img-2").hide();
        }
        else if (circleFilled == 3){
            $("#circle3").css({"background":"transparent"});
            $("#circle-image-3-w").hide();
            $("#circle-image-3").show();
            $("#devices-img-3").hide();
        }
        else if (circleFilled == 4){
            $("#circle4").css({"background":"transparent"});
            $("#circle-image-4-w").hide();
            $("#circle-image-4").show();
            $("#devices-img-4").hide();
        }
        
        $("#circle" + String(numero)).css({"background":"#95C22B"});
        $("#circle-image-" + String(numero) + "").hide();
        $("#circle-image-" + String(numero) + "-w").fadeIn();
        $("#circle" + String(numero)).fadeIn();
        $("#devices-img-" + String(numero)).show();
    }
    circleFilled = numero;
}

//Animaciones de las preguntas sección top 5 preguntas
slidedAns = false; 
function slideAnswer(numero){
    if (slidedAns == numero){
        $("#answer-" + String(numero)).slideUp();
        $("#chevron-faq-" + String(numero)).css({"transform": "rotate(360deg)"});
        $("#question-" + String(numero)).css({"transition" : "color 0.3s ease-in-out","color": "black"});
        

        slidedAns = false;
    }
    else{
        for (var i = 1; i < 6; i++){
            if (i != numero && slidedAns != false){
                $("#chevron-faq-" + String(i)).css({"transform": "rotate(360deg)"});
                $("#question-" + String(i)).css({"transition" : "color 0.3s ease-in-out","color": "black"});
            }
        }
        slidedAns = numero;
        $("#answer-1").slideUp();
        $("#answer-2").slideUp();
        $("#answer-3").slideUp();
        $("#answer-4").slideUp();
        $("#answer-5").slideUp();
        $("#chevron-faq-" + String(numero)).css({"transform": "rotate(180deg)"});
        $("#answer-" + String(numero)).slideDown();
        $("#question-" + String(numero)).css({"transition" : "color 0.3s ease-in-out","color": "#95C22B"});
    }
}

//Animación chevron (rota 180 grados cuando se abre el dropdown de la opción "Info" del menú principal)
function headingOptionHover(){
    $(".chevron").css({cursor: 'pointer', transform: 'rotate(180deg)'});
}

//Animación chevron (vuelve a su posición original)
function headingOptionLeave(){
    $(".chevron").css({transform: 'rotate(0deg)'});
}

//Abre el dropdown de la opción "Info" del menú principal
function openMenu() {
    $("#menu-option-box-1").show();
};

//Cierra el dropdown de la opción "Info" del menú principal
function closeMenu() {
    $("#menu-option-box-1").hide();
};

//Animacion seccion graduados (hover)
function graduadosIn() {
    $(".card-graduados-title").css({"transition" : "color 0.5s ease-in-out","color": "#95C22B"});
    $(".card-graduados-title-2").css({"transition" : "color 0.5s ease-in-out","color": "#95C22B"});
    $(".card-graduados-title-3").css({"transition" : "color 0.5s ease-in-out","color": "#95C22B"});
    $("#card-graduados").css({"transition":"background-color 1s ease-in-out", "background-color":"#f9f4ff", "transition":"width 1.1s, height 1.1s, transform 1.1s", "transform":"translateY(-15px)"})

}

//Animación sección graduados (not hover)
function graduadosOut() {
    $(".card-graduados-title").css({"transition" : "color 0.3s ease-in-out","color": "black"});
    $(".card-graduados-title-2").css({"transition" : "color 0.3s ease-in-out","color": "black"});
    $(".card-graduados-title-3").css({"transition" : "color 0.3s ease-in-out","color": "black"});
    $("#card-graduados").css({"transition":"background-color 1s ease-in-out", "background-color":"white", "transition":"width 1.1s, height 1.1s, transform 1.1s", "transform":"translateY(15px)"})
}

//Redirige al url que recibe como parámetro.
function redirect(link){
    window.location.href = link;
}

//Redirige al url que recibe como parámetro en una nueva pestaña.
function redirectBlank(link){
window.open(
    link,
    '_blank' // <- This is what makes it open in a new window.
);
}

$( window ).resize(function() {
    setMarings();
    if ($( window ).width() < 1170){
        $("#start-image-plantas").css({"margin-top":"15%"});
        $("#start-image-flujo-basico").css({"margin-top":"10%"});
    }
    else{
        $("#start-image-plantas").css({"margin-top":"0%"});
        $("#start-image-flujo-basico").css({"margin-top":"0%"});

    }
});



fillCircles(1);
orderCirclesText();
setMarings();

