function update_estado(id,estado){
    document.getElementById("idInput").value = id;
    document.getElementById("estadoInput").value = estado;
    submitForm("modUpdateEstado");
}

function submitForm(n){
    document.getElementById(n).submit();
}



function openModalMateriales(materiales,cantidades){
    if(materiales.length == 0){
        materiales = [-1];
    }
    $.getJSON("/pedidos/articulos/"+materiales,function (result){
            if(result){
                $("#no-mats").hide();
                card = $("#material-card").clone();
                $("#materiales-modal-body").children("#material-card").remove();
                // Borro contenido anterior
                //document.getElementById("modalTableBody"). innerHTML="";
                //document.getElementById("headerRow").innerHTML ="";

                // Establezco título
                document.getElementById("headingModalMat").innerHTML = "Artículos del pedido";
                document.getElementById("open-loading-modal").click();
                document.getElementById("open-modal-mat").click();

                row = document.getElementById("material-card");
                for(i=0; i < result.length ; i++){
                    clone = card.clone();
                    clone.find("#nombre-material").text(result[i]["nombre"]);
                    var size;
                    if(result[i]["nombre"].length < 15){
                        size = "20px";
                    }
                    else if(result[i]["nombre"].length < 20){
                        size = "17px";
                    }else if(result[i]["nombre"].length < 25){
                        size = "15px";
                    }
                    else{
                        size = "13px";
                    }
                    clone.find("#nombre-material").css("text-align","center");
                    clone.find("#nombre-material").css("font-size",size);
                    clone.find("#unidad-medida").text(result[i]["unidadmedida"]);
                    clone.find("#material-img").text(result[i]["nombre"][0]);
                    clone.find("#cantidad").text(cantidades[i]);
                    clone.show();
                    clone.appendTo("#materiales-modal-body");
            
                }
            }
            else{
                document.getElementById("headingModalMat").innerHTML = "Materiales que componen a " + nombre;
                document.getElementById("open-loading-modal").click();
                document.getElementById("open-modal-mat").click();
                $("#no-mats").show();
            }
    })
}


function openLoadingRing(){
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

function cierraModal(idModal){
    jQuery.noConflict();
    $('#loadingModal').modal("hide");
}

function openInfoModal(id_pedido){
    $.getJSON("/pedidos/info/"+ String(id_pedido),function (result){
        closeLoadingRing();
        pedido = result[0];
        usuario = result[1];
        punto_retiro = result[2];
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal-info").click();
        
        //Seteo valores de Pedido
        $("#idPedidoModal").val(pedido["id"]);
        $("#totalEPModal").val(pedido["totalEP"]);
        $("#totalARSModal").val("$" + pedido["totalARS"]);
        $("#estadoModal").val(pedido["estado"]);
        $("#fecha_encModal").val(pedido["fecha_enc"]);
        $("#fecha_retModal").val(pedido["fecha_ret"]);
        set_ep_logo_pos(pedido["totalEP"]);

        //Seteo valores Usuario
        $("#IDusuarioModal").val(usuario["id"]);
        $("#nombreCompletoModal").val(usuario["nombre"] + " " + usuario["apellido"]);
        $("#tipoNroDocModal").val(usuario["nroDoc"] + " (" + usuario["tipoDoc"] + ")");
        $("#emailModal").val(usuario["email"]);

        //Seteo valores Punto de Retiro
        $("#idPRModal").val(punto_retiro["id"]);
        $("#nombrePRModal").val(punto_retiro["nombre"]);
        $("#direccionPRModal").val(punto_retiro["calle"] + " " + punto_retiro["altura"]);
        $("#direccionPRModal2").val(punto_retiro["ciudad"] + ", " + punto_retiro["provincia"] + ", " + punto_retiro["pais"]);


    });
    
}

function set_ep_logo_pos(num){
    left_factor = 12 * String(num).length;
    var top_input = document.getElementById("totalEPModal").offsetTop;
    var left_input = document.getElementById("totalEPModal").offsetLeft;
    $("#ep-logo-modal-info").css({top: top_input + 11, position:'absolute'});
    $("#ep-logo-modal-info").css({left: left_input + left_factor, position:'absolute'});
}



function openArtModal(idPed){
    document.getElementById("link-art-"+idPed.toString()).click();
}