import Application from './Application.js';

export class signUp extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

    }

    initialize() {
       
        const signup_div = document.createElement('div');
        this.canvas.append(signup_div);
        signup_div.className = "container";
        signup_div.id = "signupdiv";
        signup_div.style="padding: 16px; margin-left:10%"

        const h1element = document.createElement('h1');
        signup_div.append(h1element);
        h1element.id=("h1element");
        h1element.textContent = ("Sign up");
        
        const paragraph = document.createElement("p");
        paragraph.textContent="Fill the registration form, to join our community.";
        signup_div.append(paragraph);


        const paragraph2 = document.createElement("p");
        paragraph2.textContent = "You have to accept our terms and policy.";
        signup_div.append(paragraph2);
        paragraph2.style = "margin-bottom:10px"
        
        
        //first name, last name
        
        
        const firstname_div = document.createElement("div");
        firstname_div.className = ("form-group ");
        signup_div.append(firstname_div);

        const signupform_namelabel = document.createElement("label");
        firstname_div.append(signupform_namelabel);
        
        signupform_namelabel.textContent = ("Name:");


        const firstname_textbox = document.createElement("input");
        firstname_textbox.className =("form-control");
        firstname_textbox.placeholder="First name";
        firstname_textbox.type="text";
        firstname_textbox.id = "firstname"
        firstname_div.append(firstname_textbox);

        const lastname_div = document.createElement("div");
        lastname_div.className = ("form-group");
        signup_div.append(lastname_div);

        const lastname_textbox = document.createElement("input");
        lastname_textbox.className =("form-control");
        lastname_textbox.placeholder="Last name";
        lastname_textbox.type="text";
        lastname_textbox.id="lastname"
        lastname_div.append(lastname_textbox);

 //username

        const username_div = document.createElement("div");
        username_div.className = ("form-group");
        signup_div.append(username_div);

        const signupform_usernamelabel = document.createElement("label");
        username_div.append(signupform_usernamelabel);
        //signupform_emaillabel.for = "email"
        signupform_usernamelabel.textContent = ("Username:");

        const username_textbox = document.createElement("input");
        username_textbox.className =("form-control");
        username_textbox.placeholder="Username";
        username_textbox.type="text";
        username_textbox.id="username"
        username_div.append(username_textbox);
       
//email

        const signupformemail_div = document.createElement("div");
        signupformemail_div.className=("form-group")
        signup_div.append(signupformemail_div)


        const signupform_emaillabel = document.createElement("label");
        signupformemail_div.append(signupform_emaillabel);
        signupform_emaillabel.textContent = ("Email adress:");


        const email_textbox = document.createElement("input");
        email_textbox.placeholder = ("Type your email adress here")
        email_textbox.type = ("email")
        email_textbox.className=("form-control")
        email_textbox.id =("email")
        signupformemail_div.append(email_textbox);
//jelszó       

        const signupformpassword_div = document.createElement("div")
        signupformpassword_div.className = "form-group";
        signup_div.append(signupformpassword_div);

        const signupformpassword_label = document.createElement("label"); 
        signupformpassword_div.append(signupformpassword_label);
        signupformpassword_label.textContent = ("Password:");
        signupformpassword_label.style ="font-size: 8"

        const paragraph_password = document.createElement("p");
        paragraph_password.textContent=" "
        signupformpassword_div.append(paragraph_password);

        const password_textbox = document.createElement("input");
        password_textbox.placeholder = ("password");        
        password_textbox.classname = ("form-control");
        password_textbox.type = ("password");
        password_textbox.id = ("password");
        signupformpassword_div.append(password_textbox);

//jelszó megerősítése

        const signupformpassword2_div = document.createElement('div')
        signupformpassword2_div.className = "form-group";
        
        signup_div.append(signupformpassword2_div);



        const password2_textbox = document.createElement("input");
        password2_textbox.placeholder = ("confirm password");        
        password2_textbox.classname = ("form-control");
        password2_textbox.type = ("password");
        password2_textbox.id = ("password2");
        signupformpassword2_div.append(password2_textbox);

        //telefonszám
        const phonenum_div = document.createElement("div");
        signup_div.className = ("form-group");
        signup_div.append(phonenum_div);

        const phonenum_label = document.createElement("label");
        phonenum_label.textContent="Phone number:";
        phonenum_div.append(phonenum_label)

        const phonenum_textbox = document.createElement("input");
        phonenum_div.append(phonenum_textbox);
        phonenum_textbox.placeholder=("+36702012878")
        phonenum_textbox.type  = "text";
        phonenum_textbox.id ="phonenum"
        phonenum_textbox.className = "form-control";
        phonenum_div.append(phonenum_textbox)
        
//gender selection
const gender_div = document.createElement("div");
signup_div.append(gender_div);

const gender_label = document.createElement("label");
gender_div.append(gender_label);
gender_label.textContent=("Your gender:")

const br = document.createElement("br");
gender_div.append(br);

const male_label = document.createElement("label");
male_label.className = ("radio-inline");
gender_div.append(male_label);
male_label.textContent = "Male"

const male_input = document.createElement("input");
male_input.type = "radio";
male_input.name = "optradio";
male_input.id="male";
male_label.append(male_input);
male_input.style = "margin-left:10px"

const female_label = document.createElement("label");
female_label.className = ("radio-inline");
gender_div.append(female_label);
female_label.textContent = "Female"
female_label.style = "margin-left:10px"

const female_input = document.createElement("input");
female_input.type = "radio";
female_input.name = "optradio";
female_input.id="female";
female_label.append(female_input);
female_input.style ="margin-left:10px"

//dropdown country
const country_label = document.createElement("label");
signup_div.append(country_label);
country_label.textContent = "Select your country."

const country_div = document.createElement("div");
country_div.className = "input-group mb-3";
signup_div.append(country_div);


const country_select = document.createElement("select");
country_select.className = "custom-select";
country_div.append(country_select);
country_select.id="countyselect"


const br2 = document.createElement("br");
country_select.append(br2);

var countries = ["Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra, Angola", 
"Anguilla","Antarctica","Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", 
"Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", 
"Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
"Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil, British Indian Ocean Territory", 
"Brunei Darussalam", "Bulgaria", "Burkina Faso, Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
"Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island","Cocos (Keeling Islands)",
"Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote D\'Ivoire (Ivory Coast)", "Croatia (Hrvatska)", "Cuba",
"Cyprus", "Czech Republic", "Denmark", "Djibouti, Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador"
,"Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands(Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France", "Metropolitan",
"French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada",
"Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and McDonald Islands", "Honduras", "Hong Kong", "Hungary", 
"Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
"Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
"Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives","Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", 
"Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique","Myanmar", "Namibia", "Nauru", "Nepal","Netherlands", 
"Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua, Niger","Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan",
"Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation",
"Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and The Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
"Seychelles", "Sierra Leone", "Singapore", "Slovak Republic", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "S. Georgia and S. Sandwich Isls.", "Spain, Sri Lanka", 
"St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", 
"Tanzania", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia"," Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", 
"United Arab Emirates", "United Kingdom (Britain / UK)", "United States of America (USA)", "US Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State (Holy See)",
"Venezuela", "VietNam", "Virgin Islands (British)", "Virgin Islands (US)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"];

var elements = [];

for(var i = 0;i<countries.length;i++){    
    var optiontemp = document.createElement("option");
    optiontemp.textContent = countries[i];
    optiontemp.value = i;
    elements.push(optiontemp);
    country_select.append(elements[i]);
}


//checkbox
const checkbox_div =document.createElement("div");
signup_div.append(checkbox_div);

const checkbox1_div = document.createElement("div");
checkbox1_div.classname = "checkbox";
checkbox_div.append(checkbox1_div);

const checkbox1_label = document.createElement("label");
checkbox1_label.textContent = "Accept terms and policys";
checkbox1_div.append(checkbox1_label);

const checkbox1_input = document.createElement("input");
checkbox1_input.type="checkbox";
checkbox1_input.value = "";
checkbox1_label.append(checkbox1_input);
checkbox1_input.id = "checkbox1"
checkbox1_input.style = "margin-left : 10px";


const checkbox2_div = document.createElement("div");
checkbox2_div.className = "checkbox";
checkbox_div.append(checkbox2_div);

const checkbox2_label = document.createElement("label");
checkbox2_label.textContent = "Subscribe our newsletter ";
checkbox2_div.append(checkbox2_label);

const checkbox2_input = document.createElement("input");
checkbox2_input.type="checkbox";
checkbox2_input.id = "checkbox2";
checkbox2_input.value = "";
checkbox2_label.append(checkbox2_input);
checkbox2_input.style = "margin-left : 10px";




//gombok

        const buttons_div = document.createElement("div")
        buttons_div.className="row"
        signup_div.append(buttons_div);
        buttons_div.style = "padding: 16px"

        const button_cancel = document.createElement("button");
        button_cancel.className=" col-sm-12 col-md-6 col-lg-6 col-xl-6 btn btn-danger btn-lg";
        button_cancel.type = "button";
        button_cancel.textContent = "clear";
        buttons_div.append(button_cancel);
        button_cancel.id="clear"

        const button_signup = document.createElement("button");
        button_signup.className = "col btn btn-success btn-lg"
        button_signup.textContent = "Sing Up"
        button_signup.type ="button"
        buttons_div.append(button_signup);
        button_signup.id="signup"
        
        

      
/*     
        document.getElementById("signup").onclick=()=>{
            if(document.getElementById("password").value==document.getElementById("password2")){
                console.log("password is correct");
            }
           

        };
*/
        document.getElementById("clear").onclick=()=>{
            document.getElementById("password").value="";
            document.getElementById("password2").value = "";
            document.getElementById("email").value = "";
            document.getElementById("username").value="";
            document.getElementById("firstname").value="";
            document.getElementById("lastname").value="";
            document.getElementById("checkbox1").checked = "";
            document.getElementById("checkbox2").checked = "";
            document.getElementById("phonenum").value = "";
            document.getElementById("male").checked="";
            document.getElementById("female").checked="";
        };
      
  
   }


}

export default signUp;
