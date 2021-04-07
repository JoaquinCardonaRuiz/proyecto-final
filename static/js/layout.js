$(function() {
    // Sidebar toggle behavior
    $('#sidebarCollapse').on('click', function() {
      $('#sidebar, #content').toggleClass('active');
    });
  });


document.body.scrollTop = 0;

$( window ).resize(function() {
  navbarResize();
});

function navbarResize(){
  if( $( window ).width() < 768){
    $("#up-bar").css({"width":"100%"});
    $("#up-bar").css({"margin-left":"0px"});
  }
  else{
    $("#up-bar").css({"margin-left":"calc(15.5rem - 8px)"});
    $("#up-bar").css({"width":"82.3%"});

  }
}

$.getJSON("/layout/datos-usuario",function (result){
    $("#nombreUsuarioNavBar").text(result["nombre"]);
    $("#cantEPNavBar").text(result["totalEP"]);
    $("#user-profile-img-navbar").attr("src", result["img"]);
    if (result["carrito"]== false){
      $("#carrito-cant-items").text("0");
    }
    else{
      cantidad = 0;
      carrito = result["carrito"];
      for (var item in carrito){
        cantidad += parseFloat(carrito[item]);
      }
      $("#carrito-cant-items").text(cantidad);
    }
    //TODO: obtener la cantidad de elementos del carrito (chequear en que formato se guarda, creo que es un dic), y mostrarla.
});

//Redirige al url que recibe como parámetro.
function redirect(link){
  window.location.href = link;
}

//Redirige al url que recibe como parámetro en una nueva pestaña.
function redirectBlank(link){
window.open(
  link,
  '_blank' // <- This is what makes it open in a new window.
);
}

function isNumberKey(txt, evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode == 46) {
    //Check if the text already contains the . character
    if (txt.value.indexOf('.') === -1) {
      return true;
    } else {
      return false;
    }
  } else {
    if (charCode > 31 &&
      (charCode < 48 || charCode > 57))
      return false;
  }
  return true;
}

function isNumberKeyEntiresOnly(txt, evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 &&
      (charCode < 48 || charCode > 57))
      return false;
  return true;
}
