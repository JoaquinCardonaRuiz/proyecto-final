function changeColors(id){
    $("#trash-item-carrito-" + String(id)).css({"color":"rgb(230 24 24)"});
}

function returnColors(id){
    $("#trash-item-carrito-" + String(id)).css({"color":""});
}

function changeColorsInfo(id){
    $("#info-item-carrito-" + String(id)).css({"color":"#95C22B"});
}

function returnColorsInfo(id){
    $("#info-item-carrito-" + String(id)).css({"color":""});
}

function removeFromCart(id){
    $("#idEliminacion").val(id);
    $("#remove_from_cart").submit();
}