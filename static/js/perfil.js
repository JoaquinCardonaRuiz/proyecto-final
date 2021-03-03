var tab = 1;

function tabHandler(option){
    if (option == 2){
        $("#home-tab").css({"border-bottom":"transparent"});
        $("#security-tab").css({"border-bottom":"transparent"});
        $("#profile-tab").css({"border-bottom":"2px solid #95C22B"});
        tab = 2;
    }
    else if (option == 1){
        $("#profile-tab").css({"border-bottom":"transparent"});
        $("#security-tab").css({"border-bottom":"transparent"});
        $("#home-tab").css({"border-bottom":"2px solid #95C22B"});
        
        tab = 1;
    }
    else{
        $("#profile-tab").css({"border-bottom":"transparent"});
        $("#home-tab").css({"border-bottom":"transparent"});
        $("#security-tab").css({"border-bottom":"2px solid #95C22B"});
        
        tab = 3;
    }

}
