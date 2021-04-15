var cards = [false,false,false];

function toggle_card(n){
    cards[n] = !cards[n];
    var s = "/static/img/ecotips"+n.toString();
    if(cards[n]){
        s += "-open.png";
        document.getElementById("card"+n.toString()).hidden = false;
    }else{
        document.getElementById("card"+n.toString()).hidden = true;
        s += ".png";
    }
    document.getElementById("img-"+n.toString()).src = s;

}