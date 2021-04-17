const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function openGraphModal(option){
    document.getElementById("open-graph-modal").click();
    $(".graph-row").hide();
    window[option]();
}

function stockArts(){
  $("#graph-stockMats").fadeIn();
  document.getElementById("title-stockMats").innerHTML = "Niveles de Stock de Artículos";
  document.getElementById("inputs-art").hidden = false;
  document.getElementById("inputs-ins").hidden = true;
  document.getElementById("inputs-mat").hidden = true;
  stockMats_data($("#stock-art-sp").val(),$('#stock-art-time-sp').val(),"/reportes-admin/movimientos-stock-art/");
}

function stockIns(){
  $("#graph-stockMats").fadeIn();
  document.getElementById("title-stockMats").innerHTML = "Niveles de Stock de Insumos";
  document.getElementById("inputs-art").hidden = true;
  document.getElementById("inputs-ins").hidden = false;
  document.getElementById("inputs-mat").hidden = true;
  stockMats_data($("#stock-ins-sp").val(),$('#stock-ins-time-sp').val(),"/reportes-admin/movimientos-stock-ins/");
}

function stockMats(){
  $("#graph-stockMats").fadeIn();
  document.getElementById("title-stockMats").innerHTML = "Niveles de Stock de Materiales";
  document.getElementById("inputs-art").hidden = true;
  document.getElementById("inputs-ins").hidden = true;
  document.getElementById("inputs-mat").hidden = false;
  stockMats_data($("#stock-mat-sp").val(),$('#stock-mat-time-sp').val(),"/reportes-admin/movimientos-stock-mat/");
    
}

function cantUsers(){
  $("#graph-users").fadeIn();
  document.getElementById("chartContainer-users").innerHTML ="";
  $("#chart-row-users").hide();
  $("#loading-row-users").fadeIn();
  $("#loading-text-users").fadeIn();

  cant_meses = document.getElementById("users-time-sp").value;
  $.getJSON("/reportes-admin/get-cant-usuarios/"+String(cant_meses),function (result){
      const d = new Date();
      var months = [];
      cant_years = cant_meses/12;
      
      for (i = parseInt(d.getMonth())+1; i <12; i++){
          months.push(monthNames[i] + " " + String(d.getFullYear()-cant_years));
      }
      for(var j = cant_years-1;j>=1;j--){
          for (i = 0; i < monthNames.length; i++){
              months.push(monthNames[i] + " " + String(d.getFullYear()-j));
          }
      }
      for (i = 0; i <= parseInt(d.getMonth()); i++){
          months.push(monthNames[i] + " " + String(d.getFullYear()));
      }
      $("#loading-row-users").hide();
      $("#loading-text-users").hide();
      $("#chart-row-users").fadeIn();
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

      // create a series with mapped data
      var series = chart.area(seriesData);
      series.name('Cantidad');
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
      chart.container('chartContainer-users');
      // initiate chart drawing
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-users").innerHTML = "";
        dsrev = datos.reverse();
        for(var k in dsrev){
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML=dsrev[k][0];

          var td2 = document.createElement("td");
          
          if(Number(k)+1 < dsrev.length){
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
          document.getElementById("tbody-users").appendChild(tr);
        
        }
      });
}

function cantDeps(){
  
}

function cantPeds(){
    
}

function ingresos(){
    
}

function costos(){
    
}


function gananciasArt(){
  $("#graph-gananciasArt").fadeIn();
  document.getElementById("chartContainer-gananciasArt").innerHTML ="";
  $("#chart-row-gananciasArt").hide();
  $("#loading-row-gananciasArt").fadeIn();
  $("#loading-text-gananciasArt").fadeIn();

  idArt = document.getElementById("gananciasArt-sp").value;
  cant_meses = document.getElementById("gananciasArt-time-sp").value;
  $.getJSON("/reportes-admin/ganancias-por-art-totales/"+String(cant_meses)+"/"+String(idArt),function (result){
      const d = new Date();
      var months = [];
      cant_years = cant_meses/12;
      
      for (i = parseInt(d.getMonth())+1; i <12; i++){
          months.push(monthNames[i] + " " + String(d.getFullYear()-cant_years));
      }
      for(var j = cant_years-1;j>=1;j--){
          for (i = 0; i < monthNames.length; i++){
              months.push(monthNames[i] + " " + String(d.getFullYear()-j));
          }
      }
      for (i = 0; i <= parseInt(d.getMonth()); i++){
          months.push(monthNames[i] + " " + String(d.getFullYear()));
      }
      $("#loading-row-gananciasArt").hide();
      $("#loading-text-gananciasArt").hide();
      $("#chart-row-gananciasArt").fadeIn();
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

      // create a series with mapped data
      var series = chart.area(seriesData);
      series.name('Cantidad');
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
      chart.container('chartContainer-gananciasArt');
      // initiate chart drawing
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-gananciasArt").innerHTML = "";
        dsrev = datos.reverse();
        for(var k in dsrev){
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML=dsrev[k][0];

          var td2 = document.createElement("td");
          
          if(Number(k)+1 < dsrev.length){
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
          document.getElementById("tbody-gananciasArt").appendChild(tr);
        
        }
      });
}




function gananciasTotales(){
  $("#graph-gananciasTotal").fadeIn();
  document.getElementById("chartContainer-gananciasTotal").innerHTML ="";
  $("#chart-row-gananciasTotal").hide();
  $("#loading-row-gananciasTotal").fadeIn();
  $("#loading-text-gananciasTotal").fadeIn();

  cant_meses = document.getElementById("gananciasTotal-time-sp").value;
  $.getJSON("/reportes-admin/ganancias-por-art-totales-globales/"+String(cant_meses),function (result){
      const d = new Date();
      var months = [];
      cant_years = cant_meses/12;
      
      for (i = parseInt(d.getMonth())+1; i <12; i++){
          months.push(monthNames[i] + " " + String(d.getFullYear()-cant_years));
      }
      for(var j = cant_years-1;j>=1;j--){
          for (i = 0; i < monthNames.length; i++){
              months.push(monthNames[i] + " " + String(d.getFullYear()-j));
          }
      }
      for (i = 0; i <= parseInt(d.getMonth()); i++){
          months.push(monthNames[i] + " " + String(d.getFullYear()));
      }
      $("#loading-row-gananciasTotal").hide();
      $("#loading-text-gananciasTotal").hide();
      $("#chart-row-gananciasTotal").fadeIn();
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

      // create a series with mapped data
      var series = chart.area(seriesData);
      series.name('Cantidad');
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
      chart.container('chartContainer-gananciasTotal');
      // initiate chart drawing
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-gananciasTotal").innerHTML = "";
        dsrev = datos.reverse();
        for(var k in dsrev){
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML=dsrev[k][0];

          var td2 = document.createElement("td");
          
          if(Number(k)+1 < dsrev.length){
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
          document.getElementById("tbody-gananciasTotal").appendChild(tr);
        
        }
      });
}

function depsAcred(){
    
}

function puntosDep(){
    
}

function puntosRet(){
    
}

function stockMats_data(id, cant_meses=24,route){
    document.getElementById("chartContainer").innerHTML ="";
    $("#chart-row-mat").hide();
    $("#loading-row-mat").fadeIn();
    $("#loading-text-mat").fadeIn();
    $.getJSON(route+String(cant_meses)+"/"+String(id),function (result){
        const d = new Date();
        var months = [];
        cant_years = cant_meses/12;
        
        for (i = parseInt(d.getMonth())+1; i <12; i++){
            months.push(monthNames[i] + " " + String(d.getFullYear()-cant_years));
        }
        for(var j = cant_years-1;j>=1;j--){
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
            if(Number(k)+1 < dsrev.length){
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