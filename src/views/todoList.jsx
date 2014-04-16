/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/

'use strict';

var React           = require('react/addons'),
    EventHandler = require('../utils/eventHandler'),
    TodoActions     = require('../actions/TodoActions'),
    TodoItem        = require('./todoItem.jsx');


var TodoList = React.createClass({
    componentWillMount: function () {
        var toggleAllChange = EventHandler.create();
        toggleAllChange
            .map(function (event) {
                return event.target.checked;
            })
            .subscribe(TodoActions.toggleAll);
        
        this.handlers = {
            toggleAllChange: toggleAllChange
        }
    },
    
    

    render: function () {
        var todoItems = this.props.todos.map(function (todo) {
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
                    checked={this.props.activeTodoCount === 0}
                    onChange={this.handlers.toggleAllChange}
                />
                <ul id="todo-list">
                    {todoItems}
                </ul>
            </section>
        );
    }
});

module.exports = TodoList;




