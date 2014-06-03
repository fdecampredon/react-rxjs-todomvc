/*jshint node:true*/

var Rx      = require('rx'),
    assign  = require('../utils/assign'),
    store   = require('../utils/store'),
    uuid    = require('../utils/uuid');

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

var key = 'todoapp';

var todosSubject = new Rx.BehaviorSubject(store(key));
todosSubject.subscribe(function (value) {
    store(key, value);
});

var TodoStore = {
    todos: todosSubject.asObservable(),
    
    
    createTodo(title) {
        todosSubject.update(function (todos) {
            return todos.concat({
                id: uuid(),
                title: title,
                completed: false
            });
        });
    },
    
    updateTitle(todoToSave, text) {
         todosSubject.update(function (todos) {
            return todos.map(function (todo) {
                return  todo !== todoToSave  ?
                            todo :
                            assign({}, todo, {title: text})
                ;
            });
         });
    },
    
    toggle(todoToToggle) {
        todosSubject.update(function (todos) {
            return todos.map(function (todo) {
                return  todo !== todoToToggle ?
                            todo :
                            assign({}, todo, {completed: !todo.completed});
            });
        });
    },
    
    toggleAll(checked) {
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
    
    destroy(deletedTodo) {
        todosSubject.update(function (todos) {
            return todos.filter(function (todo) {
                return todo !== deletedTodo;
            });
        });
    },
        
    clearCompleted() {
        todosSubject.update(function (todos) {
            return todos.filter(function (todo) {
                return !todo.completed;
            });
        });
    }
};



module.exports = TodoStore;