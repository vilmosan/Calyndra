import Application from "./Application.js";
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
  }

  initialize() {
    /**
     * Kereső funkció a 'Your Contacts' táblázathoz.
     * Egy input-boxba Enter lenyomása nélkül megvizsgálja
     * a beírt karaktersorozatot és leszűkíti a táblázatot az alapján.
     */
    $(document).ready(function () {
      (function ($) {
        $("#filter").keyup(function () {
          var rex = new RegExp($(this).val(), "i");
          $(".searchable tr").hide();
          $(".searchable tr")
            .filter(function () {
              return rex.test($(this).text());
            })
            .show();
        });
      })(jQuery);
    });

    if (this.list() == null) {
      this.add_people();
    }

    const main_div = document.createElement("div");
    main_div.className = "contactsDiv container col-10";
    main_div.id = "main_div";
    this.canvas.append(main_div);

    const view_main = document.createElement("div");
    view_main.className = "table-wrapper";
    main_div.append(view_main);

    //header
    const table_title = document.createElement("div");
    table_title.className = "table-title";
    view_main.append(table_title);

    const row = document.createElement("div");
    row.className = "row";
    table_title.append(row);

    const col_sm_6_2 = document.createElement("div");
    col_sm_6_2.className = "col-sm-6";
    row.append(col_sm_6_2);

    const your_contacts = document.createElement("h2");
    your_contacts.textContent = "Your ";
    col_sm_6_2.append(your_contacts);
    const your_contacts_b = document.createElement("b");
    your_contacts_b.textContent = "Contacts ";
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

    const self = this;
    const add_new_conntact_material_icons = document.createElement("i");
    add_new_conntact_material_icons.className = "material-icons";
    add_new_conntact_material_icons.textContent = "add_circle";
    add_new_conntact_button.append(add_new_conntact_material_icons);
    add_new_conntact_button.onclick = function () {
      self.new_button_click(main_div);
    };

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
    this.table(view_main, main_div);
  }

  list() {
    return JSON.parse(localStorage.getItem("contact"));
  }

  add(Contact) {
    this.contacts.push(Contact);
    localStorage.setItem("contact", JSON.stringify(this.contacts));
  }

  next_id() {
    let id = 0;
    const contact = this.list();
    for (let i = 0; i < contact.length; i++) {
      id = parseInt(contact[i].id, 10);
    }
    return (id + 1).toString();
  }

  update(Contact) {
    let data = this.list();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === Contact.id) {
        data[i] = Contact;
      }
    }
    localStorage.setItem("contact", JSON.stringify(data));
  }

  findById(id) {
    const data = this.list();
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
    localStorage.setItem("contact", JSON.stringify(newdata));
  }

  add_people() {
    let Vili = new Contact(
      "1",
      "Vass Vilmos",
      "vassvilmos@gmail.com",
      "+36 (20) 643 2323",
      "Adipisicing elit illum aliquid elto atque nam."
    );
    let Mate = new Contact(
      "2",
      "Kun Máté",
      "kunmate@gmail.com",
      "+36 (70) 643 2323",
      "Eligendi atque minus quibusdam pariatur."
    );
    let Marci = new Contact(
      "3",
      "Varga Márton",
      "vargamarton@gmail.com",
      "+36 (30) 321 2412",
      "Omnis illum aliquid eius atque nam ad quasi quam."
    );
    this.add(Vili);
    this.add(Mate);
    this.add(Marci);
  }

  th(child, textContent, iconClassName) {
    const th = document.createElement("th");
    th.textContent = textContent;
    child.append(th);
    const th_icon = document.createElement("i");
    th_icon.className = iconClassName;
    th.append(th_icon);
  }

  td(child, textContent) {
    const td_element = document.createElement("td");
    td_element.textContent = textContent;
    child.append(td_element);
  }

  table(child, main_div) {
    const self = this;

    const table = document.createElement("table");
    table.className = "table table-striped table-hover";
    child.append(table);

    // táblázat fejléc
    const thead = document.createElement("thead");
    table.append(thead);

    const thead_tr = document.createElement("tr");
    thead.append(thead_tr);

    const th_textContent = ["Name", "Email", "Phone", "Description", "Actions"];
    const th_iconClassName = [
      "fa fa-user-alt",
      "fa fa-envelope",
      "fa fa-phone-alt",
      "fa fa-info-circle",
      "fa fa-cogs",
    ];

    for (let i = 0; i < 5; i++) {
      this.th(thead_tr, th_textContent[i], th_iconClassName[i]);
    }

    //táblázat tartalom
    const tbody = document.createElement("tbody");
    tbody.className = "searchable";
    table.append(tbody);
    this.contacts = this.list();
    for (let i = 0; i < this.contacts.length; i++) {
      const tr_contact = document.createElement("tr");
      tr_contact.id = this.contacts[i].id;
      tbody.append(tr_contact);

      let td_textContent = [
        this.contacts[i].name,
        this.contacts[i].email,
        this.contacts[i].phone,
        this.contacts[i].description,
      ];
      for (let j = 0; j < td_textContent.length; j++) {
        this.td(tr_contact, td_textContent[j]);
      }

      const td_action = document.createElement("td");
      tr_contact.append(td_action);

      const edit_button = document.createElement("a");
      edit_button.href = "#editContactModal";
      edit_button.className = "edit";
      edit_button.setAttribute("data-toggle", "modal");
      td_action.append(edit_button);
      const edit_button_icon = document.createElement("i");
      edit_button_icon.className = "material-icons";
      edit_button_icon.title = "Edit";
      edit_button_icon.textContent = "edit";
      edit_button.append(edit_button_icon);
      edit_button.onclick = function () {
        self.edit_button_click(main_div, tr_contact.id);
      };

      const delete_button = document.createElement("a");
      delete_button.href = "#deleteContactModal";
      delete_button.className = "delete";
      delete_button.setAttribute("data-toggle", "modal");
      td_action.append(delete_button);
      const delete_button_icon = document.createElement("i");
      delete_button_icon.className = "material-icons";
      delete_button_icon.title = "Delete";
      delete_button_icon.textContent = "delete";
      delete_button.onclick = function () {
        self.remove_button_click(main_div, tr_contact.id);
      };

      delete_button.append(delete_button_icon);
    }
  }

  new_button_click(child) {
    const edit_contact_modal = document.createElement("div");
    edit_contact_modal.id = "addContactModal";
    edit_contact_modal.className = "modal fade";
    child.append(edit_contact_modal);
    const editContact = new Contact("", "", "", "", "");
    this.modal(edit_contact_modal, "Add Contact", editContact, "false");
  }

  edit_button_click(child, id) {
    const editid = id;
    const editContact = this.findById(editid);
    const edit_contact_modal = document.createElement("div");
    edit_contact_modal.id = "editContactModal";
    edit_contact_modal.className = "modal fade";
    child.append(edit_contact_modal);

    this.modal(edit_contact_modal, "Edit Contact", editContact, "true");
  }

  delete_button_click(id) {
    this.delete(id);
    document.getElementById("main_div").remove();
    this.initialize();
  }

  remove_button_click(child, id) {
    const delete_contact_modal = document.createElement("div");
    delete_contact_modal.id = "deleteContactModal";
    delete_contact_modal.className = "modal fade";
    child.append(delete_contact_modal);

    this.delete_modal(delete_contact_modal, id);
  }

  save_button_click() {
    const id = document.getElementById("editId").value;
    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;
    const phone = document.getElementById("editPhone").value;
    const description = document.getElementById("editDescription").value;
    let editContact = new Contact(id, name, email, phone, description);

    this.update(editContact);
    document.getElementById("main_div").remove();
    this.initialize();
  }

  add_button_click() {
    const name = document.getElementById("editName").value;
    const email = document.getElementById("editEmail").value;
    const phone = document.getElementById("editPhone").value;
    const description = document.getElementById("editDescription").value;
    let addContact = new Contact(
      this.next_id(),
      name,
      email,
      phone,
      description
    );
    this.add(addContact);
    document.getElementById("main_div").remove();
    this.initialize();
  }

  form_group(child, label, type, id, input_type, textContent) {
    const form_group_div = document.createElement("div");
    form_group_div.className = "form-group";
    child.append(form_group_div);

    const label_element = document.createElement("label");
    label_element.textContent = label;
    form_group_div.append(label_element);

    const input = document.createElement(input_type);
    input.id = id;
    input.className = "form-control";
    if (type != "") {
      input.type = type;
    }
    input.setAttribute("required", "");

    input.value = textContent;
    form_group_div.append(input);
  }

  modal_header(child, title) {
    const modal_title = document.createElement("h4");
    modal_title.className = "modal-title";
    modal_title.textContent = title;
    child.append(modal_title);
  }

  modal_footer_edit(child) {
    const self = this;
    const cancel_input = document.createElement("input");
    cancel_input.type = "button";
    cancel_input.className = "btn btn-default";
    cancel_input.setAttribute("data-dismiss", "modal");
    cancel_input.value = "Cancel";
    child.append(cancel_input);
    cancel_input.onclick = function () {
      document.getElementById("editContactModal").remove();
    };

    const submit_input = document.createElement("input");
    submit_input.type = "submit";
    submit_input.className = "btn btn-default";
    submit_input.setAttribute("data-dismiss", "modal");
    submit_input.id = "saveButtonModal";
    submit_input.value = "Save";
    child.append(submit_input);

    submit_input.onclick = function () {
      self.save_button_click();
    };
  }

  modal_footer_add(child) {
    const self = this;
    const cancel_input = document.createElement("input");
    cancel_input.type = "button";
    cancel_input.className = "btn btn-default";
    cancel_input.setAttribute("data-dismiss", "modal");
    cancel_input.value = "Cancel";
    child.append(cancel_input);
    cancel_input.onclick = function () {
      document.getElementById("addContactModal").remove();
    };

    const submit_input = document.createElement("input");
    submit_input.type = "submit";
    submit_input.className = "btn btn-success";
    submit_input.setAttribute("data-dismiss", "modal");
    submit_input.id = "addContactButtonModal";
    submit_input.value = "Add";
    child.append(submit_input);

    submit_input.onclick = function () {
      self.add_button_click();
    };
  }

  modal_main(child, name, formid) {
    const modal_dialog = document.createElement("div");
    modal_dialog.className = "modal-dialog";
    child.append(modal_dialog);

    const modal_content = document.createElement("div");
    modal_content.className = "modal-content";
    modal_dialog.append(modal_content);

    const form = document.createElement("form");
    form.id = formid;
    modal_content.append(form);

    const modal_header = document.createElement("div");
    modal_header.className = "modal-header";
    form.append(modal_header);

    this.modal_header(form, name);

    const modal_body = document.createElement("div");
    modal_body.className = "modal-body";
    modal_body.id = "modal-body";
    form.append(modal_body);
  }

  modal(child, name, contact, fotter) {
    this.modal_main(child, name, "editform");

    let label = ["Id", "Name", "Email", "Phone", "Description"];
    let type = ["text", "text", "email", "text", ""];
    let id = [
      "editId",
      "editName",
      "editEmail",
      "editPhone",
      "editDescription",
    ];

    let textContent = [
      contact.id,
      contact.name,
      contact.email,
      contact.phone,
      contact.description,
    ];
    let input_type = ["input", "input", "input", "input", "textarea"];
    if (fotter == "false") {
      label = ["Name", "Email", "Phone", "Description"];
      type = ["text", "email", "text", ""];
      id = ["editName", "editEmail", "editPhone", "editDescription"];
      input_type = ["input", "input", "input", "textarea"];
      textContent = [
        contact.name,
        contact.email,
        contact.phone,
        contact.description,
      ];
    }

    for (let i = 0; i < input_type.length; i++) {
      this.form_group(
        document.getElementById("modal-body"),
        label[i],
        type[i],
        id[i],
        input_type[i],
        textContent[i]
      );
    }
    const modal_footer = document.createElement("div");
    modal_footer.className = "modal-footer";
    if (fotter == "true") {
      this.modal_footer_edit(modal_footer);
      document.getElementById("editId").disabled = true;
    } else {
      this.modal_footer_add(modal_footer);
    }
    document.getElementById("editform").append(modal_footer);
  }

  delete_modal(child, id) {
    this.modal_main(child, "Delete Contact", "deleteform");

    const p = document.createElement("p");
    p.textContent = "Are you sure you want to delete this Contact?";
    document.getElementById("modal-body").append(p);

    const warning_text = document.createElement("p");
    warning_text.id = "warningText";
    const text = document.createElement("small");
    text.textContent = "This action cannot be undone.";
    warning_text.append(text);

    const modal_footer = document.createElement("div");
    modal_footer.className = "modal-footer";
    document.getElementById("deleteform").append(modal_footer);

    const self = this;
    const cancel_input = document.createElement("input");
    cancel_input.type = "button";
    cancel_input.className = "btn btn-default";
    cancel_input.setAttribute("data-dismiss", "modal");
    cancel_input.value = "Cancel";
    modal_footer.append(cancel_input);
    cancel_input.onclick = function () {
      document.getElementById("deleteContactModal").remove();
    };

    const submit_input = document.createElement("input");
    submit_input.type = "submit";
    submit_input.className = "btn btn-danger";
    submit_input.setAttribute("data-dismiss", "modal");
    submit_input.id = "deleteButton";
    submit_input.value = "Delete";
    modal_footer.append(submit_input);

    submit_input.onclick = function () {
      self.delete_button_click(id);
    };
  }
}

export default YourContacts;
