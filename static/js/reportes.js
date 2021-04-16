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
        dataSet = [];
        result = result.reverse();
        for (var i=result.length-1; i >= 0;i--){
            dataSet.push({x:Number(i), y: result[i],label:String(months[i])})
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


          //Lleno tabla
          document.getElementById("tbody-stockMats").innerHTML = "";
          dsrev = dataSet.reverse();
          for(var k in dsrev){
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            td1.innerHTML=dsrev[k].label;

            var td2 = document.createElement("td");
            if(k+1 < dsrev.length){
              change = dsrev[k].y - dsrev[Number(k)+1].y;
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
            td3.innerHTML=dsrev[k].y;

            tr.appendChild(td1);
            tr.appendChild(td3);
            tr.appendChild(td2);
            document.getElementById("tbody-stockMats").appendChild(tr);
          }
    });
}