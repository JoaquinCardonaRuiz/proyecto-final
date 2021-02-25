var carrito = true;
var pr = false;

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

function initialRoundValues(){
    $("#precioTotal").text(Math.round(parseFloat($("#precioTotal").text())));
    $("#descuento-total").text(Math.round(parseFloat($("#descuento-total").text())));
    $("#carrito-content").fadeIn();    
}

function setPvalues(value, val_tot_ep, valor_ars, porcentaje_descuento){
    cant_ep = String(Math.round((value) * val_tot_ep /100));
    $("#cantEP").text(cant_ep + " EcoPuntos");
    $("#precioTotal").text(cant_ep);
    
    cant_ars = String(((100-value) * valor_ars/100*(1-porcentaje_descuento/100)).toFixed(2));
    $("#cantMoney").text("$" + cant_ars + " ARS");
    $("#adicional-pesos").text("$" + cant_ars);
    $("#precioTotalARS").text(" +  $" + cant_ars);
}

function validaInput(cantEPusuario, valor_total){
    porcentaje_ep = $("#slideInput").val();
    valor_a_pagar_ep = Math.round(valor_total * porcentaje_ep / 100);
    if (cantEPusuario < valor_a_pagar_ep){
        $("#checkout-button").prop('disabled', true);
        $("#priceError").fadeIn();
    }
    else{
        $("#checkout-button").prop('disabled', false);
        $("#priceError").fadeOut();
    }
}

function changeForm(){
  if(carrito){
    $("#carrito-content").fadeOut();
    $("#punto-retiro-content").fadeIn();
    carrito = false;
    pr = true;
  }
  else{
    $("#punto-retiro-content").fadeOut();
    $("#carrito-content").fadeIn();
    carrito = true;
    pr = false;
  }
}

setPvalues(0);