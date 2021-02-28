var unidad = '-';
var id_pd = '-';
var nombre_pd = '-';
var nombre_mat = '-';
var id_mat = '-';
var cantidad = '-';
var materiales = [];

function muestraInitialPage(){
  $("#initial-page").fadeIn();
}

function hideInitialPage(){
    $("#initial-page").fadeOut();
    $("#multisteps-form").fadeIn(1000);
}

function setUnidadValue(){
  document.getElementById("siguiente2btn").disabled = false;
  id_mat = parseInt($("#mat-select").val());
  for (var i in materiales){
    if (materiales[i]["id"]==id_mat){
      unidad = materiales[i]["unidadMedida"];
      nombre_mat = materiales[i]["nombre"];
    }
  }
  $("#unidadMedida").text(unidad.toLocaleLowerCase());
  $("#material-img").text(nombre_mat.charAt(0).toUpperCase());

  var size;
  if(nombre_mat.length < 15){
      size = "20px";
  }
  else if(nombre_mat.length < 20){
      size = "17px";
  }else if(nombre_mat.length < 25){
      size = "15px";
  }
  else{
      size = "13px";
  }
  $("#nombre-material").css("text-align","center");
  $("#nombre-material").css("font-size",size);
  $("#nombre-material").text(nombre_mat);
}

function setPD(){
  document.getElementById("siguiente1btn").disabled = false;
  var values = String($("#pd-select").val()).split(',');
  id_pd = values[0];
  nombre_pd = values[1];
  $("#mat-select option").each(function() {
    $(this).remove();
  });
  $('#mat-select').append($('<option>', {
    text: "-- Por favor, seleccione un Material --",
    disabled: true,
    selected: true
  }));
  $.getJSON("/gestion-puntos-deposito/materiales/"+ String(id_pd),function (result){
    materiales = result;
    for (var i in result){
      if (result[i]["estado"] != "suspendido"){
        $('#mat-select').append($('<option>', {
          value: String(result[i]["id"]),
          text: String(result[i]["nombre"]),
        }));
      }
      
    }
  });
  $("#nombre-pd").text(nombre_pd);
}

function setCant(){
  cantidad = $("#cantidad-input").val();
  $("#cantidad").text($("#cantidad-input").val() + ' ' + String(unidad));
  if ($("#cantidad-input").val() != ''){
    $("#cant-next-btn").prop("disabled", false);
  }
  else{
    $("#cant-next-btn").prop("disabled", true);
  }
}

function submitForm(){
  loading();
  $.getJSON("/simulador/alta-deposito/" + String(id_mat) + '/' + String(id_pd) + '/' + String(cantidad),function (result){
    $("#code").text(result[0]);
    $("#cantEP").text(result[1]);
    $("#lds-ring-big").hide();
    $("#loading-text").remove();
    $("#ticket").fadeIn();
    
  });
}

function loading(){
  $("#multisteps-form").hide();
  $("#lds-ring-big").fadeIn();
  $("#loading-text").fadeIn();
  nextMsgDeposito();
}

$("#loadingRowPuntos").show();

function redirect(link){
  window.location.href = link;
}

function nextMsgDeposito() {
  if (messagesDeposito.length == 1) {
      $('#loading-text').html(messagesDeposito.pop()).fadeIn(500);

  } else {
      $('#loading-text').html(messagesDeposito.pop()).fadeIn(500).delay(5000).fadeOut(500, nextMsgDeposito);
  }
};

var messagesDeposito = [
  "Estamos registrando el Depósito",
  "¡Parece que has generado EcoPuntos!",
  "¡Casi listo! Últimos retoques"
].reverse();

//DOM elements
const DOMstrings = {
    stepsBtnClass: 'multisteps-form__progress-btn',
    stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
    stepsBar: document.querySelector('.multisteps-form__progress'),
    stepsForm: document.querySelector('.multisteps-form__form'),
    stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
    stepFormPanelClass: 'multisteps-form__panel',
    stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next' };
  
  
  //remove class from a set of items
  const removeClasses = (elemSet, className) => {
  
    elemSet.forEach(elem => {
  
      elem.classList.remove(className);
  
    });
  
  };
  
  //return exect parent node of the element
  const findParent = (elem, parentClass) => {
  
    let currentNode = elem;
  
    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode;
    }
  
    return currentNode;
  
  };
  
  //get active button step number
  const getActiveStep = elem => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  };
  
  //set all steps before clicked (and clicked too) to active
  const setActiveStep = activeStepNum => {
  
    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, 'js-active');
  
    //set picked items to active
    DOMstrings.stepsBtns.forEach((elem, index) => {
  
      if (index <= activeStepNum) {
        elem.classList.add('js-active');
      }
  
    });
  };
  
  //get active panel
  const getActivePanel = () => {
  
    let activePanel;
  
    DOMstrings.stepFormPanels.forEach(elem => {
  
      if (elem.classList.contains('js-active')) {
  
        activePanel = elem;
  
      }
  
    });
  
    return activePanel;
  
  };
  
  //open active panel (and close unactive panels)
  const setActivePanel = activePanelNum => {
  
    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, 'js-active');
  
    //show active panel
    DOMstrings.stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
  
        elem.classList.add('js-active');
  
        setFormHeight(elem);
  
      }
    });
  
  };
  
  //set form height equal to current panel height
  const formHeight = activePanel => {
  
    const activePanelHeight = activePanel.offsetHeight;
  
    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
  
  };
  
  const setFormHeight = () => {
    const activePanel = getActivePanel();
  
    formHeight(activePanel);
  };
  
  //STEPS BAR CLICK FUNCTION
  DOMstrings.stepsBar.addEventListener('click', e => {
  
    //check if click target is a step button
    const eventTarget = e.target;
  
    if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
      return;
    }
  
    //get active button step number
    const activeStep = getActiveStep(eventTarget);
  
    //set all steps before clicked (and clicked too) to active
    setActiveStep(activeStep);
  
    //open active panel
    setActivePanel(activeStep);
  });
  
  //PREV/NEXT BTNS CLICK
  DOMstrings.stepsForm.addEventListener('click', e => {
  
    const eventTarget = e.target;
  
    //check if we clicked on `PREV` or NEXT` buttons
    if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))
    {
      return;
    }
  
    //find active panel
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
  
    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
  
    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
      activePanelNum--;
  
    } else {
  
      activePanelNum++;
  
    }
  
    setActiveStep(activePanelNum);
    setActivePanel(activePanelNum);
  
  });
  
  //SETTING PROPER FORM HEIGHT ONLOAD
  window.addEventListener('load', setFormHeight, false);
  
  //SETTING PROPER FORM HEIGHT ONRESIZE
  window.addEventListener('resize', setFormHeight, false);