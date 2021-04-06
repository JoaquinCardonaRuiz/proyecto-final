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
            if ($(this).find("th:first").text() != type_filter){
                hide = true;
            }
        }
        if (filter_by_in_out){
            if ($(this).find("td:second").val() != in_out_filter){
                hide = true;
            }
        }


        if (filter_by_date_from){

            var dateString = $(this).find("td:nth-child(5)").text();
            var newData = dateString.replace(/(\d+[/])(\d+[/])/, '$2$1');
            var date = new Date(newData);

            date_from_filter = new Date(String(date_from_filter).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") + "GMT-0300");

            if (date < date_from_filter){
                hide = true;
            }   
        }
        if (filter_by_date_to){
            
            var dateString = $(this).find("td:nth-child(5)").text();
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





