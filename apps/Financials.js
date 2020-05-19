import Application from './Application.js';

export class Financials extends Application {
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
        
        // financialsDiv
        const financials_div = document.createElement('div');
        financials_div.id = 'financialsDiv';
        financials_div.className = "contactsDiv container col-10";
        canvas.append(financials_div);

        // financialsMainDiv
        const calendar_main_div = document.createElement('div');
        calendar_main_div.id = 'financialsMainDiv';
        calendar_main_div.className = "vm-main";
        financials_div.append(calendar_main_div);

        const title_bar_div = document.createElement('div');
        calendar_main_div.append(title_bar_div);
        title_bar_div.id = 'title-bar';
        title_bar_div.className = "vm-header";
    
        let h = document.createElement('h1');
        title_bar_div.append(h);
        h.textContent = 'My financials  ';

        let i = document.createElement('i');
        h.append(i);
        i.className = "fa fa-euro-sign";
    
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
        h.textContent = 'Add a new item';
    
        let form = document.createElement('form');
        input_section.append(form);
        form.action = "";
    
        let p = document.createElement('p');
        form.append(p);
        p.className = 'message';
        p.textContent = 'The details of the new item have been successfully recorded';
    
        p = document.createElement('p');
        form.append(p);
        p.className = 'message error';
    
        let div = document.createElement('div');
        form.append(div);
    
        let label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'amount';
        label.textContent = 'Amount';
    
        let input = document.createElement('input');
        div.append(input);
        input.type = 'number';
        input.id = 'amount';

        div = document.createElement('div');
        div.id = "currency_div";
        form.append(div);

        label = document.createElement('label');
        div.append(label);
        label.htmlFor = 'currency';
        label.textContent = 'Currency';
    
        input = document.createElement('input');
        div.append(input);
        input.type = 'text';
        input.id = 'currency';
    
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
        label.htmlFor = 'date';
        label.textContent = 'Date';
    
        input = document.createElement('input');
        div.append(input);
        input.id = 'date';
        input.type = "date";
        input.className = "todo-date"
    
        let button = document.createElement('button');
        form.append(button);
        button.textContent = 'Add item';
    
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
        a.title = 'New item';
        i = document.createElement('i');
        i.className = "fas fa-plus-square";
        a.append(i);
    
        li = document.createElement('li');
        ul.append(li);
    
        a = document.createElement('a');
        li.append(a);
        a.href = "";
        a.title = 'items list';
        i = document.createElement('i');
        i.className = "far fa-list-alt";
        a.append(i);
    
    }


}

export default Financials;

// *** It is similar to MVC, although the View and Controller both in the same class ***

/**
 * The main class. This responsible for both the view and business strategy
 */
class Controller{
    constructor(){
        // Variables of the Controller
        this.model = new Model();
        this.currency = null;

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
     * Controller method that control the view of the financial collection .
     */
    collectionActivity(){
        this.model.refactoringData();
        let items = this.model.getAllSortedByDate();
        if(items.length != 0) this.currency = items[0].currency;
        else this.currency = null;
        let sum = this.model.getSumAmount();
        this.showCollection(items, sum, index => {
            this.model.delete(index)
            this.collectionActivity();
        });
    }

    saveNewFinancial(amount, currency, description, date){
        this.model.insert(amount, currency, description, date);
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

        let currencyInputDiv = document.getElementById("currency_div");
        if(this.currency != null){
            currencyInputDiv.style.display = "none";
        }
        else{
            currencyInputDiv.style.display = "block";
        }

        this.inputSection.querySelector('button').onclick = e => {
            e.preventDefault();
            
            msg[0].style.display = "none";
            msg[1].style.display = "none";

            let amount = document.getElementById('amount').value;
            if(this.currency == null) this.currency = document.getElementById('currency').value;
            let description = document.getElementById('description').value;
            let date = document.getElementById('date').value;
            if(Date.parse(date).toString() != "NaN") {
                if(parseFloat(amount).toString() != "NaN"){
                    this.saveNewFinancial(amount, this.currency, description, date);
                    this.inputSection.querySelector('.message').style.display = "block";
                    document.getElementById('amount').value = "";
                    document.getElementById('description').value = "";
                    currencyInputDiv.style.display = "none";
                }
                else{
                    msg[1].style.display = "block";
                    msg[1].textContent = "The given amount is not valid!"
                }
            }
            else{
                msg[1].style.display = "block";
                msg[1].textContent = "The specified date is incorrect!"
            }
            
        }
    }

    showCollection(items, sum, onDone){
        this.switchToCollectionView();
        this.updateSumInfo(sum);
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

    updateSumInfo(sum){
        let info = "";
        if(this.currency != null) info = sum + " "+ this.currency +" the total value."
        this.collectionSection.querySelector('p.info').textContent = info;
    }

    showEmptyMessage(){
        this.collectionSection.querySelector('ul').textContent = "";
        let li = document.createElement('li');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        h3.textContent = "The list is empty";
        p.textContent = "Add a new item.";
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
            h6.className = "date";
            h6.textContent = "Date: " + item.date;
            li.append(h6);
            let h3 = document.createElement('h3');
            h3.textContent = item.amount + " " + item.currency.toUpperCase();
            li.append(h3);/*
            h3 = document.createElement('h3');
            h3.textContent = item.currency.toUpperCase();
            li.append(h3);*/
            let p = document.createElement('p');
            p.textContent = (item.description ? item.description : "No description.");
            li.append(p);
            let div = document.createElement('div');
            let a = document.createElement('a');
            a.href = "";
            a.setAttribute("data-index",item.index)
            div.append(a)
            let iTag = document.createElement('i');
            iTag.className = "fa fa-trash";
            iTag.onclick = evt =>{
                evt.preventDefault();
                onDone(parseInt(item.index));
            }
            a.append(iTag);
            li.append(div);
            if(parseFloat(item.amount) >= 0) {
                li.className = "positive";
            }
            else{
                li.className = "negative";
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

    insert(amount, currency, description, date){
        this.list.unshift({
            index: this.list.length,
            amount : amount,
            currency : currency,
            description : description,
            date: date,
            deleted: false
        });
        this.saveData();
    }
/*
    getAll(){
        let result = [];

        for(let i in this.list){
            if(!this.list[i].deleted)
            result.push(this.list[i]);
        }

        return result;
    }
*/
    getAllSortedByDate(){
        let result = this.list;
        

        if(result.length > 0){
            for(let i = result.length; i > 0; i--){
                for(let j = 0; j < i-1; j++){
                    if(Date.parse(result[j].date) < Date.parse(result[j+1].date) ){
                        let  tmp = result[j];
                        result[j] = result[j+1];
                        result[j+1] = tmp;
                    }
                }
            }
        }

        return result;
    }

    delete(index){
        for(let i in this.list){
            if(this.list[i].index == index){
                this.list[i].deleted = true;
            }
        }
        this.saveData();
    }

    // "Privát" függvények

    getTime(){
        return parseInt((new Date().getTime())/1000/60/60/24);
    }

    loadData(){
        let data = localStorage.getItem("Calyndra_financials");

        if(data){
            this.list = JSON.parse(data)
        }
    }
    saveData(){
        localStorage.setItem("Calyndra_financials", JSON.stringify(this.list));
    }

    refactoringData(){
        let changes = false;
        
        for(let i = this.list.length - 1; i >= 0; i--){
            let item = this.list[i];
            let time = this.getTime();
            if(item.deleted /*|| time - Date.parse(item.date)/1000/60/60/24 > 30*/){
                let begin = this.list.slice(0,i);
                let end = this.list.slice(i+1,this.list.length);

                this.list = begin.concat(end);
                changes = true;
            }
        }
        if(changes) this.saveData();
    }

    getSumAmount(){
        let sum = 0.0;
        for(let i in this.list){
            sum += parseFloat(this.list[i].amount);
        }
        return sum;
    }
}
