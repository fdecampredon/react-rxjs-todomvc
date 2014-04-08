/*jshint node:true, browser: true*/

var Rx          = require('rx'),
    React       = require('react/addons'),
    TodoStore   = require('./store/todoStore'),
    TodoActions = require('./actions/todoActions'),
    MainView    = require('./views/mainView.jsx');

var todoStore = new TodoStore('react-todos');

TodoActions.register(todoStore.updates);

React.renderComponent(
    MainView({ todoStore: todoStore }),
    document.getElementById('todoapp')
); 


