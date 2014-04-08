/*jshint node : true */

var Rx      = require('rx'),
    assign  = require('../utils/assign'),
    uuid    = require('../utils/uuid');

/**
 * A set of actions that will be exposed into views
 * Thoses actions will trigger model update
 */
var TodoActions = {
  create: new Rx.Subject(),
  updateTitle: new Rx.Subject(),
  toggle: new Rx.Subject(),
  toggleAll: new Rx.Subject(),
  destroy: new Rx.Subject(),
  clearCompleted: new Rx.Subject(),
};

/**
 * Register our actions against an updates stream
 * each one of our actions will push operation to apply on the model
 * into the stream.
 */
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