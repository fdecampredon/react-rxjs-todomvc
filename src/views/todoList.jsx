/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/

'use strict';

var React           = require('react/addons'),
    EventHandler = require('../utils/eventHandler'),
    TodoItem        = require('./todoItem.jsx');


var TodoList = React.createClass({
    contextTypes: {
        toggleAll: React.PropTypes.func
    },
    
    componentWillMount: function () {
        var toggleAllChange = EventHandler.create();
        toggleAllChange
            .map(event => event.target.checked)
            .subscribe(this.context.toggleAll);
        
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
            )
        });
        
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




