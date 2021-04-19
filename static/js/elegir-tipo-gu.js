function redirectMessage(tipoPunto) {
    $("#option1").hide();
    $("#option2").hide();
    $('.heading').hide();
    $(".lds-ring").show();
    $('#loading-text').show();
    if(tipoPunto=='pa'){
        //window.location.href = "/gestion-puntos-deposito";
        window.location.href = "/permisos-acceso";
        nextMsgDeposito();

    }
    else if (tipoPunto=='au'){
        window.location.href = "/gestion-usuarios";
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
    "Estamos cargando Permisos de Acceso",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesRetiro = [
    "Estamos cargando Administración de Usuarios",
    "¡Casi listo! Últimos retoques"
].reverse();