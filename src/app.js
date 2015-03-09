/*jshint node:true, browser: true*/

var Rx          = require('rx'),
    React       = require('react/addons'),
    TodoStore   = require('./store/todoStore'),
    TodoActions = require('./actions/TodoActions'),
    MainView    = require('./views/mainView.jsx');


var todoStore = new TodoStore('react-todos');

//register our actions against our store updates stream
TodoActions.register(todoStore.updates);

React.renderComponent(
    MainView({ todoStore: todoStore }),
    document.getElementById('todoapp')
); 


