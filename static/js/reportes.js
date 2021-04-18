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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
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
  $("#graph-cantDeps").fadeIn();
  document.getElementById("chartContainer-cantDeps").innerHTML ="";
  $("#chart-row-cantDeps").hide();
  $("#loading-row-cantDeps").fadeIn();
  $("#loading-text-cantDeps").fadeIn();

  cant_meses = document.getElementById("cantDeps-time-sp").value;
  console.log(cant_meses);
  $.getJSON("/reportes-admin/get-cant-depositos/"+String(cant_meses),function (result){
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
      $("#loading-row-cantDeps").hide();
      $("#loading-text-cantDeps").hide();
      $("#chart-row-cantDeps").fadeIn();
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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      // set container id for the chart
      chart.container('chartContainer-cantDeps');
      // initiate chart drawing
      // set positive and negative stroke settings
      
      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-cantDeps").innerHTML = "";
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
          document.getElementById("tbody-cantDeps").appendChild(tr);
        
        }
      });
}

function cantPeds(){
  $("#graph-cantPeds").fadeIn();
  document.getElementById("chartContainer-cantPeds").innerHTML ="";
  $("#chart-row-cantPeds").hide();
  $("#loading-row-cantPeds").fadeIn();
  $("#loading-text-cantPeds").fadeIn();

  cant_meses = document.getElementById("cantPeds-time-sp").value;
  console.log(cant_meses);
  $.getJSON("/reportes-admin/get-cant-pedidos/"+String(cant_meses),function (result){
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
      $("#loading-row-cantPeds").hide();
      $("#loading-text-cantPeds").hide();
      $("#chart-row-cantPeds").fadeIn();
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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      // set container id for the chart
      chart.container('chartContainer-cantPeds');
      // initiate chart drawing
      // set positive and negative stroke settings
      
      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-cantPeds").innerHTML = "";
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
          document.getElementById("tbody-cantPeds").appendChild(tr);
        
        }
      });
}

function ingresosEgresos(){
  $("#graph-ingresosEgresos").fadeIn();
  document.getElementById("chartContainer-ingresosEgresos").innerHTML ="";
  $("#chart-row-ingresosEgresos").hide();
  $("#loading-row-ingresosEgresos").fadeIn();
  $("#loading-text-ingresosEgresos").fadeIn();

  cant_meses = document.getElementById("ingresosEgresos-time-sp").value;
  console.log(cant_meses);
  $.getJSON("/reportes-admin/ingresos-costos/"+String(cant_meses),function (result){
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
      $("#loading-row-ingresosEgresos").hide();
      $("#loading-text-ingresosEgresos").hide();
      $("#chart-row-ingresosEgresos").fadeIn();
      datosI = [];
      datosE = [];
      ingresos = result["ingresos"].reverse();
      egresos = result["egresos"].reverse();
      for (var i=ingresos.length-1; i >= 0;i--){
          datosI.push([String(months[i]),ingresos[i]]);
          datosE.push([String(months[i]),egresos[i]]);
      }

      //Creo grafico

      // map data for the first series, take x from the zero column and value from the first column of data set
      var datosI = datosI.reverse();
      var datosE = datosE.reverse();

      // create line chart
      var chart = anychart.line();

      // turn on chart animation
      chart.animation(true);

      // create a series with mapped data
      var seriesI = chart.line(datosI);
      var seriesE = chart.line(datosE);
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      // set container id for the chart
      chart.container('chartContainer-ingresosEgresos');
      // initiate chart drawing
      // set positive and negative stroke settings
      
      seriesI.name('Ingresos');
      seriesI.markers(true);
      seriesI.fill("#95C22Bb0");
      seriesI.stroke("#95C22B");
      
      seriesE.name('Egresos');
      seriesE.markers(true);
      seriesE.fill("#f14e4eb0");
      seriesE.stroke("#f14e4e");

      chart.legend().enabled(true).fontSize(13).padding([0, 0, 20, 0]);
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-ingresosEgresos").innerHTML = "";
        dsrevI = datosI.reverse();
        dsrevE = datosE.reverse();
        for(var k in dsrevI){
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML=dsrevI[k][0];

          var td2 = document.createElement("td");
          var td2alt = document.createElement("td");
          balance = dsrevI[k][1] - dsrevE[k][1];
          if(balance > 0){
            td2alt.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+balance.toFixed(2);
          }else if (balance < 0){
            td2alt.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + balance.toFixed(2);
          }else{
            td2alt.innerHTML=balance.toFixed(2);
          }

          if(Number(k)+1 < dsrevI.length){
            change = (dsrevI[k][1] - dsrevE[k][1]) - (dsrevI[Number(k)+1][1] - dsrevE[Number(k)+1][1]);
            if(change > 0){
              td2.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+change.toFixed(2);
            }else if (change < 0){
              td2.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + change.toFixed(2);
            }else{
              td2.innerHTML=change.toFixed(2);
            }
          }else{
            td2.innerHTML="0";
          }
          var td3I = document.createElement("td");
          var td3E = document.createElement("td");
          td3E.innerHTML=dsrevE[k][1].toFixed(2);
          td3I.innerHTML=dsrevI[k][1].toFixed(2);

          tr.appendChild(td1);
          tr.appendChild(td3I);
          tr.appendChild(td3E);
          tr.appendChild(td2alt);
          tr.appendChild(td2);
          document.getElementById("tbody-ingresosEgresos").appendChild(tr);
        
        }
      });
}


function rentabilidad(){
  $("#graph-rentabilidad").fadeIn();
  document.getElementById("chartContainer-rentabilidad").innerHTML ="";
  $("#chart-row-rentabilidad").hide();
  $("#loading-row-rentabilidad").fadeIn();
  $("#loading-text-rentabilidad").fadeIn();

  cant_meses = document.getElementById("rentabilidad-time-sp").value;
  console.log(cant_meses);
  $.getJSON("/reportes-admin/ingresos-egresos-globales/"+String(cant_meses),function (result){
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
      $("#loading-row-rentabilidad").hide();
      $("#loading-text-rentabilidad").hide();
      $("#chart-row-rentabilidad").fadeIn();
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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      // set container id for the chart
      chart.container('chartContainer-rentabilidad');
      // initiate chart drawing
      // set positive and negative stroke settings
      
      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-rentabilidad").innerHTML = "";
        dsrev = datos.reverse();
        for(var k in dsrev){
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML=dsrev[k][0];

          var td2 = document.createElement("td");
          
          if(Number(k)+1 < dsrev.length){
            change = dsrev[k][1] - dsrev[Number(k)+1][1];
            if(change > 0){
              td2.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+change.toFixed(2);
            }else if (change < 0){
              td2.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + change.toFixed(2);
            }else{
              td2.innerHTML=change.toFixed(2);
            }
          }else{
            td2.innerHTML="0";
          }
          var td3 = document.createElement("td");
          td3.innerHTML=dsrev[k][1];

          tr.appendChild(td1);
          tr.appendChild(td3);
          tr.appendChild(td2);
          document.getElementById("tbody-rentabilidad").appendChild(tr);
        
        }
      });
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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
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
              td2.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+change.toFixed(2);
            }else if (change < 0){
              td2.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + change.toFixed(2);
            }else{
              td2.innerHTML=change.toFixed(2);
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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');
      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
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
              td2.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+change.toFixed(2);
            }else if (change < 0){
              td2.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + change.toFixed(2);
            }else{
              td2.innerHTML=change.toFixed(2);
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
  $("#graph-depsAcred").fadeIn();
  document.getElementById("chartContainer-depsAcred").innerHTML ="";
  $("#chart-row-depsAcred").hide();
  $("#loading-row-depsAcred").fadeIn();
  $("#loading-text-depsAcred").fadeIn();

  $.getJSON("/reportes-admin/porcentaje-dep-acreditados/",function (result){
    var data = [
      ['Acreditados', result[0]],
      ['No Acreditados', result[1]],
    ];

    var datosAC = anychart.data.set(data);

    var datos = datosAC.mapAs({ x: 0, value: 1 });

    var chart = anychart.pie(datos);
    chart
      .labels()
      .hAlign('center')
      .position('inside')
      .format('{%Value}%)');


    var palette = anychart.palettes.rangeColors();
    palette.items([{ color: '#95C22B' }, { color: '#f14e4e' }]);
    // set chart palette
    chart.palette(palette);

    // set legend title text settings
    chart
      .legend()
      // set legend position and items layout
      .position('center-bottom')
      .itemsLayout('horizontal')
      .align('center');

    // set container id for the chart
    chart.container('chartContainer-depsAcred');

    $("#loading-row-depsAcred").hide();
    $("#loading-text-depsAcred").hide();
    $("#chart-row-depsAcred").fadeIn();
    // initiate chart drawing
    chart.draw();


    //Lleno tabla
    document.getElementById("tbody-depsAcred").innerHTML = "";
    for(var k in data){
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td"); 
      td1.innerHTML = data[k][0];
      td2.innerHTML = data[k][1].toFixed(2) + "%";
      tr.appendChild(td1);
      tr.appendChild(td2);
      document.getElementById("tbody-depsAcred").appendChild(tr);
    }
  });    
}



function puntosDep(){
  $("#graph-puntosDep").fadeIn();
  document.getElementById("chartContainer-puntosDep").innerHTML ="";
  $("#chart-row-puntosDep").hide();
  $("#loading-row-puntosDep").fadeIn();
  $("#loading-text-puntosDep").fadeIn();

  $.getJSON("/reportes-admin/porcentaje-dep-pd/",function (result){

    var datosAC = anychart.data.set(result);

    var datos = datosAC.mapAs({ x: 0, value: 1 });

    var chart = anychart.pie(datos);
    chart
      .labels()
      .hAlign('center')
      .position('inside')
      .format('{%Value}%)');

    /*
    var palette = anychart.palettes.rangeColors();
    palette.items([{ color: '#95C22B' }, { color: '#f14e4e' }]);
    // set chart palette
    chart.palette(palette);
    */

    // set legend title text settings
    chart
      .legend()
      // set legend position and items layout
      .position('center-bottom')
      .itemsLayout('horizontal')
      .align('center');

    // set container id for the chart
    chart.container('chartContainer-puntosDep');

    $("#loading-row-puntosDep").hide();
    $("#loading-text-puntosDep").hide();
    $("#chart-row-puntosDep").fadeIn();
    // initiate chart drawing
    chart.draw();


    //Lleno tabla
    document.getElementById("tbody-puntosDep").innerHTML = "";
    for(var k in result){
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td"); 
      td1.innerHTML = result[k][0];
      td2.innerHTML = result[k][1].toFixed(2) + "%";
      tr.appendChild(td1);
      tr.appendChild(td2);
      document.getElementById("tbody-puntosDep").appendChild(tr);
    }
  });  
}

function puntosRet(){
  $("#graph-puntosRet").fadeIn();
  document.getElementById("chartContainer-puntosRet").innerHTML ="";
  $("#chart-row-puntosRet").hide();
  $("#loading-row-puntosRet").fadeIn();
  $("#loading-text-puntosRet").fadeIn();

  $.getJSON("/reportes-admin/porcentaje-ped-pr",function (result){

    var datosAC = anychart.data.set(result);

    var datos = datosAC.mapAs({ x: 0, value: 1 });

    var chart = anychart.pie(datos);
    chart
      .labels()
      .hAlign('center')
      .position('inside')
      .format('{%Value}%)');

    /*
    var palette = anychart.palettes.rangeColors();
    palette.items([{ color: '#95C22B' }, { color: '#f14e4e' }]);
    // set chart palette
    chart.palette(palette);
    */

    // set legend title text settings
    chart
      .legend()
      // set legend position and items layout
      .position('center-bottom')
      .itemsLayout('horizontal')
      .align('center');

    // set container id for the chart
    chart.container('chartContainer-puntosRet');

    $("#loading-row-puntosRet").hide();
    $("#loading-text-puntosRet").hide();
    $("#chart-row-puntosRet").fadeIn();
    // initiate chart drawing
    chart.draw();


    //Lleno tabla
    document.getElementById("tbody-puntosRet").innerHTML = "";
    for(var k in result){
      var tr = document.createElement("tr");
      var td1 = document.createElement("td");
      var td2 = document.createElement("td"); 
      td1.innerHTML = result[k][0];
      td2.innerHTML = result[k][1].toFixed(2) + "%";
      tr.appendChild(td1);
      tr.appendChild(td2);
      document.getElementById("tbody-puntosRet").appendChild(tr);
    }
  });
}



function ecotienda(){
  $("#graph-ecotienda").fadeIn();
  document.getElementById("chartContainer-ecotienda").innerHTML ="";
  $("#chart-row-ecotienda").hide();
  $("#loading-row-ecotienda").fadeIn();
  $("#loading-text-ecotienda").fadeIn();

  cant_meses = document.getElementById("ecotienda-time-sp").value;
  idArt = document.getElementById("ecotienda-sp").value;
  $.getJSON("/reportes-admin/ganancias-art-eco-tienda/"+String(cant_meses)+"/"+String(idArt),function (result){
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
      $("#loading-row-ecotienda").hide();
      $("#loading-text-ecotienda").hide();
      $("#chart-row-ecotienda").fadeIn();
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
      // set chart tooltip and interactivity settings
      chart
        .tooltip()
        .position('center-top')
        .anchor('center-bottom')
        .positionMode('point');

      chart.interactivity().hoverMode('by-x');

      // set container id for the chart
      chart.container('chartContainer-ecotienda');
      // initiate chart drawing
      // set positive and negative stroke settings
      
      series.negativeFill("#f14e4eb0");
      series.fill("#95C22Bb0");
      series.stroke("#95C22B");
      series.negativeStroke("#f14e4e");
      chart.draw();



        //Lleno tabla
        document.getElementById("tbody-ecotienda").innerHTML = "";
        dsrev = datos.reverse();
        for(var k in dsrev){
          var tr = document.createElement("tr");
          var td1 = document.createElement("td");
          td1.innerHTML=dsrev[k][0];

          var td2 = document.createElement("td");
          
          if(Number(k)+1 < dsrev.length){
            change = dsrev[k][1] - dsrev[Number(k)+1][1];
            if(change > 0){
              td2.innerHTML="<i class='fas fa-caret-up color-activo caret-up'></i>"+"+"+change.toFixed(2);
            }else if (change < 0){
              td2.innerHTML="<i class='fas fa-caret-down color-negativo caret-up'></i>" + change.toFixed(2);
            }else{
              td2.innerHTML=change.toFixed(2);
            }
          }else{
            td2.innerHTML="0";
          }
          var td3 = document.createElement("td");
          td3.innerHTML=dsrev[k][1];

          tr.appendChild(td1);
          tr.appendChild(td3);
          tr.appendChild(td2);
          document.getElementById("tbody-ecotienda").appendChild(tr);
        
        }
      });
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
        // set chart tooltip and interactivity settings
        chart
          .tooltip()
          .position('center-top')
          .anchor('center-bottom')
          .positionMode('point');

        chart.interactivity().hoverMode('by-x');
        series.negativeFill("#f14e4eb0");
        series.fill("#95C22Bb0");
        series.stroke("#95C22B");
        series.negativeStroke("#f14e4e");
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