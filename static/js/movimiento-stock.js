var filter_by_type = false;
var filter_by_in_out = false;
var filter_by_date_from = false;
var filter_by_date_to = false;

var type_filter = false;
var in_out_filter = false;
var date_from_filter = false;
var date_to_filter = false;

var hide = false;


function active_filter(){
    type_input_val = $("#type-input").val();
    in_out_input_val = $("#in-out-input").val();
    date_from_input_val = $("#date-from-input").val();
    date_to_input_val = $("#date-to-input").val();
    //Tipo
    if (type_input_val != -1){
        filter_by_type = true;
        type_filter = type_input_val;
    }
    else{
        filter_by_type = false;
    }

    //Entrada-Salida
    if (in_out_input_val != -1){
        filter_by_in_out = true;
        in_out_filter = in_out_input_val;
        
    }
    else{
        filter_by_in_out = false;
    }

    //Fecha desde
    if (date_from_input_val != ''){
        filter_by_date_from = true;
        date_from_filter = date_from_input_val;
    }
    else{
        filter_by_date_from = false;
    }

    //Fecha hasta
    if (date_to_input_val != ''){
        filter_by_date_to = true;
        date_to_filter = date_to_input_val;
    }
    else{
        filter_by_date_to = false;
    }
}

function filter_table(filter){
    $('#content-table > tbody  > tr').each(function() {
        hide = false;
        if (filter_by_type){
            if ($(this).find("th:first").text().split(" #")[0] != type_filter){
                hide = true;
            }
        }
        if (filter_by_in_out){
            mov = parseFloat($(this).find("td:nth-child(3)").text());
            if (in_out_filter == "Entrada" && mov < 0){
                hide = true;
            }
            else if (in_out_filter == "Salida" && mov >= 0){
                hide = true;
            }
        }


        if (filter_by_date_from){

            var dateString = $(this).find("td:nth-child(6)").text();
            var newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
            var date = new Date(newData);

            date_from_filter = new Date(String(date_from_filter).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") + "GMT-0300");
            

            if (date < date_from_filter){
                hide = true;
            }   
        }
        if (filter_by_date_to){
            
            var dateString = $(this).find("td:nth-child(6)").text();
            var newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
            var date = new Date(newData);

            date_to_filter = new Date(String(date_to_filter).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") + "GMT-0300");

            if (date > date_to_filter){
                hide = true;
            }   
        }
        if (hide){
            $(this).fadeOut(100);
        }
        else{
            $(this).fadeIn();
        }
        
    }); 
}


function sortTable() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("content-table");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        var x1 = String(rows[i].getElementsByTagName("TD")[3].innerHTML);
        var y1 = String(rows[i + 1].getElementsByTagName("TD")[3].innerHTML);

        // Check if the two rows should switch place:
        x = x1.replace(/(\d+[/])(\d+[/])/, '$2$1');
        y = y1.replace(/(\d+[/])(\d+[/])/, '$2$1');

        x = new Date(x);
        y = new Date(y);

        
        if (x < y) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
    $('#contentMovStock').fadeIn();
}

  sortTable();
