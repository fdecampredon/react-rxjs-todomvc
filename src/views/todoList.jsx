/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/

'use strict';

var React           = require('react/addons'),
    EventHandler    = require('../utils/eventHandler'),
    TodoActions     = require('../actions/TodoActions'),
    TodoItem        = require('./todoItem.jsx'),
    createComponent = require('../utils/createComponent');

var toggleAllChange = EventHandler.create();
toggleAllChange
    .map(function (event) {
        return event.target.checked;
    })
    .subscribe(TodoActions.toggleAll);
        
var TodoList = createComponent(function (props) {
    var todoItems = props.todos.map(function (todo) {
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
            />
        );
    }, this);

    return (
        <section id="main">
            <input
                id="toggle-all"
                type="checkbox"
                checked={props.activeTodoCount === 0}
                onChange={toggleAllChange}
            />
            <ul id="todo-list">
                {todoItems}
            </ul>
        </section>
    );
});

module.exports = TodoList;




