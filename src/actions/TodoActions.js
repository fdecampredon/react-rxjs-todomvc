/*jshint node : true */

var RxCommand   = require('../utils/rxCommand'),
    TodoStore   = require('../stores/todoStore');

/**
 * A set of actions that will be exposed into views
 * Thoses actions will trigger model update
 */
var TodoActions = {
  create: RxCommand.create(TodoStore.createTodo),
  updateTitle: RxCommand.create(TodoStore.updateTitle),
  toggle: RxCommand.create(TodoStore.toggle),
  toggleAll: RxCommand.create(TodoStore.toggleAll),
  destroy: RxCommand.create(TodoStore.destroy),
  clearCompleted: RxCommand.create(TodoStore.clearCompleted),
};


module.exports = TodoActions;