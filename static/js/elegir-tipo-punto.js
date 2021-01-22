function redirect(tipoPunto) {
    $("#option1").hide();
    $("#option2").hide();
    $('.heading').hide();
    $(".lds-ring").show();
    $('#loading-text').show();
    if(tipoPunto=='deposito'){
        //window.location.href = "/gestion-puntos-deposito";
        window.location.href = "/gestion-niveles";
        nextMsgDeposito();

    }
    else if (tipoPunto=='retiro'){
        window.location.href = "/gestion-puntos-retiro";
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
    "Estamos cargando Puntos de Depósito",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesRetiro = [
    "Estamos cargando Puntos de Retiro",
    "¡Casi listo! Últimos retoques"
].reverse();