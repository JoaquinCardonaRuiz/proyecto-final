function redirect(tipoPunto) {
    $("#option1").hide();
    $("#option2").hide();
    $('.heading').hide();
    $(".lds-ring").show();
    $('#loading-text').show();
    if(tipoPunto=='articulos'){
        window.location.href = "/produccion/articulos";
        nextMsgDeposito();

    }
    else if (tipoPunto=='insumos'){
        window.location.href = "/produccion/insumos";
        nextMsgRetiro();
    }
    
}

function nextMsgDeposito() {
    if (messagesDeposito.length == 1) {
        $('#loading-text').html(messagesDeposito.pop()).fadeIn(500);

    } else {
        $('#loading-text').html(messagesDeposito.pop()).fadeIn(500).delay(5000).fadeOut(500, nextMsgDeposito);
    }
};

function nextMsgRetiro() {
    if (messagesRetiro.length == 1) {
        $('#loading-text').html(messagesRetiro.pop()).fadeIn(500);

    } else {
        $('#loading-text').html(messagesRetiro.pop()).fadeIn(500).delay(5000).fadeOut(500, nextMsgRetiro);
    }
};

var messagesDeposito = [
    "Estamos cargando los Artículos",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesRetiro = [
    "Estamos cargando los Insumos",
    "¡Casi listo! Últimos retoques"
].reverse();