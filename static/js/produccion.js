function load_dd_articulos(ids,nombres){
    var select = document.getElementById("nombreArtInput");
    select.innerHTML = "";

    var new_op = document.createElement("option");
    new_op.innerHTML = "-- Por favor, elija un Artículo --";
    new_op.setAttribute("selected", true);
    new_op.setAttribute("disabled", true);
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
        document.getElementById("alta-btn").disabled = true;
        document.getElementById("cantError").innerHTML = "* Error";
    }else{
        document.getElementById("cantError").innerHTML = "";
        document.getElementById("alta-btn").disabled = false;
    }
}