
var preguntasMiCuenta = 4;
var preguntasDep = 5;
var preguntasPed = 6;
var preguntasNiveles = 3;
var preguntasFAQ = 5;

var cantPreguntas = [preguntasMiCuenta, preguntasDep, preguntasPed,preguntasNiveles,preguntasFAQ];
var slidedAns = [false,false,false,false,false]; 

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

setItemColor(1);

function setItemColor(id){
    $(".list-item-pa").css("background-color", "white");
    $(".list-item-pa").css("color", "black");
    $("#item-"+String(id)).css("background-color","#96c42bd2");
    $("#item-"+String(id)).css("color","white");
    selected_option_pa = "item-" + String(id); 
    $(".question-col").hide();
    $("#questions-col-" + String(id)).fadeIn();
}


function slideAnswer(numero,id){
    if (slidedAns[parseInt(id)-1] == numero){
        $("#answer-" + String(numero) + "-" + String(id)).slideUp();
        $("#chevron-faq-" + String(numero) + "-" + String(id)).css({"transform": "rotate(360deg)"});
        $("#question-" + String(numero) + "-" + String(id)).css({"transition" : "color 0.3s ease-in-out","color": "black"});
        

        slidedAns[parseInt(id)-1] = false;
    }
    else{
        for (var i = 1; i <= cantPreguntas[parseInt(id)-1]; i++){
            if (i != numero && slidedAns[parseInt(id)-1] != false){
                $("#chevron-faq-" + String(i) + "-" + String(id)).css({"transform": "rotate(360deg)"});
                $("#question-" + String(i) + "-" + String(id)).css({"transition" : "color 0.3s ease-in-out","color": "black"});
            }
        }
        slidedAns[parseInt(id)-1] = numero;
        $("#answer-1" + "-" + String(id)).slideUp();
        $("#answer-2" + "-" + String(id)).slideUp();
        $("#answer-3" + "-" + String(id)).slideUp();
        $("#answer-4" + "-" + String(id)).slideUp();
        $("#answer-5" + "-" + String(id)).slideUp();
        $("#answer-6" + "-" + String(id)).slideUp();
        $("#chevron-faq-" + String(numero) + "-" + String(id)).css({"transform": "rotate(180deg)"});
        $("#answer-" + String(numero) + "-" + String(id)).slideDown();
        $("#question-" + String(numero) + "-" + String(id)).css({"transition" : "color 0.3s ease-in-out","color": "#95C22B"});
    }
}

function redirectBlank(link){
    window.open(
        link,
        '_blank' // <- This is what makes it open in a new window.
    );
    }