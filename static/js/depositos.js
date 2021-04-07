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