function setID(id, nombre){
    $.getJSON("/gestion-ed/"+String(id),function (result){
        // Establezco título
        document.getElementById("headingModal").innerHTML = "Demandas de " + nombre + ".";
        
        // Borro contenido anterior
        document.getElementById("modalTableBody"). innerHTML="";

        for(i=0; i < result.length; i++){
            // Creo celda de nombre
            headCell = document.createElement("th");
            headCell.scope = "row";
            headCell.innerHTML = result[i]["nombre"];

            // Creo celda de cantidad
            bodyCell = document.createElement("td");
            bodyCell.innerHTML = result[i]["cantidad"];

            // Creo fila
            row = document.createElement("tr");

            // Agrego celdas a fila
            row.appendChild(headCell); 
            row.appendChild(bodyCell);

            // Agrego fila a tabla
            document.getElementById("modalTableBody").appendChild(row);
        }
    })
}
