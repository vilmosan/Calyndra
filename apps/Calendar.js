import Application from './Application.js';

export class Calandar extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

    }

    initialize() {


        const h1element = document.createElement('h1');
        this.canvas.append(h1element);
        h1element.textContent = ("This is Calander Page");

    }


}

export default Calandar;
