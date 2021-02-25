$(document).ready(function () {
    // MDB Lightbox Init
    $(function () {
      $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });
  });




function setTotalVal(priceEP, value, descuento){
    priceEP = priceEP * value * (1-descuento/100);
    $("#total-value").fadeIn();
    $("#total-value").text(priceEP);
    
}

function setMinCantVal(priceEP,value, descuento, stock){
    if (value == "" || value == 0){
        $("#cantProd").val(1);
        priceEP = priceEP * (1-descuento/100);
        $("#total-value").text(priceEP);
    }
    else if (value > stock){
        $("#cantProd").val(stock);
    }
}

function initialValueRound(){
    $("#total-value").text(Math.round(parseFloat($("#total-value").text())));
    $("#product-stock").text(parseFloat($("#product-stock").text()));
    $("#precio-ars").text("$" + parseFloat($("#precio-ars").text()));
    $("#precio-ep").text(Math.round(parseFloat($("#precio-ep").text())));
    $("#ep-savings").text(Math.round(parseFloat($("#ep-savings").text())));
    $("#old-value").text(Math.round(parseFloat($("#old-value").text())))
    $(".product-info").fadeIn();
}

function redirect(url){
    window.location.href = url;
}

function addToCart(){
    $("#add_to_cart").submit();
}

initialValueRound();