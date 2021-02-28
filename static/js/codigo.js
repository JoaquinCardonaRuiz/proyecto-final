function validarCodigo(){
    var codigo = document.getElementById("codigoInput").value;
    $.getJSON("/codigo/" + codigo,function (result){
        //devuelve la cantidad de filas afectadas
        //si es 0, el codigo es incorrecto o ya fue utilizado
        //si es 1, el codigo es correcto
        //si es >1, hay codigos repetidos
        //TODO: Aplica lo anterior.
        if (result[0]){
            alert("Se han acreditado " + result[1] + " EcoPuntos.");
        }
        else{
            alert("Código inválido.");
        }
        document.getElementById("codigoInput").value = "";
    });
}