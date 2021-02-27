function validarCodigo(){
    var codigo = document.getElementById("codigoInput").value;
    $.getJSON("/codigo/" + codigo,function (result){
        //devuelve la cantidad de filas afectadas
        //si es 0, el codigo es incorrecto o ya fue utilizado
        //si es 1, el codigo es correcto
        //si es >1, hay codigos repetidos
        alert("filas de db afectadas: " + result.toString());
        document.getElementById("codigoInput").value = "";
    });
}