/**
 * @jsx React.DOM
 */

/*jshint node:true*/
'use strict';

var React           = require('react/addons'),
    Rx              = require('rx'),
    RxMixin         = require('../utils/rxMixin'),
    TodoActions     = require('../actions/todoActions');

var ENTER_KEY = 13;

var TodoHeader = React.createClass({
    mixins: [RxMixin],
    getSubjects: function () {
        var newFieldKeyDown = new Rx.Subject();
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
        
        
        return {
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