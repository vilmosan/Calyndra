import Application from './Application.js';

export class AccountSettings extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

    }

    initialize() {


        const h1element = document.createElement('h1');
        this.canvas.append(h1element);
        h1element.textContent = ("This is Account settings Page");

    }


}

export default AccountSettings;