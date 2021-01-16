var del = false;
var mod = false;

function openLoadingRing(){
    document.getElementById("open-loading-modal").click();
    $(".lds-ring").hide();
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show();
}



function getTablaDemandas(id, nombre){
    $.getJSON("/gestion-ed/demandas/"+String(id),function (result){

        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";
        document.getElementById("msj-empty").hidden = true;

        // Establezco título
        document.getElementById("headingModal").innerHTML = "Demandas de " + nombre;

        if(result.length > 0){
            // Creo títulos de columnas
            var headings = ["Artículo","Cantidad","Unidad"];
            for (i=0; i < headings.length; i++){
                t = document.createElement("th");
                t.scope = "col";
                t.class = "table-heading";
                t.innerHTML = headings[i];
                document.getElementById("headerRow").appendChild(t);
            }

            // Creo contenido
            for(i=0; i < result.length; i++){
                // Creo celda de nombre
                headCell = document.createElement("th");
                headCell.scope = "row";
                headCell.innerHTML = result[i]["nombre"];
    
                // Creo celda de cantidad
                bodyCell1 = document.createElement("td");
                bodyCell1.innerHTML = result[i]["cantidad"];
    
                // Creo celda de unidad
                bodyCell2 = document.createElement("td");
                bodyCell2.innerHTML = result[i]["unidadmedida"];
    
                // Creo fila
                row = document.createElement("tr");
    
                // Agrego celdas a fila
                row.appendChild(headCell); 
                row.appendChild(bodyCell1);
                row.appendChild(bodyCell2);
    
                // Agrego fila a tabla
                document.getElementById("modalTableBody").appendChild(row);
            }
        }
        else{
            document.getElementById("empty-content").innerHTML = "No hay demandas"
            document.getElementById("msj-empty").hidden = false;
        }
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal").click();
        
    })
}



function getTablaSalidas(id, nombre){
    $.getJSON("/gestion-ed/salidas/"+String(id),function (result){

        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow").innerHTML ="";
        document.getElementById("msj-empty").hidden = true;

        // Establezco título
        document.getElementById("headingModal").innerHTML = "Salidas de " + nombre;

        if(result.length > 0){
            // Creo títulos de columnas
            var headings = ["Artículo","Cantidad","Unidad","Fecha"];
            for (i=0; i < headings.length; i++){
                t = document.createElement("th");
                t.scope = "col";
                t.class = "table-heading";
                t.innerHTML = headings[i];
                document.getElementById("headerRow").appendChild(t);
            }

            // Creo contenido
            for(i=0; i < result.length; i++){
                // Creo celda de nombre
                headCell = document.createElement("th");
                headCell.scope = "row";
                headCell.innerHTML = result[i]["nombre"];
    
                // Creo celda de cantidad
                bodyCell1 = document.createElement("td");
                bodyCell1.innerHTML = result[i]["cantidad"];
    
                // Creo celda de fecha
                bodyCell2 = document.createElement("td");
                bodyCell2.innerHTML = result[i]["unidadmedida"];

                // Creo celda de unidad
                bodyCell3 = document.createElement("td");
                bodyCell3.innerHTML = result[i]["fecha"];
    
                // Creo fila
                row = document.createElement("tr");
    
                // Agrego celdas a fila
                row.appendChild(headCell); 
                row.appendChild(bodyCell1);
                row.appendChild(bodyCell2);
                row.appendChild(bodyCell3);
    
                // Agrego fila a tabla
                document.getElementById("modalTableBody").appendChild(row);
            }
        }
        else{
            document.getElementById("empty-content").innerHTML = "No hay salidas"
            document.getElementById("msj-empty").hidden = false;
        }
        document.getElementById("open-loading-modal").click();
        document.getElementById("open-modal").click();
        
    })
}


function validaNuevoNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(nombres.includes(n)){
        //Se comprueba regla RN11
        document.getElementById("nombreEntidadError").innerHTML = "* Ese nombre ya ha sido registrado como una entidad de destino.";
        document.getElementsByName("add-btn")[0].disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN12
        document.getElementById("nombreEntidadError").innerHTML = "* Este campo debe ser completado para crear la entidad.";
        document.getElementsByName("add-btn")[0].disabled = true;
    }
    else{
        document.getElementById("nombreEntidadError").innerHTML = "";
        document.getElementsByName("add-btn")[0].disabled = false;
    }
}

function submitForm(n){
    document.getElementById(n).submit();
}

function modifyEntidad(){
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

function removeEntidad(){
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

//Abre el Modal de baja. 
function openBajaModal(idEntidad){
    //Manejo de elementos de carga
    $("#fieldsRowBaja").show();
    $(".lds-ring").hide();
    $('#bottomBajaModalText').hide();
    $('#primary-btn-alert').prop('disabled', false);
    $('#secondary-btn-baja').prop('disabled', false);

    //Manejo de carteles
    jQuery.noConflict();
    $('#primary-btn-alert').prop('disabled', false); 
    $('#idEntidad').val(String(idEntidad));
    $('#bajaEntidadModal').modal('show');
}

function baja_entidad(){

    //Manejo de elementos para la carga
    $(".b-modal-text-baja").hide();
    $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#bottomBajaModalText').show();
    $('#primary-btn-alert').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);

    //Manejo de datos
    id = $('#idEntidad').val();
    window.location.href='/gestion-ed/baja/' + String(id)

    //Funcion que va cambiando los mensajes de carga.
    nextMsgBaja()
}

function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgBaja);
    }
};


var messagesBaja = [
    "Estamos eliminando la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();


function openEditModal(idEntidad,nombreEntidad){
    jQuery.noConflict();
    $(".lds-ring").hide();
    $('#idEntidad').val(String(idEntidad))
    $('#nombreEntidad').val(String(nombreEntidad));
    document.getElementById("EntNombreInput").value = nombreEntidad;
    $('#editEntidadModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    document.getElementById("mod-name-btn").disabled = true;
}

function validaModNombre(nombres){
    var n = document.getElementById("EntNombreInput").value;
    var nombreA = document.getElementById("nombreEntidad").value;
    console.log(n);
    console.log(nombreA);
    if(n == nombreA){
        document.getElementById("modNombreEntidadError").innerHTML = "* El nombre de la entidad debe ser distinto a su nombre anterior.";
        document.getElementById("mod-name-btn").disabled = true;
    }
    else if(nombres.includes(n)){
        //Se comprueba regla RN11
        document.getElementById("modNombreEntidadError").innerHTML = "* Ese nombre ya ha sido registrado como una entidad de destino.";
        document.getElementById("mod-name-btn").disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN12
        document.getElementById("modNombreEntidadError").innerHTML = "* Este campo debe ser completado para modificar la entidad.";
        document.getElementById("mod-name-btn").disabled = true;
    }
    else{
        document.getElementById("modNombreEntidadError").innerHTML = "";
        document.getElementById("mod-name-btn").disabled = false;
    }
}