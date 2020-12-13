function redirect(tipoPunto) {
    if(tipoPunto=='deposito'){
        window.location.href = "/gestion-puntos-deposito";
    }
    else if (tipoPunto=='retiro'){
        window.location.href = "/gestion-puntos-retiro";
    }
}