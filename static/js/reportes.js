const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function openGraphModal(option){
    document.getElementById("open-graph-modal").click();
    $(".graph-row").hide();
    window[option]();
}

function stockArts(){

}

function stockIns(){
    
}

function stockMats(){
    $("#stockMats").fadeIn();
    stockMats_data($("#stock-mat-sp").val(),$('#stock-mat-time-sp').val());
    
}

function cantUsers(){
    
}

function cantDeps(){
    
}

function cantPeds(){
    
}

function ingresos(){
    
}

function costos(){
    
}

function ganancias(){
    
}

function depsAcred(){
    
}

function puntosDep(){
    
}

function puntosRet(){
    
}

function stockMats_data(id, cant_meses=24){

    document.getElementById("chartContainer").innerHTML ="";
    $("#chart-row-mat").hide();
    $("#loading-row-mat").fadeIn();
    $("#loading-text-mat").fadeIn();
    $.getJSON("/reportes-admin/movimientos-stock-mat/"+String(cant_meses)+"/"+String(id),function (result){
        const d = new Date();
        var months = [];
        cant_years = cant_meses/12;
        
        for (i = parseInt(d.getMonth())+1; i <12; i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()-cant_years));
        }
        for (var j=1; j<cant_years; j++){
            for (i = 0; i < monthNames.length; i++){
                months.push(monthNames[i] + " " + String(d.getFullYear()-j));
            }
        }
        for (i = 0; i <= parseInt(d.getMonth()); i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()));
        }
        $("#loading-row-mat").hide();
        $("#loading-text-mat").hide();
        $("#chart-row-mat").fadeIn();
        datos = [];
        result = result.reverse();
        for (var i=result.length-1; i >= 0;i--){
            datos.push([String(months[i]),result[i]]);
        }
        console.log(datos);

        //Creo grafico

        // map data for the first series, take x from the zero column and value from the first column of data set
        var seriesData = datos.reverse();

        // create line chart
        var chart = anychart.area();

        // turn on chart animation
        chart.animation(true);

        // axes settings
        chart.yAxis().title('Stock');

        var xAxis = chart.xAxis();
        xAxis.title('Fecha');


        // create a series with mapped data
        var series = chart.area(seriesData);
        series.name('Stock');
        series.hovered().markers().enabled(true).type('circle').size(4);
        series.markers(true);
        series.color("#95C22B");
        // set chart tooltip and interactivity settings
        chart
          .tooltip()
          .position('center-top')
          .anchor('center-bottom')
          .positionMode('point');

        chart.interactivity().hoverMode('by-x');

        // set container id for the chart
        chart.container('chartContainer');
        // initiate chart drawing
        chart.draw();



          //Lleno tabla
          document.getElementById("tbody-stockMats").innerHTML = "";
          dsrev = datos.reverse();
          for(var k in dsrev){
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML=dsrev[k][0];

            var td2 = document.createElement("td");
            if(k+1 < dsrev.length){
              change = dsrev[k][1] - dsrev[Number(k)+1][1];
              if(change > 0){
                td2.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+change.toString();
              }else if (change < 0){
                td2.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + change.toString();
              }else{
                td2.innerHTML=change.toString();
              }
            }else{
              td2.innerHTML="0";
            }
            var td3 = document.createElement("td");
            td3.innerHTML=dsrev[k][1];

            tr.appendChild(td1);
            tr.appendChild(td3);
            tr.appendChild(td2);
            document.getElementById("tbody-stockMats").appendChild(tr);
          
          }
        });
}