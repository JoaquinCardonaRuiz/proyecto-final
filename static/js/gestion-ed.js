function getTablaDemandas(id, nombre){
    $.getJSON("/gestion-ed/demandas/"+String(id),function (result){
        // Establezco título
        document.getElementById("headingModal").innerHTML = "Demandas de " + nombre + ".";
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";

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
    })
}

function getTablaSalidas(id, nombre){
    $.getJSON("/gestion-ed/salidas/"+String(id),function (result){
        // Establezco título
        document.getElementById("headingModal").innerHTML = "Salidas de " + nombre + ".";
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";
        document.getElementById("headerRow"). innerHTML="";

        // Creo títulos de columnas
        var headings = ["Artículo","Cantidad","Unidad","Fecha"];
        for (i=0; i < headings.length; i++){
            t = document.createElement("th");
            t.scope = "col";
            t.class = "table-heading";
            t.innerHTML = headings[i];
            document.getElementById("headerRow").appendChild(t);
        }

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

            // Creo celda de fecha
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
    })
}
