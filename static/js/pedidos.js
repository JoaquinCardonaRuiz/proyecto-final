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