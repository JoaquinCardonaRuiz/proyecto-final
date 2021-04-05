//Animación chevron (rota 180 grados cuando se abre el dropdown de la opción "Info" del menú principal)
function headingOptionHover(){
    $(".chevron").css({cursor: 'pointer', transform: 'rotate(180deg)'});
}

//Animación chevron (vuelve a su posición original)
function headingOptionLeave(){
    $(".chevron").css({transform: 'rotate(0deg)'});
}

//Abre el dropdown de la opción "Info" del menú principal
function openMenu() {
    $("#menu-option-box-1").show();
};

//Cierra el dropdown de la opción "Info" del menú principal
function closeMenu() {
    $("#menu-option-box-1").hide();
};

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