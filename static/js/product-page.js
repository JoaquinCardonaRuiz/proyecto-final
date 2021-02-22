$(document).ready(function () {
    // MDB Lightbox Init
    $(function () {
      $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
    });
  });


function setPvalues(value){
    $("#cantEP").text(String(value) + " EcoPuntos");
    $("#cantMoney").text("$" + String(100-value) + " ARS");
}

setPvalues(0);