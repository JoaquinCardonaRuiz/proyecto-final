function setID(id){
    $.getJSON("/gestion-ed/"+String(id),function (result){
        console.log(result);
        document.getElementById("headingModal").innerHTML = result["id_ent"];
    })
}
