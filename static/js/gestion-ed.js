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


function validaNombre(nombres){
    var n = document.getElementById("nombreInput").value;
    if(nombres.includes(n)){
        //Se comprueba regla RN11
        document.getElementById("descuentoNivelError").innerHTML = "* Ese nombre ya ha sido registrado como una entidad de destino.";
        document.getElementsByName("add-btn")[0].disabled = true;
    }
    else if (!n){
        //Se comprueba regla RN12
        document.getElementById("descuentoNivelError").innerHTML = "* Este campo debe ser completado para crear la entidad.";
        document.getElementsByName("add-btn")[0].disabled = true;
    }
    else{
        document.getElementById("descuentoNivelError").innerHTML = "";
        document.getElementsByName("add-btn")[0].disabled = false;
    }
}

function submitForm(n){
    document.getElementById(n).submit();
}