function validarCodigo(){
    var codigo = document.getElementById("codigoInput").value;
    $.getJSON("/codigo/" + codigo,function (result){
        //devuelve la cantidad EP acreditados
        //si es -1, el codigo es incorrecto o ya fue utilizado
        if (result >= 0){
            alert("Se han acreditado " + result + " EcoPuntos.");
        }
        else{
            alert("Código inválido.");
        }
        document.getElementById("codigoInput").value = "";
    });
}