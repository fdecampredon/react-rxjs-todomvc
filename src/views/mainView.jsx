/**
 * @jsx React.DOM
 */

/*jshint node: true, browser: true, newcap:false, esnext: true*/
'use strict';


var React           = require('react/addons'),
    Router          = require('director').Router,
    Rx              = require('rx'),
    TodoStore       = require('../stores/todoStore');
    routes          = require('../routes'),
    TodoHeader      = require('./header.jsx'),
    TodoFooter      = require('./footer.jsx'),
    TodoList        = require('./todoList.jsx');


var MainView = React.createClass({
    getInitialState: function () {
        return {};
    },
    
    componentWillMount() {
        var currentRoute = new Rx.BehaviorSubject(''),
            onNext = currentRoute.onNext;    

        var router = Router({
            '/': function () {
              currentRoute.onNext(routes.ALL_TODOS); 
            },
            '/active': function () {
              currentRoute.onNext(routes.ACTIVE_TODOS); 
            },
            '/completed':function () {
              currentRoute.onNext(routes.COMPLETED_TODOS); 
            },
        });
        
        router.init('/');
        
        var shownTodos = TodoStore.todos
            .combineLatest(
                currentRoute,
                function (todos, currentRoute) { 
                    
                    var activeTodoCount = todos.reduce(function (accum, todo) {
                        return todo.completed ? accum : accum + 1;
                    }, 0);

                    var completedCount = todos.length - activeTodoCount;
                    
                    var shownTodos = todos.filter(function (todo) {
                        switch (currentRoute) {
                        case routes.ACTIVE_TODOS:
                            return !todo.completed;
                        case routes.COMPLETED_TODOS:
                            return todo.completed;
                        default:
                            return true;
                        }
                    }, this);
                    
                   return {
                       activeTodoCount: activeTodoCount,
                       completedCount: completedCount,
                       shownTodos: shownTodos,
                       currentRoute: currentRoute
                   };
                }
            )
            .subscribe(val => this.setState(val));
    },
    
    
    
    render() {
        var footer;
        if (this.state.activeTodoCount || this.state.completedCount) {
            footer = <TodoFooter count={this.state.activeTodoCount}
                                 completedCount={this.state.completedCount} 
                                 nowShowing={this.state.currentRoute}
                                 />
        }
        
        var list;
        if (this.state.shownTodos && this.state.shownTodos.length) {
            list = <TodoList todos={this.state.shownTodos} activeTodoCount={this.state.activeTodoCount} />
        }
        
        return (
            <div>
                <TodoHeader />
                {list}
                {footer}
            </div>
        );
    }
});

module.exports = MainView;




