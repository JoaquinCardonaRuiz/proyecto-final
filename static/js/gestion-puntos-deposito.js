//Variables globales
var del = false;
var mod = false;


//Efecto CSS el botón del extremo derecho de los botones principales del modulo.
$("#option-right").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (del == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Efecto CSS el botón del medio de los botones principales del modulo.
$("#option-middle").hover(function(){
    $(this).css("border", "2px solid #95C22B");
    }, function(){
    if (mod == false){
        $(this).css("border", "2px solid transparent");
    }
  });

//Hace aparecer y desaprecer los iconos para eliminar al lado de cada elemento de la lista.
function removerPunto(){
    if (del == false){
        $('.modify-row').hide()
        $('.modify-th').hide()
        $('.delete-row').fadeIn()
        $('.delete-th').fadeIn()
        del = true;
        mod = false;
        $('#option-middle').css('border', '2px solid transparent');
        $('#option-right').css('border', '2px solid #95C22B');
        var y = window.scrollY + document.querySelector('#table-container').getBoundingClientRect().top; // Y
        var x = window.scrollX + document.querySelector('#table-container').getBoundingClientRect().left; // X
        window.scrollTo(x, y);
        
    }
    else{
        $('.delete-row').fadeOut()
        $('.delete-th').fadeOut()
        del = false;
        $('#option-right').css('border', '2px solid transparent');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

//Hace aparecer y desaprecer los iconos para modificar al lado de cada elemento de la lista.
function modificarPunto(){
    if (mod == false){
        $('.delete-row').hide()
        $('.delete-th').hide()
        $('.modify-row').fadeIn()
        $('.modify-th').fadeIn()
        mod = true;
        del = false;
        $('#option-right').css('border', '2px solid transparent');
        $('#option-middle').css('border', '2px solid #95C22B');
        var y = window.scrollY + document.querySelector('#table-container').getBoundingClientRect().top; // Y
        var x = window.scrollX + document.querySelector('#table-container').getBoundingClientRect().left; // X
        window.scrollTo(x, y);
        
    }
    else{
        $('.modify-row').fadeOut()
        $('.modify-th').fadeOut()
        mod = false;
        $('#option-middle').css('border', '2px solid transparent');
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}

function openModalHorarios(id, nombre){
    $.getJSON("/gestion-puntos-deposito/horarios/"+String(id),function (result){
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";

        // Establezco título
        document.getElementById("headingModal").innerHTML = "Horarios de " + nombre;

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
            for(i=0; i < result.length - 4; i++){
                // Creo celda de día
                headCell = document.createElement("th");
                headCell.scope = "row";
                headCell.innerHTML = result[i]["dia"];
    
                // Creo celda de horarios
                bodyCell1 = document.createElement("td");
                bodyCell1.innerHTML = "Desde las " + result[i]["horaDesde"] + " hasta las " + result[i]["horaHasta"];

    
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

    if (pd_abierto == true){
        $("#estado-apertura-neg").hide()
        $("#cant-horas-cierre-neg").hide();

        $("#estado-apertura-pos").show()
        $("#cant-horas-cierre-pos").text(cant_horas_cierre);
        $("#cant-horas-cierre-pos").show();
    }
    else {
        $("#estado-apertura-pos").hide()
        $("#cant-horas-cierre-pos").hide();

        $("#estado-apertura-neg").show()
        $("#cant-horas-cierre-neg").show();
    }

    
    })
}

function cierraModal(idModal){
    jQuery.noConflict();
    $('#loadingModal').modal('hide');
    $('#loadingModal').hide();
}

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
}
