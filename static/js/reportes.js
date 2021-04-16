const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

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
        console.log(months);
        $("#loading-row-mat").hide();
        $("#loading-text-mat").hide();
        $("#chart-row-mat").fadeIn();
        dataSet = [];
        result = result.reverse();
        for (var i=0; i < result.length;i++){
            dataSet.push({x:i+1, y: result[i],label:months[i]})
        }
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2",
            title:{
              text: ""
            },
            axisY: {
              gridThickness: 0,
              stripLines: [
                {
                  value: 0,
                  showOnTop: true,
                  color: "gray",
                  thickness: 2
                }
              ]
            },
            data: [{        
              type: "line",
              lineColor: "#95C22B",
              color:"#95C22B", 
              indexLabelFontSize: 16,
              dataPoints: dataSet
            }]
          });
          chart.render(); 
    });
}