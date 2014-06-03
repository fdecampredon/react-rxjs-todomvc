/*jshint node:true*/

var RxProperty  = require('../utils/rxProperty'),
    assign      = require('../utils/assign'),
    store       = require('../utils/store'),
    uuid        = require('../utils/uuid');


var key = 'todoapp';

var todosSubject = new RxProperty(store(key));
todosSubject.subscribe(function (value) {
    store(key, value);
});

var TodoStore = {
    todos: todosSubject.asObservable(),
    
    
    createTodo: function (title) {
        todosSubject.update(function (todos) {
            return todos.concat({
                id: uuid(),
                title: title,
                completed: false
            });
        });
    },
    
    updateTitle: function (updates) {
         todosSubject.update(function (todos) {
            return todos.map(function (todo) {
                return  todo !== updates.todo  ?
                            todo :
                            assign({}, todo, {title: updates.text})
                ;
            });
         });
    },
    
    toggle: function (todoToToggle) {
        todosSubject.update(function (todos) {
            return todos.map(function (todo) {
                return  todo !== todoToToggle ?
                            todo :
                            assign({}, todo, {completed: !todo.completed});
            });
        });
    },
    
    toggleAll: function (checked) {
        todosSubject.update(function (todos) {
            return todos.map(function (todo) {
                return {
                    id: todo.id,
                    title: todo.title,
                    completed: checked
                };
            });
        });
    },
    
    destroy: function (deletedTodo) {
        todosSubject.update(function (todos) {
            return todos.filter(function (todo) {
                return todo !== deletedTodo;
            });
        });
    },
        
    clearCompleted: function () {
        todosSubject.update(function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        });
    }
};



module.exports = TodoStore;