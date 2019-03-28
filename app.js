///////// cortoller module
// module pattern returns an object containing all functions taht we want to be public
// in IIFE, var and methods are private
// Separate concerns
/** Budget Controller */
var budgetController = (function() {
    // TODO
})();

/** UI Controller */
var uiController = (function() {
    // TODO
})();

/** Global App Controller */
var controller = (function(budgetCtrl, uiCtrl) {
    var ctrlAddItem = function() {
        // 1. Get the filed input data
        // 2. add the item to the budget controller
        // 3. add the item to the UI
        // 4. calculate the budget
        // 5. Display the budget on the UI
    }
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {// "return" key is pressed
            ctrlAddItem();
        }
    })
})(budgetController, uiController);