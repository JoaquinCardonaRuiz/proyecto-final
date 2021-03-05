var carrito = true;
var pr = false;
var id_pr = false;
var cant_ars = false;
var cant_ep = false;


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
    $("#payment-button").prop('disabled', true);
    $("#carrito-content").fadeIn();    
}

function setPvalues(value, val_tot_ep, valor_ars, porcentaje_descuento){
    
    cant_ep = String(Math.round((value) * val_tot_ep /100));
    console.log(cant_ep);
    $("#cantEP").text(cant_ep + " EcoPuntos");
    $("#precioTotal").text(cant_ep);
    
    cant_ars = ((100-value) * valor_ars/100*(1-porcentaje_descuento/100)).toFixed(2);
    if (cant_ars < 0){
        cant_ars = Math.round(cant_ars);
    }
    cant_ars = String(cant_ars)
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
    if (cant_ars == 0){
        $("#payment-button").text("Canjear " + cant_ep + " EcoPuntos");
    }
    else if (cant_ep == 0){
            $("#payment-button").text("Pagar $" + cant_ars);
    }
    else{
        $("#payment-button").text("Pagar $" + cant_ars + " + " + cant_ep + " EcoPuntos");
    }
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

function disableEnableButton(id, id_array,calle,altura,ciudad,provincia,pais){
    id_pr = id;
    for (var i in id_array){
        if (id_array[i] == id){
            $("#" + String(id_array[i]) + "-pr-card").css("border", "2px solid #95C22B");
        }
        else{
            $("#" + String(id_array[i]) + "-pr-card").css("border", "2px solid transparent");
        }
    }
    if (pr != false){
        $("#payment-button").prop('disabled', false);
    }
    else{
        $("#payment-button").prop('disabled', true);
    }
    actualiza_mapa(calle,altura,ciudad,provincia,pais);
}

function actualiza_mapa(calle,altura,ciudad,provincia,pais){
    direccion = calle + altura + ciudad + provincia + pais;
    encodeURI(direccion);
    src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    $("#gmap_canvas").attr("src",src_value);
}


function hacerPedido(){
    $("#punto-retiro-content").fadeOut();
    $(".loading-content").fadeIn();
    nextMsg();
    
    $.getJSON("/eco-tienda/checkout/confirmar/" + String(id_pr) + "/"+ String(cant_ep) + "/" + String(cant_ars) ,function (result){
        jQuery.noConflict();
        alert("Terminé");
        $(".loading-content").fadeOut();
        $("#loading-text").remove();
        if(result["estado"] == "ok"){
            $("#codPedido").text(result["codigo"]);
            $("#cantDias").text(result["demora"]);
            $("#successful-order").fadeIn();
        }
        else if(result["estado"]=="error-stock"){
            $("#error-order-stock").fadeIn();
        }
        else if(result["estado"]=="error-ep"){
            $("#error-order-ep").fadeIn();
        }
    });
}

setPvalues(0);

function nextMsg() {
    if (messages.length == 1) {
        $('#loading-text').html(messages.pop()).fadeIn(300);

    } else {
        $('#loading-text').html(messages.pop()).fadeIn(300).delay(5000).fadeOut(300, nextMsg);
    }
};

var messages = [
    "Estamos registrando tu pedido",
    "Estamos procesando tu pago",
    "Estamos actualizando tus EcoPuntos",
    "¡Casi listo! Últimos retoques"
].reverse();

function ocultaResult(){
    $("#successful-order").hide();
    $("#error-order-stock").hide();
    $("#error-order-ep").hide();
}

