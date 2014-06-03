/**
 * @jsx React.DOM
 */

/*jshint node:true*/
'use strict';

var React           = require('react/addons'),
    EventHandler    = require('../utils/eventHandler'),
    TodoActions     = require('../actions/todoActions');

var ENTER_KEY = 13;

var TodoHeader = React.createClass({
    componentWillMount() {
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
            .filter(value => !!value)
            .subscribe(TodoActions.create);
        
        enterEvent
            .forEach(function (event) {
                event.target.value = '';
            });
        
        
        this.handlers = {
            newFieldKeyDown: newFieldKeyDown
        };
    },
    
    render() {
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