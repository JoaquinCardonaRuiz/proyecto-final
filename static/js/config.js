var selected_option_pa = "item-1";
EPs= [];
Recs = [];

document.getElementById("click-btn").click();

function cargarEP(data){
    EPs = data.reverse();
}

function cargarRecs(data){
    Recs = data.reverse();
}

$( ".list-item-pa" ).hover(
    function() {
        if (jQuery(this).attr('id') != selected_option_pa){
            jQuery(this).css('background-color', 'rgb(240, 240, 240)');
        }
    }, function() {
        if (jQuery(this).attr('id') != selected_option_pa){
            $( this ).css('background-color', 'transparent');
        }
      }
  );


function loadEP(){
    $(".list-item-pa").css("background-color", "transparent");
    $(".list-item-pa").css("color", "black");
    $("#select-EP").css("background-color","#a9d3479f");
    $("#select-EP").css("color","white");
    selected_option_pa = "select-EP"; 
    loadTabla("EP");
    document.getElementById("configInput").value = "EPs";
}


function loadRecompensa(){
    $(".list-item-pa").css("background-color", "transparent");
    $(".list-item-pa").css("color", "black");
    $("#select-Recompensa").css("background-color","#a9d3479f");
    $("#select-Recompensa").css("color","white");
    selected_option_pa = "select-Recompensa";
    loadTabla("Recs");
    document.getElementById("configInput").value = "Recs";
}


function loadTabla(option){
    var data;
    if(option == "EP"){
        data = EPs;
    }
    else{
        data = Recs;
    }

    document.getElementById("tbody-values").innerHTML = "";
    for(k in data){
        console.log(data[k]);
        tr = document.createElement("tr");
        td1 = document.createElement("td");
        td2 = document.createElement("td");

        td1.innerHTML = data[k][0];
        td2.innerHTML = data[k][1].toString();

        tr.appendChild(td1);
        tr.appendChild(td2);
        document.getElementById("tbody-values").appendChild(tr);
    }
}