/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false*/

'use strict';

var React           = require('react/addons'),
    Rx              = require('rx'),
    RxMixin         = require('../utils/rxMixin'),
    TodoActions     = require('../actions/TodoActions'),
    TodoItem        = require('./todoItem.jsx');


var TodoApp = React.createClass({
    mixins: [RxMixin],
    
    getSubjects: function () {
        var toggleAllChange = new Rx.Subject();
        toggleAllChange
            .map(function (event) {
                return event.target.checked;
            })
            .subscribe(TodoActions.toggleAll);
        
        return {
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

module.exports = TodoApp;




