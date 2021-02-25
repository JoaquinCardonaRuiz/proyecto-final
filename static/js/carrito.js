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
}

function setPvalues(value, val_tot_ep, valor_ars, porcentaje_descuento){
    cant_ep = String(Math.round((value) * val_tot_ep /100));
    $("#cantEP").text(cant_ep + " EcoPuntos");
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

setPvalues(0);


window.Mercadopago.setPublishableKey("TEST-1f9985bc-2efd-4040-bb41-59f02bcb3152");


// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'TEST-4010939222425394-022501-29d38812c1457ea41d5d8b6797e42517-320181693'
});

// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: 'Mi producto',
      unit_price: 100,
      quantity: 1,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});