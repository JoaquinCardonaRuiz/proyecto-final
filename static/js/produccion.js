var pagina = 1;
var permitir_prod = true;


/* ------------------------------
   INSUMOS
---------------------------------*/
function load_dd_insumos(ids,nombres){
    var select = document.getElementById("nombreInsInput");
    select.innerHTML = "";

    var new_op = document.createElement("option");
    new_op.innerHTML = "-- Por favor, elija un Insumo --";
    new_op.setAttribute("selected", true);
    new_op.setAttribute("disabled", true);
    new_op.setAttribute("value", -1);
    select.appendChild(new_op);

    for(var el in ids){
        var new_op = document.createElement("option");
        new_op.setAttribute("data-tokens", nombres[el]);
        new_op.innerHTML = nombres[el];
        new_op.value = ids[el];
        select.appendChild(new_op);
    }
}


function verificar_prod_ins(){
    var cant = document.getElementById("cantInput").value;
    if(Number(cant) == NaN || Number(cant) <= 0){
        document.getElementById("siguiente-btn").disabled = true;
        document.getElementById("cantError").innerHTML = "* Error";
    }else if(document.getElementById("nombreInsInput").value != -1){
        document.getElementById("cantError").innerHTML = "";
        document.getElementById("siguiente-btn").disabled = false;
    }
}






function fill_materiales_table(){
    permitir_prod = true;
    document.getElementById("insumos-table").innerHTML = "";
    tbody = document.getElementById("insumos-table");
    idIns = document.getElementById("nombreInsInput").value;
    cant = Number(document.getElementById("cantInput").value);
    $.getJSON("/produccion/insumos/"+String(idIns),function (result){
        for(i in result){
            if(i == result.length-1){
                var stock = Number(result[i]["stock"]);
                document.getElementById("ins-nombre").innerHTML = result[i]["nombre"];
                document.getElementById("ins-stock").innerHTML = stock;
                document.getElementById("ins-cant").innerHTML = cant;
                document.getElementById("ins-result").innerHTML = stock+cant;
            }else{
                tr = document.createElement("tr");
                tdNombre = document.createElement("td");
                tdNombre.setAttribute("scope","row");
                tdNombre.innerHTML = result[i]["nombre"];

                var stockActual = Number(result[i]["stock"]);
                var stockUtilizado = Number(cant) * Number(result[i]["cant"]);
                var stockRestante = stockActual - stockUtilizado;
                if(stockRestante < 0){
                    permitir_prod = false;
                }

                tdStockAct = document.createElement("td");
                tdStockAct.setAttribute("scope","row");
                tdStockAct.innerHTML = stockActual;

                tdStockU = document.createElement("td");
                tdStockU.setAttribute("scope","row");
                tdStockU.innerHTML = stockUtilizado;

                tdStockRest = document.createElement("td");
                tdStockRest.setAttribute("scope","row");
                if(stockRestante >= 0){
                    tdStockRest.innerHTML = stockRestante;
                }else{
                    tdStockRest.setAttribute("style","color:#cc0000;");
                    tdStockRest.innerHTML = "No hay stock suficiente";
                }

                tr.appendChild(tdNombre);
                tr.appendChild(tdStockAct);
                tr.appendChild(tdStockU);
                tr.appendChild(tdStockRest);
                document.getElementById("insumos-table").appendChild(tr);                  
            }
        }
        document.getElementById("alta-btn").disabled = !permitir_prod;
        hide_lring();
        document.getElementById("pag2-content").hidden = false;
        document.getElementById("pag3-content").hidden = false;
    });
}





/* ------------------------------
   ARTICULOS
---------------------------------*/

function load_dd_articulos(ids,nombres){
    var select = document.getElementById("nombreArtInput");
    select.innerHTML = "";

    var new_op = document.createElement("option");
    new_op.innerHTML = "-- Por favor, elija un Artículo --";
    new_op.setAttribute("selected", true);
    new_op.setAttribute("disabled", true);
    new_op.setAttribute("value", -1);
    select.appendChild(new_op);

    for(var el in ids){
        var new_op = document.createElement("option");
        new_op.setAttribute("data-tokens", nombres[el]);
        new_op.innerHTML = nombres[el];
        new_op.value = ids[el];
        select.appendChild(new_op);
    }
}


function verificar_prod(){
    var cant = document.getElementById("cantInput").value;
    if(Number(cant) == NaN || Number(cant) <= 0){
        document.getElementById("siguiente-btn").disabled = true;
        document.getElementById("cantError").innerHTML = "* Error";
    }else if(document.getElementById("nombreArtInput").value != -1){
        document.getElementById("cantError").innerHTML = "";
        document.getElementById("siguiente-btn").disabled = false;
    }
}


function fill_insumos_table(){
    permitir_prod = true;
    document.getElementById("insumos-table").innerHTML = "";
    tbody = document.getElementById("insumos-table");
    idArt = document.getElementById("nombreArtInput").value;
    cant = Number(document.getElementById("cantInput").value);
    $.getJSON("/produccion/articulos/"+String(idArt),function (result){
        console.log(result);
        for(i in result){

            if(i == result.length-1){
                var stock = Number(result[i]["stock"]);
                document.getElementById("art-nombre").innerHTML = result[i]["nombre"];
                document.getElementById("art-stock").innerHTML = stock;
                document.getElementById("art-cant").innerHTML = cant;
                document.getElementById("art-result").innerHTML = stock+cant;
            }else{
                tr = document.createElement("tr");
                tdNombre = document.createElement("td");
                tdNombre.setAttribute("scope","row");
                tdNombre.innerHTML = result[i]["nombre"];

                var stockActual = Number(result[i]["stock"]);
                var stockUtilizado = Number(cant) * Number(result[i]["cant"]);
                var stockRestante = stockActual - stockUtilizado;
                if(stockRestante < 0){
                    permitir_prod = false;
                }

                tdStockAct = document.createElement("td");
                tdStockAct.setAttribute("scope","row");
                tdStockAct.innerHTML = stockActual;

                tdStockU = document.createElement("td");
                tdStockU.setAttribute("scope","row");
                tdStockU.innerHTML = stockUtilizado;

                tdStockRest = document.createElement("td");
                tdStockRest.setAttribute("scope","row");
                if(stockRestante >= 0){
                    tdStockRest.innerHTML = stockRestante;
                }else{
                    tdStockRest.setAttribute("style","color:#cc0000;");
                    tdStockRest.innerHTML = "No hay stock suficiente";
                }

                tr.appendChild(tdNombre);
                tr.appendChild(tdStockAct);
                tr.appendChild(tdStockU);
                tr.appendChild(tdStockRest);
                document.getElementById("insumos-table").appendChild(tr);                  
            }
        }
        document.getElementById("alta-btn").disabled = !permitir_prod;
        hide_lring();
        document.getElementById("pag2-content").hidden = false;
        document.getElementById("pag3-content").hidden = false;
    });
}





/* ------------------------------
   GENERAL
---------------------------------*/

function pasar_pagina(n){
    pagina += n;
    cargar_pagina();
}

function cargar_pagina(){
    if(pagina==1){
        document.getElementById("pag1-content").hidden = false;
        document.getElementById("pag1-buttons").hidden = false;
        document.getElementById("pag2-content").hidden = true;
        document.getElementById("pag3-content").hidden = true;
        document.getElementById("pag2-buttons").hidden = true;
    }
    else if(pagina==2){
        fill_table();
        document.getElementById("pag1-content").hidden = true;
        document.getElementById("pag1-buttons").hidden = true;
        document.getElementById("pag2-buttons").hidden = false;
    }
}


function confirmarProd(){
    show_lring();
    document.getElementById("pag1-content").hidden = true;
    document.getElementById("pag1-buttons").hidden = true;
    document.getElementById("pag2-content").hidden = true;
    document.getElementById("pag3-content").hidden = true;
    document.getElementById("pag2-buttons").hidden = true;
    document.getElementById("pag1-content").submit();
}


function fill_table(){
    if(window.location.href.endsWith("/produccion/articulos")){
        fill_insumos_table();
    }else if(window.location.href.endsWith("/produccion/insumos")){
        fill_materiales_table();
    }
}


function show_lring(){
    $("#loadingRow").show();
    $(".lds-ring").show();
}

function hide_lring(){
    $("#loadingRow").hide();
    $(".lds-ring").hide();
}