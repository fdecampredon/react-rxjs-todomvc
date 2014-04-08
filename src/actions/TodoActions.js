/*jshint node : true */

var Rx      = require('rx'),
    assign  = require('../utils/assign'),
    uuid    = require('../utils/uuid');

var TodoActions = {
  create: new Rx.Subject(),
  updateTitle: new Rx.Subject(),
  toggle: new Rx.Subject(),
  toggleAll: new Rx.Subject(),
  destroy: new Rx.Subject(),
  clearCompleted: new Rx.Subject(),
};

TodoActions.register = function (updates) {
    this.create
        .map(function (title) {
            return function (todos) {
                return todos.concat({
                    id: uuid(),
                    title: title,
                    completed: false
                });
            };
        })
        .subscribe(updates);
    
    this.updateTitle
        .map(function(update) {
            var todoToSave = update.todo,
                text = update.text;
            return function (todos) {
                return todos.map(function (todo) {
                    return  todo !== todoToSave  ?
                                todo :
                                assign({}, todo, {title: text})
                    ;
                });
            };
        })
        .subscribe(updates);
    
    this.toggle
        .map(function(todoToToggle) {
            return function (todos) {
                return todos.map(function (todo) {
                    return  todo !== todoToToggle ?
                                todo :
                                assign({}, todo, {completed: !todo.completed});
                });
            };
        })
        .subscribe(updates);
    
    
    this.toggleAll
        .map(function(checked) {
            return function (todos) {
                return todos.map(function (todo) {
                    return {
                        id: todo.id,
                        title: todo.title,
                        completed: checked
                    };
                });
            };
        })
        .subscribe(updates);
    
    
    this.destroy
        .map(function(deletedTodo) {
            return function (todos) {
                return todos.filter(function (todo) {
                    return todo !== deletedTodo;
                });
            };
        })
        .subscribe(updates);
    
    
    this.clearCompleted
        .map(function () {
            return function (todos) {
                return todos.filter(function (todo) {
                    return !todo.completed;
                });
            };
        })
        .subscribe(updates);
};


module.exports = TodoActions;