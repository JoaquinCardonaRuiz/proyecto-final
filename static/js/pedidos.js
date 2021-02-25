function update_estado(id,estado){
    document.getElementById("idInput").value = id;
    document.getElementById("estadoInput").value = estado;
    submitForm("modUpdateEstado");
}

function submitForm(n){
    document.getElementById(n).submit();
}