var pr = false;
var id_pr = false;

function disableEnableButton(id, id_array,calle,altura,ciudad,provincia,pais){
    id_pr = id;
    for (var i in id_array){
        if (id_array[i] == id){
            $("#" + String(id_array[i]) + "-pr-card").css("border", "2px solid #95C22B");
        }
        else{
            $("#" + String(id_array[i]) + "-pr-card").css("border", "2px solid transparent");
        }
    }
    if (pr != false){
        $("#payment-button").prop('disabled', false);
    }
    else{
        $("#payment-button").prop('disabled', true);
    }
    actualiza_mapa(calle,altura,ciudad,provincia,pais);
}
function actualiza_mapa(calle,altura,ciudad,provincia,pais){
    direccion = calle + altura + ciudad + provincia + pais;
    encodeURI(direccion);
    src_value = "https://maps.google.com/maps?q=" + direccion + "&t=&z=15&ie=UTF8&iwloc=&output=embed";
    $("#gmap_canvas").attr("src",src_value);
}