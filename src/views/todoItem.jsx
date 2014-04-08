/**
 * @jsx React.DOM
 */
/*jshint node:true*/

'use strict';

var React       = require('react/addons'),
    Rx          = require('rx'),
    RxMixin     = require('../utils/rxMixin'),
    TodoActions = require('../actions/TodoActions');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = React.createClass({
    mixins: [RxMixin],
    
    
    getInitialState: function () {
        return {
            editing: false,
            editText: this.props.todo.title
        };
    },
    
    getSubjects: function () {
        var toggleClick = new Rx.Subject();
        toggleClick
            .map(this.getTodo)
            .subscribe(TodoActions.toggle);
        
        var destroyButtonClick = new Rx.Subject();
        destroyButtonClick
            .map(this.getTodo)
            .subscribe(TodoActions.destroy);
        
        var labelDoubleClick = new Rx.Subject();
        labelDoubleClick
            .map(function () { 
                return {
                    editing: true
                };
            })
            .subscribe(this.stateStream);
        
        var editFieldKeyDown = new Rx.Subject();
        editFieldKeyDown
            .filter(function (event) {
                return event.keyCode === ESCAPE_KEY;
            })
            .map(function () {
                return {
                    editing: false,
                    editText: this.props.todo.title
                };
            }.bind(this))
            .subscribe(this.stateStream);
        
        editFieldKeyDown
            .filter(function (event) {
                return event.keyCode === ENTER_KEY;
            })
            .subscribe(this.submit);
        
        var editFieldBlur  = new Rx.Subject();
        editFieldBlur
            .subscribe(this.submit);
        
        
        var editFieldChange = new Rx.Subject();
        editFieldChange
            .map(function (e) {
                return {
                    editText: e.target.value
                };
            })
            .subscribe(this.stateStream);
        
        return {
            toggleClick: toggleClick,
            destroyButtonClick: destroyButtonClick,
            labelDoubleClick : labelDoubleClick,
            editFieldKeyDown: editFieldKeyDown,
            editFieldBlur: editFieldBlur,
            editFieldChange: editFieldChange
        };
    },
    
    componentDidUpdate: function (prevProps, prevState) {
        if (this.state.editing && !prevState.editing) {
            var node = this.refs.editField.getDOMNode();
            node.focus();
            node.value = this.props.todo.title;
            node.setSelectionRange(node.value.length, node.value.length);
        }
    },
    
    submit: function () {
        var val = this.state.editText.trim();
        if (val) {
            TodoActions.updateTitle.onNext({
                text: val,
                todo: this.getTodo()
            });
            this.setState({
                editText: val, 
                editing: false
            });
        } else {
            TodoActions.destroy.onNext(this.props.todo);
        }
    },
    
    getTodo: function () {
        return this.props.todo;
    },
    

    /**
     * This is a completely optional performance enhancement that you can implement
     * on any React component. If you were to delete this method the app would still
     * work correctly (and still be very performant!), we just use it as an example
     * of how little code it takes to get an order of magnitude performance improvement.
     */
    shouldComponentUpdate: function (nextProps, nextState) {
        return (
            nextProps.todo !== this.props.todo ||
            nextState.editing !== this.state.editing ||
            nextState.editText !== this.state.editText
        );
    },

    render: function () {
        return (
            <li className={React.addons.classSet({
                completed: this.props.todo.completed,
                editing: this.state.editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={this.handlers.toggleClick}
                        checked={this.props.todo.completed}
                    />
                    <label ref="label" onDoubleClick={this.handlers.labelDoubleClick}>
                        {this.props.todo.title}
                    </label>
                    <button ref="destroyButton" className="destroy" onClick={this.handlers.destroyButtonClick} />
                </div>
                <input
                    ref="editField"
                    className="edit"
                    onKeyDown={this.handlers.editFieldKeyDown}
                    onBlur={this.handlers.editFieldBlur}
                    value={this.state.editText}
                    onChange={this.handlers.editFieldChange}
                />
            </li>
        );
    }
});

module.exports = TodoItem;
