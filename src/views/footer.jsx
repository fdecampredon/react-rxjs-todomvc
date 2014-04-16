/**
 * @jsx React.DOM
 */

/*jshint node:true*/
'use strict';


var React       = require('react/addons'),
    pluralize   = require('../utils/pluralize'),
    EventHandler = require('../utils/eventHandler'),
    routes      = require('../routes'),
    TodoActions = require('../actions/TodoActions');

var TodoFooter = React.createClass({
    componentWillMount: function () {
        var clearButtonClick = EventHandler.create();
        clearButtonClick.subscribe(TodoActions.clearCompleted);
        this.handlers = {
          clearButtonClick : clearButtonClick
        };
    },
    
    render: function () {
        var activeTodoWord = pluralize(this.props.count, 'item');
        var clearButton = null;

       if (this.props.completedCount > 0) {
            clearButton = (
                <button
                    id="clear-completed"
                    onClick={this.handlers.clearButtonClick}>
                    Clear completed ({this.props.completedCount})
                </button>
            );
        }

        // React idiom for shortcutting to `classSet` since it'll be used often
        var cx = React.addons.classSet;
        var nowShowing = this.props.nowShowing;
        return (
            <footer id="footer">
                <span id="todo-count">
                    <strong>{this.props.count}</strong> {activeTodoWord} left
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
    }
});

module.exports = TodoFooter;