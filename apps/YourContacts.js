import Application from './Application.js';
class Contact {
    constructor(id, name, email, phone, description) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.description = description;

    }


}
export class YourContacts extends Application {
    constructor(canvas) {
        super(canvas);
        this.contacts = [];

        this.initialize();




        /**
         * Kereső funkció a 'Your Contacts' táblázathoz.
         * Egy input-boxba Enter lenyomása nélkül megvizsgálja
         * a beírt karaktersorozatot és leszűkíti a táblázatot az alapján.
         */
        $(document).ready(function () {
            (function ($) {
                $('#filter').keyup(function () {
                    var rex = new RegExp($(this).val(), 'i');
                    $('.searchable tr').hide();
                    $('.searchable tr').filter(function () {
                        return rex.test($(this).text());
                    }).show();
                });
            }(jQuery));
        });




    }

    initialize() {
        let Vili = new Contact("0", "Vass Vilmos", "vassvilmos@gmail.com", "36 (20) 643 2323", "Adipisicing elit illum aliquid elto atque nam.");
        let Mate = new Contact("1", "Kun Máté", "kunmate@gmail.com", "36 (70) 643 2323", "Eligendi atque minus quibusdam pariatur.");
        let Marci = new Contact("2", "Varga Márton", "argamarton@gmail.com", "+36 (30) 321 2412", "Omnis illum aliquid eius atque nam ad quasi quam.")

        this.add(Vili);
        this.add(Marci);
        this.add(Mate);

 
        const main_div = document.createElement("div");
        main_div.className = "contactsDiv container col-10";
        this.canvas.append(main_div);

        const view_main = document.createElement("div");
        view_main.className = "table-wrapper";
        main_div.append(view_main);

        //header 
        const table_title = document.createElement("div");
        table_title.className = "table-title";
        view_main.append(table_title);

        const row = document.createElement("div")
        row.className = "row";
        table_title.append(row);

        const col_sm_6_2 = document.createElement("div");
        col_sm_6_2.className = "col-sm-6";
        row.append(col_sm_6_2);

        const your_contacts = document.createElement("h2");
        your_contacts.textContent = "Your ";
        col_sm_6_2.append(your_contacts);
        const your_contacts_b = document.createElement("b");
        your_contacts_b.textContent = "Contacts";
        your_contacts.append(your_contacts_b);
        const your_contacts_icon = document.createElement("i");
        your_contacts_icon.className = "far fa-address-book";
        your_contacts_icon.id = "contactsIcon";
        your_contacts.append(your_contacts_icon);



        const col_sm_6 = document.createElement("div");
        col_sm_6.className = "col-sm-6";
        row.append(col_sm_6);

        const add_new_conntact_button = document.createElement("a");
        add_new_conntact_button.href = "#addContactModal";
        add_new_conntact_button.className = "btn btn-success";
        add_new_conntact_button.id = "addContactButton";
        add_new_conntact_button.setAttribute("data-toggle", "modal");
        col_sm_6.append(add_new_conntact_button);

        const add_new_conntact_material_icons = document.createElement("i");
        add_new_conntact_material_icons.className = "material-icons";
        add_new_conntact_material_icons.textContent = "add_circle";
        add_new_conntact_button.append(add_new_conntact_material_icons);

        const add_new_conntact_text = document.createElement("span");
        add_new_conntact_text.textContent = "Add New Contact";
        add_new_conntact_button.append(add_new_conntact_text);

        //kereső
        const search_div = document.createElement("div");
        search_div.className = "col-3";
        search_div.id = "searchDiv";
        view_main.append(search_div);

        const input_field = document.createElement("input");
        input_field.id = "filter";
        input_field.type = "text";
        input_field.className = "form-control";
        input_field.placeholder = "Search here...";
        search_div.append(input_field);

        //táblázat 
        const table = document.createElement("table");
        table.className = "table table-striped table-hover";
        view_main.append(table);

        // táblázat fejléc
        const thead = document.createElement("thead");
        table.append(thead);

        const thead_tr = document.createElement("tr");
        thead.append(thead_tr);

        const th_name = document.createElement("th");
        th_name.textContent = "Name";
        thead_tr.append(th_name);
        const th_name_icon = document.createElement("i");
        th_name_icon.className = "fa fa-user-alt";
        th_name.append(th_name_icon);

        const th_email = document.createElement("th");
        th_email.textContent = "Email";
        thead_tr.append(th_email);
        const th_email_icon = document.createElement("i");
        th_email_icon.className = "fa fa-envelope";
        th_email.append(th_email_icon);

        const th_phone = document.createElement("th");
        th_phone.textContent = "Phone";
        thead_tr.append(th_phone);
        const th_phone_icon = document.createElement("i");
        th_phone_icon.className = "fa fa-phone-alt";
        th_phone.append(th_phone_icon);

        const th_description = document.createElement("th");
        th_description.textContent = "Description";
        thead_tr.append(th_description);
        const th_description_icon = document.createElement("i");
        th_description_icon.className = "fa fa-info-circle";
        th_description.append(th_description_icon);

        const th_actions = document.createElement("th");
        th_actions.textContent = "Actions";
        thead_tr.append(th_actions);
        const th_actions_icon = document.createElement("i");
        th_actions_icon.className = "fa fa-cogs";
        th_actions.append(th_actions_icon);

        //táblázat tartalom
        const tbody = document.createElement("tbody");
        tbody.className = "searchable";
        table.append(tbody);
        this.contacts = this.list();
        for (let i = 0; i < this.contacts.length; i++) {
            const tr_contact = document.createElement("tr");
            tbody.append(tr_contact);

            const td_name = document.createElement('td');
            td_name.textContent = this.contacts[i].name;
            tr_contact.append(td_name);

            const td_email = document.createElement('td');
            td_email.textContent = this.contacts[i].email;
            tr_contact.append(td_email);

            const td_phone = document.createElement('td');
            td_phone.textContent = this.contacts[i].phone;
            tr_contact.append(td_phone);

            const td_description = document.createElement('td');
            td_description.textContent = this.contacts[i].description;
            tr_contact.append(td_description);

            const edit_button = document.createElement("a");
            edit_button.href = "#editContactModal";
            edit_button.className = "edit";
            edit_button.setAttribute("data-toggle", "modal");
            tr_contact.append(edit_button);
            const edit_button_icon = document.createElement("i");
            edit_button_icon.className = "material-icons";
            edit_button_icon.title = "Edit";
            edit_button_icon.textContent = "edit";
            edit_button.append(edit_button_icon);

            const delete_button = document.createElement("a");
            delete_button.href = "#deleteContactModal";
            delete_button.className = "delete";
            delete_button.setAttribute("data-toggle", "modal");
            tr_contact.append(delete_button);
            const delete_button_icon = document.createElement("i");
            delete_button_icon.className = "material-icons";
            delete_button_icon.title = "Delete";
            delete_button_icon.textContent = "delete";

            delete_button.append(delete_button_icon);



        }









    }

    list() {

        return JSON.parse(localStorage.getItem("contact"));

    }

    add(Contact) {

        this.contacts.push(Contact)
        localStorage.setItem('contact', JSON.stringify(this.contacts));
    }
    update(Contact) {
        let data = this.list();
        console.log(data);


        for (let i = 0; i < data.length; i++) {
            if (data[i].id === Contact.id) {
                data[i] = Contact;
            }
        }
        localStorage.setItem('contact', JSON.stringify(data));

    }

    findById(id) {
        const data = this.list();
        console.log(data);
        for (const d of data) {
            if (d.id === id) {
                return d;
            }
        }
        return undefined;
    }

    delete(id) {
        const removeid = this.findById(id);
        console.log(removeid);

        const data = this.list();
        let newdata = [];
        for (let d of data) {
            if (d.id != removeid.id) {
                newdata.push(d);
            }
        }
        this.localStorage.setItem('contact', JSON.stringify(newdata));
    }
}

export default YourContacts;
