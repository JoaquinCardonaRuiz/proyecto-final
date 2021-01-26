function openAltaModal(){
    jQuery.noConflict();
    $(".lds-ring").hide();
    $('#altaModal').modal('show');
    document.getElementById("nombreArtError").innerHTML="";
}