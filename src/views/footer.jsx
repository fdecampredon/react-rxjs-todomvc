/**
 * @jsx React.DOM
 */

/*jshint node:true*/
'use strict';


var React           = require('react/addons'),
    pluralize       = require('../utils/pluralize'),
    EventHandler    = require('../utils/eventHandler'),
    routes          = require('../routes'),
    TodoActions     = require('../actions/TodoActions'),
    createComponent = require('../utils/createComponent');

var clearButtonClick = EventHandler.create();
clearButtonClick.subscribe(TodoActions.clearCompleted);

module.exports = createComponent(function (props) {
    var activeTodoWord = pluralize(props.count, 'item');
    var clearButton = null;
    if (props.completedCount > 0) {
        clearButton = (
            <button
                id="clear-completed"
                onClick={clearButtonClick}>
                Clear completed ({props.completedCount})
            </button>
        );
    }

    // React idiom for shortcutting to `classSet` since it'll be used often
    var cx = React.addons.classSet;
    var nowShowing = props.nowShowing;
    return (
        <footer id="footer">
            <span id="todo-count">
                <strong>{props.count}</strong> {activeTodoWord} left
            </span>
            <ul id="filters">
                <li>
                    <a
                        href="#/"
                        className={cx({selected: nowShowing === routes.ALL_TODOS})}>
                            All
                    </a>
                </li>
                {' '}
                <li>
                    <a
                        href="#/active"
                        className={cx({selected: nowShowing === routes.ACTIVE_TODOS})}>
                            Active
                    </a>
                </li>
                {' '}
                <li>
                    <a
                        href="#/completed"
                        className={cx({selected: nowShowing === routes.COMPLETED_TODOS})}>
                            Completed
                    </a>
                </li>
            </ul>
            {clearButton}
        </footer>
    );

});
