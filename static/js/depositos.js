function openModalMateriales(nom,uM,cant,color){
    var size;
    if(nom.length < 15){
        size = "20px";
    }
    else if(nom.length < 20){
        size = "17px";
    }else if(nom.length < 25){
        size = "15px";
    }
    else{
        size = "13px";
    }
    $("#nombre-material").css("text-align","center");
    $("#nombre-material").css("font-size",size);

    $("#material-img").css("background-color",color);

    document.getElementById("material-img").innerHTML = nom.charAt(0);
    document.getElementById("nombre-material").innerHTML = nom;
    document.getElementById("unidad-medida").innerHTML = uM;
    document.getElementById("cant-material").innerHTML = cant;
    document.getElementById("open-modal-mat").click();
}