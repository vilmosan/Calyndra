import Application from './Application.js';

export class Calandar extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

    }

    initialize() {
        const calendar_div = document.createElement('div');
        calendar_div.id = 'calendarDiv'
        this.canvas.append(calendar_div);
        this.initializeCanvas(calendar_div);
        
        let contr = new Controller();
        contr.run();
    }

    /**
     * This code create the required HTML into the canvas div
     */
    initializeCanvas(canvas){    
        const title_bar_div = document.createElement('div');
        canvas.append(title_bar_div);
        title_bar_div.id = 'title-bar';
    
        let h = document.createElement('h1');
        title_bar_div.append(h);
        h.textContent = 'Az én To-do listám';
    
        const main_div = document.createElement('div');
        canvas.append(main_div);
        main_div.id = 'main';
    
        const inside_div = document.createElement('div');
        main_div.append(inside_div);
        inside_div.className = 'inside';
    
        const input_section = document.createElement('section');
        inside_div.append(input_section);
        input_section.className = "input";
    
        h = document.createElement('h2');
        input_section.append(h);
        h.textContent = 'Új teendő hozzáadása';
    
        let form = document.createElement('form');
        input_section.append(form);
        form.action = "";
    
        let p = document.createElement('p');
        form.append(p);
        p.className = 'message';
        p.textContent = 'Az új teendő adatai sikeresen rögzítésre kerültek';
    
        p = document.createElement('p');
        form.append(p);
        p.className = 'message error';
        p.textContent = 'A beírt megnevezés túl rövid! (minimum 3 karakter)';
    
        let div = document.createElement('div');
        form.append(div);
    
        let label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'title';
        label.textContent = 'Megnevezés';
    
        let input = document.createElement('input');
        div.append(input);
        input.type = 'text';
        input.id = 'title';
    
        div = document.createElement('div');
        form.append(div);
    
        label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'description';
        label.textContent = 'Megnevezés';
    
        input = document.createElement('textarea');
        div.append(input);
        input.id = 'description';
    
        let button = document.createElement('button');
        form.append(button);
        button.textContent = 'Hozzáadás';
    
        const collection_section = document.createElement('section');
        inside_div.append(collection_section);
        collection_section.className = "collection";
    
        h = document.createElement('h2');
        collection_section.append(h);
        h.textContent = 'Teendők Listája';
    
        p = document.createElement('p');
        collection_section.append(p);
        p.className = 'info';
    
        const list_ul = document.createElement('ul');
        collection_section.append(list_ul);
        list_ul.className = "list";
    
        const navigation_bar_div = document.createElement('div');
        canvas.append(navigation_bar_div);
        navigation_bar_div.id = 'navigation-bar';
    
        let ul = document.createElement('ul');
        navigation_bar_div.append(ul);
    
        let li = document.createElement('li');
        ul.append(li);
    
        let a = document.createElement('a');
        li.append(a);
        a.href = "";
        a.title = 'Új teendő';
        a.textContent = 'Új'
    
        li = document.createElement('li');
        ul.append(li);
    
        a = document.createElement('a');
        li.append(a);
        a.href = "";
        a.title = 'Teendők listája';
        a.textContent = 'Eddigiek'
    
    }


}

export default Calandar;

/*
   *****   Here is the implementation for the To-do-list.   *****
   It is similar to MVC, although the View and Controller both in the same class
*/

/**
 * The main class. This responsible for both the view and working strategy
 */
class Controller{
    constructor(){
        // Variables of the Controller
        this.model = new Model();

        // Variables of the View
        this.collectionSection = null;
        this.inputSection = null;
    }

    // *** CONTROLLER ***
    
    /**
     * The main method. I recommend the usage of only this method if you do not know exactly what you are doing
     */
    run(){
        this.prepareView();
        this.prepareNavigation()

        this.collectionActivity();
    }

    /**
     * Controller method that control the view of the to-do collection .
     */
    collectionActivity(){
        let items = this.model.getAll();
        let percent = this.model.getPercentOfDone();
        this.showCollection(items, percent, index => {
            this.model.setDone(index)
            this.collectionActivity();
        });
    }

    saveNewTodo(title,description){
        this.model.insert(title,description);
    }

    // *** VIEW ***

    prepareView(){
        this.collectionSection = document.querySelector(".collection");
        this.inputSection = document.querySelector(".input");
    }
    
    showInputSection(){
        this.collectionSection.style.display = "none";
        this.inputSection.style.display = "block";

        let msg = this.inputSection.querySelectorAll('.message');
        msg[0].style.display = "none";
        msg[1].style.display = "none";
        this.inputSection.querySelector('button').onclick = e => {
            e.preventDefault();
            
            msg[0].style.display = "none";
            msg[1].style.display = "none";

            let title = document.getElementById('title').value;
            let description = document.getElementById('description').value;
            if(title.length > 2) {
                this.saveNewTodo(title,description);
                this.inputSection.querySelector('.message').style.display = "block";
                document.getElementById('title').value = "";
                description = document.getElementById('description').value = "";
            }
            else{
                msg[1].style.display = "block";
            }
        }
    }

    showCollection(items, persent, onDone){
        this.switchToCollectionView();
        this.updatePercentInfo(persent);
        if(items.length) this.updateList(items, onDone);
        else this.showEmptyMessage();
    }
    
    prepareNavigation(){
        let links = document.querySelectorAll("#navigation-bar a");
        links[0].onclick = e => {
            e.preventDefault();
            this.showInputSection();
        };
        links[1].onclick = e => {
            e.preventDefault();
            this.collectionActivity();
        };
    }

    switchToCollectionView(){
        this.inputSection.style.display = "none";
        this.collectionSection.style.display = "block";
    }

    updatePercentInfo(percent){
        let info = "";
        if(percent >= 0) info = percent + "% teljesítve"
        this.collectionSection.querySelector('p.info').innerHTML = info;
    }

    showEmptyMessage(){
        this.collectionSection.querySelector('ul').innerHTML = '<li><h3>Nincs teendőd</h3><p>Végeztél a teendőiddel, hozd létre a következőt</p></li>'
    }

    updateList(items, onDone){
        let html = '';

        for(let i in items){
            let item = items[i];
            html += ('<li><h3>'+ item.title +'</h3><p>'+ (item.description ? item.description : "Nincs leírása a teendőnek.") +'</p><div><a href="" data-index="'+ item.index +'">Elkészült</a></div></li>');
        }

        this.collectionSection.querySelector('ul').innerHTML = html;

        let links = this.collectionSection.querySelectorAll('ul a');

        function doneClick(evt){
            evt.preventDefault();
            let index = this.getAttribute("data-index");
            onDone(parseInt(index));
        }

        for(let i in links){
            links[i].onclick = doneClick;
        }
    }
}

/**
 * This class responsible for data storing.
 */
class Model{
    constructor(){
        this.list = [];

        this.refactoringData();
        this.loadData();
    }

    insert(title, description){
        this.list.push({
            index: this.list.length,
            title : title,
            description : description,
            done: false,
            time: this.getTime()
        });
        this.saveData();
    }

    getAll(){
        let result = [];

        for(let i in this.list){
            if(!this.list[i].done)
            result.push(this.list[i]);
        }

        return result;
    }

    setDone(index){
        this.list[index].done = true;
        this.list[index].time = this.getTime();
        this.saveData();
    }

    getPercentOfDone(){
        let total = this.list.length;

        if(total>0){
            let done = 0;

            for(let i in this.list){
                if(this.list[i].done)
                done++;
            }

            return parseInt((done / total) * 100);
        }
        return -1;
    }

    // "Privát" függvények

    getTime(){
        return parseInt((new Date().getTime())/1000/60/60/24);
    }

    loadData(){
        let data = localStorage.getItem("todoData");

        if(data){
            this.list = JSON.parse(data)
        }
    }
    saveData(){
        localStorage.setItem("Calyndra_todoData", JSON.stringify(this.list));
    }

    refactoringData(){
        let changes = false;

        for(let i = this.list.length - 1; i >= 0; i--){
            let item = this.list[i];
            if(item.done && time - item.time > 5){
                let begin = this.list.slice(0,i);
                let end = this.list.slice(i+1,this.list.length);

                this.list = begin.concat(end);
                changes = true;
            }
        }
        if(changes) this.saveData();
    }
}