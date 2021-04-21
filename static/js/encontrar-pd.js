var pr = false;
var id_pr = false;

function disableEnableButton(id, id_array,calle,altura,ciudad,provincia,pais){
    id_pr = id;
    for (var i in id_array){
        if (id_array[i] == id){
            $("#" + String(id_array[i]) + "-pr-card").css("border", "2px solid #95C22B");
        }
        else{
            $("#" + String(id_array[i]) + "-pr-card").css("border", "2px solid transparent");
        }
    }
    if (pr != false){
        $("#payment-button").prop('disabled', false);
    }
    else{
        $("#payment-button").prop('disabled', true);
    }
    actualiza_mapa(calle,altura,ciudad,provincia,pais);
}
function actualiza_mapa(calle,altura,ciudad,provincia,pais){
    direccion = calle + altura + ciudad + provincia + pais;
    encodeURI(direccion);
    src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    $("#gmap_canvas").attr("src",src_value);
}


function changeColor(id){
    $("#" + String(id) + "-img").css("color", "#95C22B");
    $("#" + String(id) + "-desc").css("color", "#95C22B");
}

function restablishColor(id){
    $("#" + String(id) + "-img").css("color", "rgb(192, 192, 192)");
    $("#" + String(id) + "-desc").css("color", "rgb(132,117,167)");
}


function changeColorMat(id){
    $("#" + String(id) + "-img-mat").css("color", "#95C22B");
    $("#" + String(id) + "-desc-mat").css("color", "#95C22B");
}

function restablishColorMat(id){
    $("#" + String(id) + "-img-mat").css("color", "rgb(192, 192, 192)");
    $("#" + String(id) + "-desc-mat").css("color", "rgb(132,117,167)");
}

function openModalHorarios(id, nombre, estado){
    $.getJSON("/gestion-puntos-deposito/horarios/"+String(id),function (result){
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";

        // Establezco título
        document.getElementById("headingModalHorarios").innerHTML = "Horarios de " + nombre;

        if(result.length > 0){
            // Creo títulos de columnas
            var headings = ["Día","Horarios"];
            for (i=0; i < headings.length; i++){
                t = document.createElement("th");
                t.scope = "col";
                t.class = "table-heading";
                t.innerHTML = headings[i];
                document.getElementById("headerRow").appendChild(t);
            }

            // Creo contenido
            for(i=0; i < result.length - 5; i++){
                // Creo celda de día
                headCell = document.createElement("th");
                headCell.scope = "row";
                headCell.innerHTML = result[i]["dia"];
    
                // Creo celda de horarios
                bodyCell1 = document.createElement("td");
                if(result[i]["horaDesde"] == false || result[i]["horaHasta"] == false){
                    bodyCell1.innerHTML = "No abre este día";
                }
                else{
                    bodyCell1.innerHTML = "Desde las " + result[i]["horaDesde"] + " hasta las " + result[i]["horaHasta"];
                }

    
                // Creo fila
                row = document.createElement("tr");
    
                // Agrego celdas a fila
                row.appendChild(headCell); 
                row.appendChild(bodyCell1);

                // Agrego fila a tabla
                document.getElementById("modalTableBody").appendChild(row);
            }
        }
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal").click();
    
    pd_abierto = result[7]
    cant_horas_cierre = result[8]
    fines_semana = result[9]
    toda_semana = result[10]
    horario_apertura = result[11]
    
    //Setea el estado.
    if (estado == "False"){
        $("#estado-apertura-pos").hide()
        $("#cant-horas-cierre-pos").hide();
        $("#estado-apertura-neg").hide()
        $("#cant-horas-cierre-neg").hide();
        $("#open-img").hide();
        $("#close-img").hide();

        $("#estado-apertura-inac").show()
        $("#cant-horas-cierre-neg").show();
        $("#inactive-img").show();
    }
    else if (pd_abierto == true){
        $("#estado-apertura-neg").hide()
        $("#cant-horas-cierre-neg").hide();
        $("#estado-apertura-inac").hide()
        $("#close-img").hide();
        $("#inactive-img").hide();

        $("#estado-apertura-pos").show()
        $("#cant-horas-cierre-pos").text(cant_horas_cierre);
        $("#cant-horas-cierre-pos").show();
        $("#open-img").show();
    }
    else {
        $("#estado-apertura-pos").hide()
        $("#cant-horas-cierre-pos").hide();
        $("#estado-apertura-inac").hide()
        $("#open-img").hide();
        $("#inactive-img").hide();


        $("#estado-apertura-neg").show()
        $("#cant-horas-cierre-neg").show();
        $("#close-img").show();
    }

    //Setea si abre o no los fines de semana.
    if (fines_semana == true){
        $("#fines-semana-pos").show();
        $("#fines-semana-neg").hide();
    }
    else{
        $("#fines-semana-pos").hide();
        $("#fines-semana-neg").show();
    }

    //Setea si abre o no de lunes a viernes.
    if (toda_semana == true){
        $("#toda-semana-pos").show();
        $("#toda-semana-neg").hide();
    }
    else{
        $("#toda-semana-pos").hide();
        $("#toda-semana-neg").show();
    }

    //Setea el horario de apertura.
    if (horario_apertura == false){
        $("#horarios-apertura").text('No abre el día de hoy');
    }
    else if (estado == "False"){
        $("#horarios-apertura").text('No abre mientras esté inactivo');
        }
        else if (pd_abierto == true){
        $("#horarios-apertura").text('Hoy abre ' + horario_apertura[0] + "hs y cierra " + horario_apertura[1] + "hs");
        }
        else{
            $("#horarios-apertura").text('Hoy abrió  ' + horario_apertura[0] + "hs y cerró " + horario_apertura[1] + "hs");
        }
    })
}

function cierraModal(idModal){
    jQuery.noConflict();
    $('#loadingModal').modal('hide');
    $('#' + String(idModal)).modal('hide');
    document.getElementById("loading-modal").click();
}

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
    $("#loadingRow").show();
}

function openModalMateriales(id, nombre){
    $.getJSON("/gestion-puntos-deposito/materiales/"+String(id),function (result){
        
        card = $("#material-card").clone();
        $("#materiales-modal-body").children("#material-card").remove();
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";

        // Establezco título
        document.getElementById("headingModalMat").innerHTML = "Materiales aceptados por " + nombre;
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal-mat").click();

        row = document.getElementById("material-card");
        if (result.length > 0){
            for(i=0; i < result.length ; i++){
                clone = card.clone();
                $("#no-mats").hide();
                if (result[i]["estado"] == "suspendido"){
                    clone.addClass("grey-card");
                    clone.find("#nombre-material").removeClass("material-card-title").addClass("material-card-title-grey");
                    clone.find("#unidad-medida").removeClass("material-card-title").addClass("material-card-title-grey");
                    clone.find("#id-material").removeClass("material-card-title").addClass("material-card-title-grey");
                    clone.find("#material-img").css('background-color',"rgb(165, 165, 165)");
                    clone.attr("data-toggle", "tooltip");
                    clone.attr("data-placement", "right");
                    clone.attr("title", "Los depósitos de este material se encuentran suspendidos");
                }
                else{
                    clone.removeClass("grey-card");
                    clone.find("#material-img").removeClass("gray-mat-img");
                    clone.find("#material-img").css('background-color',result[i]["color"]);
                    clone.find("#nombre-material").removeClass("material-card-title-grey").addClass("material-card-title");
                    clone.find("#unidad-medida").removeClass("material-card-title-grey").addClass("material-card-title");
                    clone.find("#id-material").removeClass("material-card-title-grey").addClass("material-card-title");
                    clone.removeAttr("data-toggle");
                    clone.removeAttr("data-placement");
                    clone.removeAttr("title");
                    
                }
                clone.find("#nombre-material").text(result[i]["nombre"]);
                clone.find("#unidad-medida").text(result[i]["unidadMedida"]); 
                clone.find("#id-material").text(result[i]["id"]);
                clone.find("#material-img").text(result[i]["nombre"][0]);
                clone.show();
                clone.appendTo("#materiales-modal-body");


                
            }
        }
        else{
            clone = card.clone();
            clone.hide();
            $("#no-mats").show();
            clone.appendTo("#materiales-modal-body");
        }
    
    })
}
