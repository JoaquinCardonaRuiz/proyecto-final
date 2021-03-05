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
});
