///////// cortoller module
// module pattern returns an object containing all functions taht we want to be public
// in IIFE, var and methods are private
// Separate concerns
/** Budget Controller: tracking all expenses and incomes and totals */
var budgetController = (function() {
    // function constructor for lots of objects
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // data structures for tracking expenses and incomes and totals
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // create new item
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            // push into data structure
            data.allItems[type].push(newItem);
            // return new item
            return newItem;
        },
        testing: function() {
            console.log(data);
        }
    }
})();

/** UI Controller */
var uiController = (function() {
    // make get strings easier
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list"
    }
    // get data from input
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        addListItem: function(obj, type) {
            var html, element;
            // create HTML stringe with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = 
                `
                <div class="item clearfix" id="income-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${obj.value}</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = 
                `
                <div class="item clearfix" id="expense-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${obj.value}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `
            }
            // replace the placeholder text with some actual data
            // newHtml = html.replace('%id%', obj.id).replace('%description%', obj.description).replace('%value', obj.value);
            
            // insert the HTML into UI
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    }
})();

/** Global App Controller */
var controller = (function(budgetCtrl, uiCtrl) {
    var setupEventListeners = function() {
        var DOMstrs = uiCtrl.getDOMstrings();
        document.querySelector(DOMstrs.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {// "return" key is pressed
                ctrlAddItem();
            }
            
        });
    };
    var ctrlAddItem = function() {
        var input, newItem;
        // 1. Get the filed input data
        input = uiCtrl.getInput();
        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        // 3. add the item to the UI
        uiCtrl.addListItem(newItem, input.type);
        // 4. calculate the budget
        // 5. Display the budget on the UI
    }
    return {
        // create public initialization function
        init: function() {
            console.log("Application has started.");
            setupEventListeners();
        }
    }
})(budgetController, uiController);

controller.init();