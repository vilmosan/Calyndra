import Application from './Application.js';

export class Home extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

        $(document).ready(function () {

            let usernameFieldInput = true;
            /**
             * Megvizsgálja, hogy az írógépen lévő NAME / PASS kapcsoló
             * melyik irányba van kapcsolva, majd ezt eltárolja egy változóban,
             * ami alapján a későbbiekben eldől, hogy melyik beviteli mezőbe
             * kerülnek a "lenyomott" karakterek.
             */
            $('#fieldSwitchButton').change(function () {
                if (this.checked) {
                    usernameFieldInput = true;
                } else {
                    usernameFieldInput = false;
                }
            });

            /**
             * BACK SPACER! Egy billentyű az írógépen, amely kitörli (teljesen) 
             * a beírt karaktereket a Username || Password beviteli mezőből,
             * attól függően, hogy melyik irányba van kapcsolva a NAME / PASS kapcsoló.
             */
            $('#clearInputButton').click(function () {
                if (usernameFieldInput === true) {
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
            $('.keypress').click(function () {

                let code = $(this).data('code');

                if (usernameFieldInput === true) {
                    $('#usernameInput').val(function (i, val) {
                        return val + String.fromCharCode(code);
                    });
                } else {
                    $('#passwordInput').val(function (i, val) {
                        return val + String.fromCharCode(code);
                    });
                };

            });

        });

    }
    // html generálás
    initialize() {

        //main div 
        const login_div = document.createElement('div');
        this.canvas.append(login_div);
        login_div.id = "loginPage";
        

        // input  username mező
        const box_container_for_username = document.createElement('div');
        login_div.append(box_container_for_username);
        box_container_for_username.className = "box-container";
        box_container_for_username.id = "usernameInputBox";


        const box = document.createElement('div');
        box_container_for_username.append(box);
        box.className = "box";

        const input_for_username = document.createElement('input');
        box.append(input_for_username);
        input_for_username.type = "text";
        input_for_username.placeholder = "Username";
        input_for_username.id = "usernameInput";
   
        

        //input password mező

        const box_container_for_password = document.createElement('div');
        login_div.append(box_container_for_password);
        box_container_for_password.className = "box-container";
        box_container_for_password.id = "passwordInputBox";

        const box2 = document.createElement('div');
        box_container_for_password.append(box2);
        box2.className = "box";

        const input_for_password = document.createElement('input');
        box2.append(input_for_password);
        input_for_password.type = "password";
        input_for_password.placeholder = "Password";
        input_for_password.id = "passwordInput";

        //login gomb

        const login_button = document.createElement('button');
        login_div.append(login_button);
        login_button.className = "loginButton hvr-icon-forward";
        login_button.id = "loginButtonId";
        login_button.textContent = "Login"

        const login_i = document.createElement('i');
        login_button.append(login_i);
        login_i.className = "fa fa-chevron-circle-right hvr-icon";

        //switcher gomb

        const rocker = document.createElement('label');
        login_div.append(rocker);
        rocker.className = "rocker";

        const field_switch_button = document.createElement('input');
        rocker.append(field_switch_button);
        field_switch_button.id = "fieldSwitchButton";
        field_switch_button.type = "checkbox";
        field_switch_button.setAttribute("checked","");

        const switch_left = document.createElement('span');
        rocker.append(switch_left);
        switch_left.className = "switch-left";
        switch_left.textContent = "Name";

        const switch_right = document.createElement('span');
        rocker.append(switch_right);
        switch_right.className = "switch-right";
        switch_right.textContent = "Pass";
        

        // irógép gompok 
        const clearbutton = document.createElement('button');
        login_div.append(clearbutton);
        clearbutton.className = "clearButton hvr-radial-in";
        clearbutton.id = "clearInputButton";

        let code = ["44","46","50","51","52","53","54","55","56","57","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","225","233","243","246","252","337"];
        let id = ["charComma", "charDot", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9", "letterA", "letterB", "letterC", "letterD", "letterE", "letterF", "letterG", "letterH", "letterI", "letterJ", "letterK", "letterL", "letterM", "letterN", "letterO", "letterP", "letterQ", "letterR", "letterS", "letterT", "letterU", "letterV", "letterW", "letterX", "letterY", "letterZ", "acuteA", "acuteE", "acuteO", "diaeresisO", "diaeresisU", "doubleAcuteO"]
        for (let i=0;i < code.length; i++){
            let keypress = document.createElement('button');
            login_div.append(keypress);
            keypress.className = "keypress hvr-radial-in";
            keypress.id = id[i];
            keypress.setAttribute("data-code",code[i]);
        }
    
    }


}

export default Home;
