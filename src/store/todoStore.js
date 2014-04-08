/*jshint node:true*/

var Rx      = require('rx'),
    assign  = require('../utils/assign'),
    store   = require('../utils/store');


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