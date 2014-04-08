/*jshint node:true*/

var Rx      = require('rx'),
    assign  = require('../utils/assign'),
    store   = require('../utils/store');

// our store expose 2 streams :
// `updates`: that should receive operations to be applied on our list of todo
// `todos`: an observable that will contains our up to date list of todo
function TodoStore(key) {
    this.updates = new Rx.BehaviorSubject(store(key));
    
    this.todos = this.updates
        .scan(function (todos, operation) {
            return operation(todos);
        });
    
    
    this.key = key;
    this.todos.forEach(function (todos) {
        store(key, todos);
    });
}



module.exports = TodoStore;