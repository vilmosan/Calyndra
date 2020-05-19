//   *****   Here is the implementation for the To-do-list.   *****

import Application from './Application.js';

export class Calandar extends Application {
    constructor(canvas) {
        super(canvas);


        this.initialize();

    }

    initialize() {
        this.initializeCanvas(this.canvas);
        
        let contr = new Controller();
        contr.run();
    }

    /**
     * This code create the required HTML into a div
     */
    initializeCanvas(canvas){   
        
        // calendarDiv
        const calendar_div = document.createElement('div');
        calendar_div.id = 'calendarDiv';
        calendar_div.className = "contactsDiv container col-10";
        canvas.append(calendar_div);

        // calendarMainDiv
        const calendar_main_div = document.createElement('div');
        calendar_main_div.id = 'calendarMainDiv';
        calendar_main_div.className = "vm-main";
        calendar_div.append(calendar_main_div);

        const title_bar_div = document.createElement('div');
        calendar_main_div.append(title_bar_div);
        title_bar_div.id = 'title-bar';
        title_bar_div.className = "vm-header";
    
        let h = document.createElement('h1');
        title_bar_div.append(h);
        h.textContent = 'My To-do list  ';

        let i = document.createElement('i');
        h.append(i);
        i.className = "fas fa-clipboard-list";
    
        const main_div = document.createElement('div');
        calendar_main_div.append(main_div);
        main_div.id = 'main';
    
        const inside_div = document.createElement('div');
        main_div.append(inside_div);
        inside_div.className = 'inside';
    
        const input_section = document.createElement('section');
        inside_div.append(input_section);
        input_section.className = "input";
    
        h = document.createElement('h2');
        input_section.append(h);
        h.textContent = 'Add a new task';
    
        let form = document.createElement('form');
        input_section.append(form);
        form.action = "";
    
        let p = document.createElement('p');
        form.append(p);
        p.className = 'message';
        p.textContent = 'The details of the new task have been successfully recorded';
    
        p = document.createElement('p');
        form.append(p);
        p.className = 'message error';
    
        let div = document.createElement('div');
        form.append(div);
    
        let label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'title';
        label.textContent = 'Title';
    
        let input = document.createElement('input');
        div.append(input);
        input.type = 'text';
        input.id = 'title';
    
        div = document.createElement('div');
        form.append(div);
    
        label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'description';
        label.textContent = 'Description';
    
        input = document.createElement('textarea');
        div.append(input);
        input.id = 'description';

        div = document.createElement('div');
        form.append(div);

        label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'deadline';
        label.textContent = 'Deadline';
    
        input = document.createElement('input');
        div.append(input);
        input.id = 'deadline';
        input.type = "date";
        input.className = "todo-date"
    
        let button = document.createElement('button');
        form.append(button);
        button.textContent = 'Create';
    
        const collection_section = document.createElement('section');
        inside_div.append(collection_section);
        collection_section.className = "collection";
        
        p = document.createElement('p');
        collection_section.append(p);
        p.className = 'info';
    
        const list_ul = document.createElement('ul');
        collection_section.append(list_ul);
        list_ul.className = "list";
    
        const navigation_bar_div = document.createElement('div');
        calendar_main_div.append(navigation_bar_div);
        navigation_bar_div.id = 'navigation-bar';
    
        let ul = document.createElement('ul');
        navigation_bar_div.append(ul);
    
        let li = document.createElement('li');
        ul.append(li);
    
        let a = document.createElement('a');
        li.append(a);
        a.href = "";
        a.title = 'New task';
        i = document.createElement('i');
        i.className = "fas fa-plus-square";
        a.append(i);
    
        li = document.createElement('li');
        ul.append(li);
    
        a = document.createElement('a');
        li.append(a);
        a.href = "";
        a.title = 'Tasks list';
        i = document.createElement('i');
        i.className = "far fa-list-alt";
        a.append(i);
    
    }


}

export default Calandar;


// *** It is similar to MVC, although the View and Controller both in the same class ***

/**
 * The main class. This responsible for both the view and business strategy
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

    saveNewTodo(title, description, deadline){
        this.model.insert(title, description, deadline);
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
            let deadline = document.getElementById('deadline').value;
            if(Date.parse(deadline).toString() != "NaN" && Date.parse(deadline)/1000/60/60/24 >= this.model.getTime()) {
                if(title.length > 2) {
                    this.saveNewTodo(title, description, deadline);
                    this.inputSection.querySelector('.message').style.display = "block";
                    document.getElementById('title').value = "";
                    document.getElementById('description').value = "";
                    document.getElementById('deadline').value = "";
                }
                else{
                    msg[1].style.display = "block";
                    msg[1].textContent = 'The title you entered is too short! (at least 3 characters)';
                }
            }
            else{
                msg[1].style.display = "block";
                msg[1].textContent = "The specified expiration date has either expired or is incorrect!"
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
        if(percent >= 0) info = percent + "% completed"
        this.collectionSection.querySelector('p.info').textContent = info;
    }

    showEmptyMessage(){
        this.collectionSection.querySelector('ul').textContent = "";
        let li = document.createElement('li');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        h3.textContent = "You have nothing to do";
        p.textContent = "You're done with your tasks, create the following";
        li.append(h3);
        li.append(p);
        this.collectionSection.querySelector('ul').append(li);
    }

    updateList(items, onDone){
        this.collectionSection.querySelector('ul').textContent = "";

        for(let i in items){
            let item = items[i];
            let li = document.createElement('li');
            let h6 = document.createElement('h6');
            h6.className = "deadline";
            h6.textContent = "Deadline: " + item.deadline;
            li.append(h6);
            let h3 = document.createElement('h3');
            h3.textContent = item.title;
            li.append(h3);
            let p = document.createElement('p');
            p.textContent = (item.description ? item.description : "The task has no description.");
            li.append(p);
            let div = document.createElement('div');
            let a = document.createElement('a');
            a.href = "";
            a.setAttribute("data-index",item.index)
            div.append(a)
            let iTag = document.createElement('i');
            iTag.className = "fas fa-check";
            iTag.onclick = evt =>{
                evt.preventDefault();
                onDone(parseInt(item.index));
            }
            a.append(iTag);
            li.append(div);
            if(Date.parse(item.deadline)/1000/60/60/24 < this.model.getTime()) {
                li.className = "expired";
            }
            this.collectionSection.querySelector('ul').append(li);
        }
    }
}

/**
 * This class responsible for data storing.
 */
class Model{
    constructor(){
        this.list = [];

        this.loadData();
        this.refactoringData();
    }

    insert(title, description, deadline){
        this.list.push({
            index: this.list.length,
            title : title,
            description : description,
            done: false,
            time: this.getTime(),
            deadline: deadline
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
        let data = localStorage.getItem("Calyndra_todoData");

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
            let time = this.getTime();
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