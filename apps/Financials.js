import Application from './Application.js';

export class Financials extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

    }

    initialize() {


        const h1element = document.createElement('h1');
        this.canvas.append(h1element);
        h1element.textContent = ("This is Financials Page");

    }


}

export default Financials;