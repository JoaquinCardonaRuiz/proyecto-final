var menuShownMod = false;
var selectedOptionsMod = [];

function openMenuMod() {
    $("#menu-option-box-1-mod").fadeIn();
    $(".dropdown-box").css("border","1px solid #95C22B");
    $('#cards-row-materiales-mod').css({"transform":"translateY(200px)"});
    $("#bottomAltaModalTextModPD").css({"transform":"translateY(200px)"});
    $(".margin-row").show();
    $(".margin-row").css({"transform":"translateY(200px)"});
    $("#bottomAltaModalTextModPD").css({"margin-bottom":"25px"});
};


function closeMenuMod() {
    $("#menu-option-box-1-mod").hide();
    $(".dropdown-box").css("border","1px solid rgb(184, 184, 184)");
    $('#cards-row-materiales-mod').css({"transform":"translateY(0px)"});
    $("#bottomAltaModalTextModPD").css({"transform":"translateY(0px)"});
    $("#bottomAltaModalTextModPD").css({"margin-bottom":""});
    $(".margin-row").css({"transform":"translateY(0px)"});
    $(".margin-row").hide();
};

function dropdownOptionSelectMod(idOption, nameOption, color){
    if (selectedOptionsMod.includes(idOption)){
        const index = selectedOptionsMod.indexOf(idOption);
        if (index > -1) {
            selectedOptionsMod.splice(index, 1);
        }
        $("#" + String(nameOption) + "-check-mod").fadeOut();
        $("#" + String(nameOption) + "-card-mod").fadeOut();
    }
    else{
        selectedOptionsMod.push(idOption);
        $("#" + String(nameOption) + "-check-mod").fadeIn();
        setColorMod(nameOption,color);
        $("#" + String(nameOption) + "-card-mod").fadeIn();
    }
    labelShowHideMod();
    $("#materiales-modPD").val("[" + selectedOptionsMod + "]");  
     
}

//Manejo de carteles en la seleccion de materiales del dropdown.
function labelShowHideMod(){
    if (selectedOptionsMod.length == 0){
        $(".indicator-label-2").hide();
        $("#warning-label-modPD").fadeIn(1000);
    }
    else{
        $(".indicator-label-2").show();
        $("#warning-label-modPD").hide();
    }
}

//Setea el color de las tarjetas de materiales.
function setColorMod(nombre,color){
    $("#"+String(nombre)+"-img-mod").css("background-color", String(color));
}

//Cierra el dropdown al clickear fuera de el y su
$(document).on('click', function (e) {
    if ($(e.target).closest("#dropdown-modPD").length === 0) {
        if (menuShownMod == true){
            closeMenuMod();
            headingOptionLeave();
            menuShownMod=false;
        }
    }
});

//Funcion principal de manejo del compartamiento el dropdown.
function dropdownManagerMod(){
    if (menuShownMod == false){
        openMenuMod();
        headingOptionHoverMod();
        menuShownMod = true
    }
    else{
        closeMenuMod();
        headingOptionLeaveMod();
        menuShownMod=false;
    }

}

//Funciones específicas que manejan el dropdwon.
function headingOptionHoverMod(){
    $(".chevron").css({cursor: 'pointer', transform: 'rotate(180deg)'});
}

function headingOptionLeaveMod(){
    $(".chevron").css({transform: 'rotate(0deg)'});
}

function setMaterialesPDvalues(id){
    $.getJSON("/gestion-puntos-deposito/materiales/"+String(id),function (result){
        for (var i in result){
            materiales_PD.push(result[i]["id"]);
            $("#" + result[i]["nombre"] + "-check-mod").show();
            setColorMod(nameOption,color);
            $("#" + result[i]["nombre"] + "-card-mod").show();
        }
        selectedOptionsMod = materiales_PD;
    });
}