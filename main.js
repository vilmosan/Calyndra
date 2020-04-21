import Home from "./apps/Home.js";
import SignUp from "./apps/SignUp.js";
import Calendar from "./apps/Calendar.js";
import Financials from "./apps/Financials.js";
import YourContacts from "./apps/YourContacts.js";
import AccountSettings from "./apps/AccountSettings.js";
let app;

window.addEventListener("DOMContentLoaded", function () {

    app = new Home(document.getElementById("canvas"));

    const HomePage = document.getElementById("home");
    HomePage.addEventListener("click", function () {
        app = new Home(document.getElementById("canvas"));
    });


    const SignUpage = document.getElementById("sign_up");
    SignUpage.addEventListener("click", function () {
        app = new SignUp(document.getElementById("canvas"));
    });

    const CalendarPage = document.getElementById("calendar");
    CalendarPage.addEventListener("click", function () {
        app = new Calendar(document.getElementById("canvas"));
    });

    const FinancialsPage = document.getElementById("financials");
    FinancialsPage.addEventListener("click", function () {
        app = new Financials(document.getElementById('canvas'));
    });

    const YourContactsPage = document.getElementById("your_contacts");
    YourContactsPage.addEventListener("click", function () {
        app = new YourContacts(document.getElementById("canvas"));
    });

    const AccountSettingsPage = document.getElementById("account_settings");
    AccountSettingsPage.addEventListener("click", function () {
        app = new AccountSettings(document.getElementById("canvas"));
    });

});