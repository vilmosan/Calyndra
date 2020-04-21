$(document).ready(function(){

    let usernameFieldInput = true;
    /**
     * Megvizsgálja, hogy az írógépen lévő NAME / PASS kapcsoló
     * melyik irányba van kapcsolva, majd ezt eltárolja egy változóban,
     * ami alapján a későbbiekben eldől, hogy melyik beviteli mezőbe
     * kerülnek a "lenyomott" karakterek.
     */
    $('#fieldSwitchButton').change(function(){
        if(this.checked) {
            usernameFieldInput = true;
        }
        else {
            usernameFieldInput = false;
        }
    });

    /**
     * BACK SPACER! Egy billentyű az írógépen, amely kitörli (teljesen) 
     * a beírt karaktereket a Username || Password beviteli mezőből,
     * attól függően, hogy melyik irányba van kapcsolva a NAME / PASS kapcsoló.
     */
    $('#clearInputButton').click(function(){
        if(usernameFieldInput === true){
            document.getElementById("usernameInput").value = "";
        } else {
            document.getElementById("passwordInput").value = "";
        };
    }); 

    /**
     * Keypress osztályban lévő gombok lenyomása után
     * kiszedi a hozzájuk társított ASCII-kódot amit megadtunk
     * HTML-ben a data-code paramétereként, majd hozzáfűzi az
     * átkonvertált karaktert a Username || Password beviteli mezőhöz.
     */
    $('.keypress').click(function() {

        let code = $(this).data('code');

        if(usernameFieldInput === true){
            $('#usernameInput').val(function(i, val) {
                return val + String.fromCharCode(code);                
            });
        } else {
            $('#passwordInput').val(function(i, val) {
                return val + String.fromCharCode(code);                
            });
        };
        
    });
    
});