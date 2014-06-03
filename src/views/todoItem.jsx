/**
 * @jsx React.DOM
 */

/*jshint node:true, esnext: true*/

'use strict';

var React               = require('react/addons'),
    EventHandler        = require('../utils/eventHandler'),
    TodoActions         = require('../actions/TodoActions'),
    RxLifecycleMixin    = require('../utils/rxLifecycleMixin');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = React.createClass({
    mixins: [RxLifecycleMixin],
    getInitialState: function () {
        return {
            editing: false,
            editText: this.props.todo.title
        };
    },
    
    componentWillMount: function () {
        var setState = this.setState.bind(this);
        
        var toggleClick = EventHandler.create();
        toggleClick
            .map(() => this.props.todo)
            .subscribe(TodoActions.toggle);
        
        var destroyButtonClick = EventHandler.create();
        destroyButtonClick
            .map(() => this.props.todo)
            .subscribe(TodoActions.destroy);
        
        var labelDoubleClick = EventHandler.create();
        labelDoubleClick
            .map(() => { return { editing: true}; })
            .subscribe(setState);
        
        var editFieldKeyDown = EventHandler.create();
        editFieldKeyDown
            .filter(event => event.keyCode === ESCAPE_KEY)
            .map(() => {
                return{
                    editing: false,
                    editText: this.props.todo.title
                };
             })
            .subscribe(setState);
        
        editFieldKeyDown
            .filter(event => event.keyCode === ENTER_KEY)
            .subscribe(this.submit);
        
        var editFieldBlur  = EventHandler.create();
        editFieldBlur
            .subscribe(this.submit);
        
        
        var editFieldChange = EventHandler.create();
        editFieldChange
            .map(e => { return { editText: e.target.value }; })
            .subscribe(setState);
        
        this.lifecycle.componentDidUpdate
            .filter(prev => this.state.editing && !prev.prevState.editing)
            .subscribe(() => {
                var node = this.refs.editField.getDOMNode();
                node.focus();
                node.value = this.props.todo.title;
                node.setSelectionRange(node.value.length, node.value.length);
            });
        
        this.handlers = {
            toggleClick: toggleClick,
            destroyButtonClick: destroyButtonClick,
            labelDoubleClick : labelDoubleClick,
            editFieldKeyDown: editFieldKeyDown,
            editFieldBlur: editFieldBlur,
            editFieldChange: editFieldChange
        };
    },
    
    
    submit: function () {
        var val = this.state.editText.trim();
        if (val) {
            TodoActions.updateTitle({
                text: val,
                todo: this.props.todo
            });
            this.setState({
                editText: val, 
                editing: false
            });
        } else {
            TodoActions.destroy(this.props.todo);
        }
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
