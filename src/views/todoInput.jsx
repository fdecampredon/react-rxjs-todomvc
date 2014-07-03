/**
 * @jsx React.DOM
 */
/*jshint node:true, eqnull: true*/

'use strict';

var React           = require('react/addons'),
    EventHandler    = require('../utils/eventHandler'),
    createComponent = require('../utils/createComponent');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;


module.exports = createComponent(function (props, state) {

    
        var editText = state.value.text != null? 
            state.value.text: 
            props.value;
    
        var save = EventHandler.create();
        save.forEach(function () {
            props.onSave(editText.trim());
            state({text: null});
        });

        var keyDown = EventHandler.create();
        keyDown
            .filter(function (event) {
                return event.keyCode === ESCAPE_KEY;
            })
            .subscribe(function () {
                props.onCancel();
                state({text: null});
            });

        keyDown
            .filter(function (event) {
                return event.keyCode === ENTER_KEY;
            })
            .subscribe(save);


        var change = EventHandler.create();
        change
            .map(function (e) {
                return {
                    editText: e.target.value
                };
            })
            .map(state);

        return (
          <input
            className={props.className}
            id={props.id}
            placeholder={props.placeholder}
            onBlur={save}
            change={change}
            onKeyDown={keyDown}
            value={editText}
            autoFocus={true}
          />
        );
    }
);




