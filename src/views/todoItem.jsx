/**
 * @jsx React.DOM
 */
/*jshint node:true, unused: true, newcap: false*/

'use strict';

var React           = require('react/addons'),
    EventHandler    = require('../utils/eventHandler'),
    TodoActions     = require('../actions/TodoActions'),
    createComponent = require('../utils/createComponent'),
    TodoInput       = require('./todoInput.jsx');


var cx = React.addons.classSet;

module.exports = createComponent(function (props, state) {

        var todo = props.todo;
        var getTodo = function () { return todo; };
    
        var editing = state.value.editing || false;
    
        function submit (text) {
            if (text) {
                TodoActions.updateTitle.onNext({
                    text: text,
                    todo: props.todo
                });
                state({ editing: false });
            } else {
                TodoActions.destroy.onNext(props.todo);
            }
        }
    
        function cancel () {
            state({editing: false});
        }

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
            .subscribe(state);

        var input;
        if (editing) {
            input = (
                <TodoInput
                    className="edit"
                    onSave={submit}
                    onCancel={cancel}
                    value={todo.title}
                    autoFocus={true}
                />
            );
        }
        

        return (
            <li className={cx({
                completed: todo.completed,
                editing: editing
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
                {input}
            </li>
        );
    }
);




