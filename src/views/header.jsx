/**
 * @jsx React.DOM
 */

/*jshint node:true*/
'use strict';

var React           = require('react/addons'),
    EventHandler    = require('../utils/eventHandler'),
    TodoActions     = require('../actions/TodoActions');

var ENTER_KEY = 13;

var TodoHeader = React.createClass({
    componentWillMount: function () {
        var newFieldKeyDown = EventHandler.create();
        var enterEvent = newFieldKeyDown.filter(function (event) {
            return event.keyCode === ENTER_KEY;
        });
        
        enterEvent.forEach(function (event) {
            event.stopPropagation();
            event.preventDefault();
        });
        
        enterEvent
            .map(function (event) {
                return event.target.value.trim();
            })
            .filter(function (value) {
                return !!value;
            }).subscribe(TodoActions.create);
        
        enterEvent
            .forEach(function (event) {
                event.target.value = '';
            });
        
        
        this.handlers = {
            newFieldKeyDown: newFieldKeyDown
        };
    },
    
    render: function () {
        return (
            <header id="header">
                <h1>todos</h1>
                <input
                    id="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus={true}
                    onKeyDown={this.handlers.newFieldKeyDown}
                />
            </header>
        );
    }
});

module.exports = TodoHeader;