/**
 * alap osztály az alkalmazásnak
 */
export class Application {
    /**
     * 
     * @param {HTMLElement} canvas Target div
     */
    constructor(canvas) {
        this.canvas = canvas;

        // megtisztuja a canvast mielőtt betőlti a modult 
        while (canvas.lastChild) {
            canvas.removeChild(canvas.lastChild);
        }
    }

    /**
     * @abstract
     */
    initialize() {}

    /**
     * @abstract
     */
    update() {}
}

export default Application;