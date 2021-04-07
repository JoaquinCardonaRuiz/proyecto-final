function openModalMateriales(nom,uM,cant,color){
    var size;
    if(nom.length < 15){
        size = "20px";
    }
    else if(nom.length < 20){
        size = "17px";
    }else if(nom.length < 25){
        size = "15px";
    }
    else{
        size = "13px";
    }
    $("#nombre-material").css("text-align","center");
    $("#nombre-material").css("font-size",size);

    $("#material-img").css("background-color",color);

    document.getElementById("material-img").innerHTML = nom.charAt(0);
    document.getElementById("nombre-material").innerHTML = nom;
    document.getElementById("unidad-medida").innerHTML = uM;
    document.getElementById("cant-material").innerHTML = cant;

    document.getElementById("open-modal-mat").click();
}




function openInfoModal(id){
    $.getJSON("/gestion-depositos/info/"+ String(id),function (result){
        closeLoadingRing();
        deposito = result[0];
        usuario = result[1];
        punto_deposito = result[2];
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal-info").click();
        
        //Seteo valores de Pedido
        $("#idDepositoModal").val(deposito["id"]);
        $("#EPModal").val(deposito["ecoPuntos"]);
        $("#codigoModal").val(deposito["codigo"]);
        $("#fecha_depModal").val(deposito["fechaDeposito"]);

        if(deposito["fechaRegistro"]){
            $("#fecha_regModal").val(deposito["fechaRegistro"]);
            $("#estadoModal").val("Acreditado");
            //Seteo valores Usuario
            $("#IDusuarioModal").val(usuario["id"]);
            $("#nombreCompletoModal").val(usuario["nombre"] + " " + usuario["apellido"]);
            $("#tipoNroDocModal").val(usuario["nroDoc"] + " (" + usuario["tipoDoc"] + ")");
            $("#emailModal").val(usuario["email"]);
            
            document.getElementById("user-section").hidden = false;

        }else{
            $("#fecha_regModal").val("-");
            $("#estadoModal").val("Sin Acreditar");
            document.getElementById("user-section").hidden = true;
        }
        set_ep_logo_pos(deposito["ecoPuntos"]);

        //Seteo valores Punto de Deposito
        $("#idPDModal").val(punto_deposito["id"]);
        $("#nombrePDModal").val(punto_deposito["nombre"]);
        $("#direccionPDModal").val(punto_deposito["calle"] + " " + punto_deposito["altura"]);
        $("#direccionPDModal2").val(punto_deposito["ciudad"] + ", " + punto_deposito["provincia"] + ", " + punto_deposito["pais"]);


    });
    
}function openLoadingRing(){
    jQuery.noConflict();
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}

function closeLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $("#loadingRow").hide();
}



function set_ep_logo_pos(num){
    left_factor = 12 * String(num).length;
    var top_input = document.getElementById("EPModal").offsetTop;
    var left_input = document.getElementById("EPModal").offsetLeft;
    $("#ep-logo-modal-info").css({top: top_input + 11, position:'absolute'});
    $("#ep-logo-modal-info").css({left: left_input + left_factor, position:'absolute'});
}



function update_estado(id,estado){
    if(estado=="cancelado"){
        document.getElementById("idDepInput").value=id;
        document.getElementById("estadoInput").value = estado;
        document.getElementById("idPDInput").value = 0;    
    }
    document.getElementById("estadoForm").submit();
}


function open_cancelar_modal(id){
    document.getElementById("baja-custom-text").innerHTML = "¿Está seguro que desea cancelar este Depósito?";
    document.getElementById("baja-custom-text2").innerHTML = "Esta acción tendrá las siguientes consecuencias:";
    document.getElementById("cons-dep").innerHTML = "El depósito se registrará como cancelado, y no podrá volver a restaurarse.";

    $.getJSON("/gestion-depositos/cancelar/"+ String(id),function (result){
        document.getElementById("cons-ep").hidden = false;
        document.getElementById("br-hide").hidden = false;
        if(result["EP"] == -1){
            document.getElementById("cons-ep").hidden = true;
            document.getElementById("br-hide").hidden = true;
        }
        else if(result["EP"] == 0){
            document.getElementById("cons-ep").innerHTML = "Los EcoPuntos correspondientes al depósito serán restados de los EcoPuntos del usuario."
        }else{
            document.getElementById("cons-ep").innerHTML = "Al usuario le faltan "+result["EP"].toString()+" para poder restar la cantidad de EcoPuntos correspondientes al depósito. Se dejará su balance de EcoPuntos en 0."
        }
        if(result["Stock"] == 0){
            document.getElementById("cons-stock").innerHTML = "El stock correspondiente al depósito será restados del stock del material."
        }else{
            document.getElementById("cons-stock").innerHTML = "Al stock le falta "+result["Stock"].toString()+" unidades para poder restar la cantidad de unidades correspondientes al depósito. Se dejará el stock del material en 0, y se creará una entrada de stock con la cantidad restante para compensar por el stock utilizado."
        }
    
    });


    document.getElementById("open-modal-cancelar").click();
}