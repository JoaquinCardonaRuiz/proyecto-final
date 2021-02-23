$(document).ready(function () {
    // MDB Lightbox Init
    $(function () {
      $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });
  });


function setPvalues(value){
    $("#cantEP").text(String(value) + " EcoPuntos");
    $("#cantMoney").text("$" + String(100-value) + " ARS");
}

function setTotalVal(priceEP, value, descuento){
    priceEP = priceEP * value * (1-descuento/100);
    $("#total-value").fadeIn();
    $("#total-value").text(priceEP);
    
}

function setMinCantVal(priceEP,value, descuento){
    if (value == "" || value == 0){
        $("#cantProd").val(1);
        priceEP = priceEP * (1-descuento/100);
        $("#total-value").text(priceEP);
    }
}

function initialValueRound(){
    $("#total-value").text(parseFloat($("#total-value").text()));
    $("#product-stock").text(parseFloat($("#product-stock").text()));
    
    $(".product-info").fadeIn();
}

setPvalues(0);
initialValueRound();