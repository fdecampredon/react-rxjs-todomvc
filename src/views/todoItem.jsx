/**
 * @jsx React.DOM
 */
/*jshint node:true*/

'use strict';

var React           = require('react/addons'),
    EventHandler    = require('../utils/eventHandler'),
    TodoActions     = require('../actions/TodoActions'),
    createComp      = require('../utils/createComp');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var cx = React.addons.classSet;

module.exports = createComp(
    {
        editing: false,
        editText: null
    },
    function (props, state, api) {
        
        function submit () {
            var val = state.editText.trim();
            if (val) {
                TodoActions.updateTitle.onNext({
                    text: val,
                    todo: props.todo
                });
                api.setState({
                    editText: val, 
                    editing: false
                });
            } else {
                TodoActions.destroy.onNext(props.todo);
            }
        }

        var todo = props.todo;
        var getTodo = function () { return todo; };

        var toggleClick = EventHandler.create();
        toggleClick
            .map(getTodo)
            .subscribe(TodoActions.toggle);

        var destroyButtonClick = EventHandler.create();
        destroyButtonClick
            .map(getTodo)
            .subscribe(TodoActions.destroy);

        var labelDoubleClick = EventHandler.create();
        labelDoubleClick
            .map(function () { 
                return { editing: true };
            })
            .subscribe(api.setState);

        var editFieldKeyDown = EventHandler.create();
        editFieldKeyDown
            .filter(function (event) {
                return event.keyCode === ESCAPE_KEY;
            })
            .map(function () {
                return {
                    editing: false,
                    editText: props.todo.title
                };
            })
            .subscribe(api.setState);

        editFieldKeyDown
            .filter(function (event) {
                return event.keyCode === ENTER_KEY;
            })
            .subscribe(submit);

        var editFieldBlur  = EventHandler.create();
        editFieldBlur
            .subscribe(submit);

        var editFieldChange = EventHandler.create();
        editFieldChange
            .map(function (e) {
                return {
                    editText: e.target.value
                };
            });

        return (
            <li className={cx({
                completed: props.todo.completed,
                editing: state.editing
            })}>
                <div className="view">
                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={toggleClick}
                        checked={todo.completed}
                    />
                    <label ref="label" onDoubleClick={labelDoubleClick}>
                        {todo.title}
                    </label>
                    <button ref="destroyButton" className="destroy" onClick={destroyButtonClick} />
                </div>
                <input
                    ref="editField"
                    className="edit"
                    onKeyDown={editFieldKeyDown}
                    onBlur={editFieldBlur}
                    value={state.editText}
                    onChange={editFieldChange}
                    autoFocus={true}
                />
            </li>
        );
    }
);




