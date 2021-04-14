var idModulos = []

function setUserLabel(val){
    $("#tipo-usuario-sel").text(val);
}

function getModulos(id){
    $("#table-permisos-title").hide();
    $("#permisos-table-disabled").hide();
    $("#permisos-table").hide();
    $("#loading-row-permisos").fadeIn();
    $("#loading-text-permisos").fadeIn();
    if (id == 1){
        $("#loading-row-permisos").hide();
        $("#loading-text-permisos").hide();
        $("#permisos-table").hide();
        $("#table-permisos-title").fadeIn();
        $("#permisos-table-disabled").fadeIn();
    }
    else{
        $.getJSON("/permisos-acceso/modulos/" + String(id),function (modulos){
            for (var i in idModulos){
                if (modulos.includes(idModulos[i])){
                    $("#acceso-" + String(idModulos[i])).prop("checked", true);
                }
                else{
                    $("#acceso-" + String(idModulos[i])).prop("checked", false);
                }
                
            }
            $("#loading-row-permisos").hide();
            $("#loading-text-permisos").hide();
            $("#permisos-table-disabled").hide();
            $("#permisos-table").fadeIn();
            $("#table-permisos-title").fadeIn();

        });
    }   
}

$.getJSON("/permisos-acceso/modulos/all",function (result){
    idModulos = result;
});