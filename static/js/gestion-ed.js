var del = false;
var mod = false;
var tab2loaded = false;
var tab3loaded = false;

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

function openAltaModal(){
    jQuery.noConflict();
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
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

function alta_entidad(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    document.getElementById("row-to-hide-alta").hidden=true;
    $('#primary-btn').prop('disabled', true);
    $('#secondary-btn').prop('disabled', true);
    submitForm('altaEntidadForm');
    nextMsgAlta();
}

function mod_entidad(){
    $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    document.getElementById("row-to-hide-mod").hidden=true;
    $('#mod-name-btn').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);
    submitForm('modEntidadForm');
    nextMsgMod();
}


function baja_demanda(){
    $(".lds-ring div").css("border-color", "#cf4545 transparent transparent transparent");
    $(".lds-ring").show().fadeIn(500);
    $('#bottomBajaDemText').show();
    document.getElementById("hr-to-hide-1").hidden=true;
    document.getElementById("row-to-hide-1").hidden=true;
    document.getElementById("row-to-hide-2").hidden=true;
    document.getElementById("br-to-hide-1").hidden=true;
    document.getElementById("br-to-hide-2").hidden=true;
    $('#del-dem-btn').prop('disabled', true);
    $('#secondary-btn-baja').prop('disabled', true);
    submitForm('bajaDemandaForm');
    nextMsgBajaDem();
}

function alta_demanda(){
    //verificaciones
    //TODO: anotar estas reglas de negocio
    var cantidad = document.getElementById("cantArtInputAdd").value;
    if( cantidad == "" || cantidad == "0"){
        document.getElementById("cantidadError").innerHTML = "La cantidad debe completarse y ser mayor a 0.";
    }
    else{
        $(".lds-ring div").css("border-color", "#95C22B transparent transparent transparent");
        $(".lds-ring").show().fadeIn(500);
        $('#bottomAltaDemText').show();
        document.getElementById("hr-to-hide-2").hidden=true;
        document.getElementById("row-to-hide-3").hidden=true;
        document.getElementById("row-to-hide-4").hidden=true;
        document.getElementById("br-to-hide-3").hidden=true;
        document.getElementById("br-to-hide-4").hidden=true;
        $('#add-dem-btn').prop('disabled', true);
        $('#secondary-btn-baja').prop('disabled', true);
        submitForm('altaDemandaForm');
        nextMsgAltaDem();
    }
}


function nextMsgBaja() {
    if (messagesBaja.length == 1) {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500);

    } else {
        $('#bottomBajaModalText').html(messagesBaja.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgBaja);
    }
};

function nextMsgAlta() {
    if (messagesAlta.length == 1) {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500);

    } else {
        $('#bottomAltaModalText').html(messagesAlta.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgAlta);

    }
};

function nextMsgMod() {
    if (messagesMod.length == 1) {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500);

    } else {
        $('#bottomModModalText').html(messagesMod.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgMod);

    }
};

function nextMsgBajaDem() {
    if (messagesBajaDem.length == 1) {
        $('#bottomBajaDemText').html(messagesBajaDem.pop()).fadeIn(500);

    } else {
        $('#bottomBajaDemText').html(messagesBajaDem.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgBajaDem);
    }
};

function nextMsgAltaDem() {
    if (messagesAltaDem.length == 1) {
        $('#bottomAltaDemText').html(messagesAltaDem.pop()).fadeIn(500);

    } else {
        $('#bottomAltaDemText').html(messagesAltaDem.pop()).fadeIn(500).delay(10000).fadeOut(500, nextMsgAltaDem);
    }
};

var messagesBaja = [
    "Estamos eliminando la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesAlta = [
    "Estamos añadiendo la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesMod = [
    "Estamos modificando la entidad de destino...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesBajaDem = [
    "Estamos eliminando la demanda...",
    "¡Casi listo! Últimos retoques"
].reverse();

var messagesAltaDem = [
    "Estamos creando la demanda...",
    "¡Casi listo! Últimos retoques"
].reverse();


function openEditModal(idEntidad,nombreEntidad){
    jQuery.noConflict();
    tab2loaded = false;
    tab3loaded = false;
    document.getElementById("dd-fill-1").innerHTML="";
    document.getElementById("dd-fill-2").innerHTML="";
    $(".lds-ring").hide();
    document.getElementById('modNombreEntidadError').innerHTML="";
    $('#idEntidad').val(String(idEntidad))
    $('#nombreEntidad').val(String(nombreEntidad));
    document.getElementById("EntNombreInput").value = nombreEntidad;
    $('#editEntidadModal').modal('show');
    $('.nav-tabs a:first').tab('show');
    document.getElementById("mod-name-btn").disabled = true;
    configureModalTab(1);
}

function validaModNombre(nombres){
    var n = document.getElementById("EntNombreInput").value;
    var nombreA = document.getElementById("nombreEntidad").value;
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

function configureModalTab(n){

    if(n == 1){
        document.getElementById("idEntInput").value = document.getElementById("idEntidad").value;
        document.getElementById("mod-name-btn").hidden = false;
        document.getElementById("del-dem-btn").hidden = true;
        document.getElementById("add-dem-btn").hidden = true;
    }

    else if(n == 2){
        document.getElementById("mod-name-btn").hidden = true;
        document.getElementById("del-dem-btn").hidden = false;
        document.getElementById("add-dem-btn").hidden = true;
        document.getElementById("del-dem-btn").disabled = true;
        document.getElementById("nombreArtInput").value = "";
        document.getElementById("cantArtInput").value = "";
        if(!tab2loaded){
            $.getJSON("/gestion-ed/demandas/"+String(document.getElementById("idEntidad").value),function (result){
                if(result.length > 0){
                    for(i=0; i < result.length; i++){
                        var nombre = result[i]["nombre"];
                        var cantidad = result[i]["cantidad"];
                        var idArt = result[i]["idArt"];
                        var l = document.createElement("li");
                        l.className = "dropdown-li";
                        var a = document.createElement("a");
                        a.href = "#";
                        a.innerHTML = result[i]["nombre"];
                        a.className = "dropdown-link";
                        a.setAttribute("onClick", "select_option(\""+nombre+"\",\""+cantidad+"\",\""+idArt+"\");");
                        //a.onclick = select_option(nombre,cantidad,unidad,idArt);
                        l.appendChild(a);
                        document.getElementById("dd-fill-1").appendChild(l);
                    }
                }
                else{
                    var l = document.createElement("li");
                    l.className = "dropdown-li";
                    var a = document.createElement("a");
                    a.href = "#";
                    a.innerHTML = "No hay demandas";
                    a.className = "dropdown-link";
                    l.appendChild(a);
                    document.getElementById("dd-fill-1").appendChild(l);
                }
                
            })
            tab2loaded = true;
        }
        
    }

    else if(n == 3){
        document.getElementById("mod-name-btn").hidden = true;
        document.getElementById("del-dem-btn").hidden = true;
        document.getElementById("add-dem-btn").hidden = false;
        document.getElementById("add-dem-btn").disabled = true;
        document.getElementById("nombreArtInputAdd").value = "";
        document.getElementById("cantArtInputAdd").value = "";
        document.getElementById("cantidadError").innerHTML = "";
        if(!tab3loaded){
            $.getJSON("/gestion-ed/articulos/"+String(document.getElementById("idEntidad").value),function (result){            
                if(result.length > 0){
                    for(i=0; i < result.length; i++){
                        var nombre = result[i]["nombre"];
                        var id = result[i]["id"];
                        var l = document.createElement("li");
                        l.className = "dropdown-li";
                        var a = document.createElement("a");
                        a.href = "#";
                        a.innerHTML = result[i]["nombre"];
                        a.className = "dropdown-link";
                        a.setAttribute("onClick", "select_articulo(\""+nombre+"\",\""+id+"\");");
                        l.appendChild(a);
                        document.getElementById("dd-fill-2").appendChild(l);
                    }
                }
                else{
                    var l = document.createElement("li");
                    l.className = "dropdown-li";
                    var a = document.createElement("a");
                    a.href = "#";
                    a.innerHTML = "No hay articulos";
                    a.className = "dropdown-link";
                    l.appendChild(a);
                    document.getElementById("dd-fill-1").appendChild(l);
                }
                
            })
            tab3loaded = true;
        }
        
    }
}

function select_option(nombre,cantidad,idArt){
    document.getElementById("nombreArtInput").value = nombre;
    document.getElementById("cantArtInput").value = cantidad;
    document.getElementById("idArtInput").value = idArt;
    document.getElementById("idEntInput").value = document.getElementById("idEntidad").value;
    document.getElementById("del-dem-btn").disabled = false;
}

function select_articulo(nombre,id){
    document.getElementById("nombreArtInputAdd").value = nombre;
    document.getElementById("idArtInputAdd").value = id;
    document.getElementById("idEntInputAdd").value = document.getElementById("idEntidad").value;
    document.getElementById("add-dem-btn").disabled = false;
}