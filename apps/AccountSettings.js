import Application from './Application.js';

export class AccountSettings extends Application {
    constructor(canvas) {
        super(canvas);

        this.initialize();

        let readURL = function(input) {
            if (input.files && input.files[0]) {
                let reader = new FileReader();
    
                reader.onload = function (e) {
                    $('.avatar').attr('src', e.target.result);
                }
        
                reader.readAsDataURL(input.files[0]);
            }
        }
        
        $(".file-upload").on('change', function(){
            readURL(this);
        });

    }

    initialize() {

        const fieldsName = [
            "First Name:",
            "Last name:",
            "E-mail:",
            "Telephone number:",
            "Password:",
            "Password verification:"
        ];
        
        const fieldsVariables = [
            "first_name",
            "last_name",
            "email",
            "phone",
            "password",
            "password2"
        ]

        const mainDiv = document.createElement("div");
        mainDiv.className = "settingsDiv container col-10";
        this.canvas.append(mainDiv);

        const header = document.createElement('div');
        header.className = "settingsHeader";
        mainDiv.append(header);

        const headerTitle = document.createElement('h1');
        headerTitle.textContent = "Account Settings";
        header.append(headerTitle);

        const rowStructure = document.createElement("div");
        rowStructure.className = "row mt-5";
        mainDiv.append(rowStructure);

        const leftColoumnOuterDiv = document.createElement("div");
        leftColoumnOuterDiv.className = "col-sm-3";
        rowStructure.append(leftColoumnOuterDiv);

        const leftColoumnInnerDiv = document.createElement("div");
        leftColoumnInnerDiv.className = "text-center mb-4";
        leftColoumnOuterDiv.append(leftColoumnInnerDiv);

        const profilePic = document.createElement("img");
        profilePic.className = "avatar img-circle img-thumbnail";
        profilePic.src = "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
        profilePic.alt = "avatar";
        leftColoumnInnerDiv.append(profilePic);
        
        const profilePicInstruction = document.createElement('h6');
        profilePicInstruction.className = "m-4";
        profilePicInstruction.textContent = "Upload different picture..";
        leftColoumnInnerDiv.append(profilePicInstruction);
        
        const profilePicUpload = document.createElement('input');
        profilePicUpload.className = "text-center center-block file-upload";
        profilePicUpload.type = "file";
        leftColoumnInnerDiv.append(profilePicUpload);

        const rightColoumn = document.createElement("div");
        rightColoumn.className = "col-sm-9";
        rowStructure.append(rightColoumn);

        const line = document.createElement("hr");
        rightColoumn.append(line);

        const form = document.createElement("form");
        form.action = "#";
        form.method = "post";
        form.id = "settingsForm";
        rightColoumn.append(form);

        for(let i = 0; i < fieldsName.length; i++){

            let formGroup = document.createElement("div");
            formGroup.className = "col-xs-6 mt-4";
            form.append(formGroup);
            
            let label = document.createElement("label");
            label.for = fieldsVariables[i];
            formGroup.append(label);

            let labelTitle = document.createElement("h4");
            labelTitle.textContent = fieldsName[i];
            label.append(labelTitle);

            let input = document.createElement("input");
            input.type = "text";
            input.className = "form-control";
            input.name = fieldsVariables[i];
            input.id = fieldsVariables[i];
            form.append(input);

        }

        const buttonsDivOuter = document.createElement("div");
        buttonsDivOuter.className = "form-group mt-5";
        form.append(buttonsDivOuter);
        
        const buttonsDivInner = document.createElement("div");
        buttonsDivInner.className = "col-xs-12";
        buttonsDivOuter.append(buttonsDivInner);

        const saveButton = document.createElement("button");
        saveButton.className = "btn btn-lg btn-success";
        saveButton.id = "saveSettingsButton";
        saveButton.type = "submit";
        saveButton.textContent = "Save";
        buttonsDivInner.append(saveButton);

        const resetButton = document.createElement("button");
        resetButton.className = "btn btn-lg";
        resetButton.type = "submit";
        resetButton.textContent = "Reset";
        buttonsDivInner.append(resetButton);

    }

}

export default AccountSettings;