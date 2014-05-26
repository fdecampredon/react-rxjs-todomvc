/*jshint node:true*/

var Rx = require('rx');

var RxLifecycleMixin = {
    componentWillMount: function () {
        this.lifecycle = {
            componentWillMount: new Rx.Subject(),
            componentDidMount : new Rx.Subject(),
            componentWillReceiveProps : new Rx.Subject(),
            componentWillUpdate : new Rx.Subject(),
            componentDidUpdate : new Rx.Subject(),
            componentWillUnmount: new Rx.Subject()
        };
    },
    
    componentDidMount: function () {
        this.lifecycle.componentDidMount.onNext();
    },
    
    componentWillReceiveProps: function (nextProps) {
        this.lifecycle.componentWillReceiveProps.onNext(nextProps);
    },
    
    componentWillUpdate: function (nextProps, nextState) {
        this.lifecycle.componentWillUpdate.onNext({
            nextProps: nextProps, 
            nextState: nextState
        });
    },
    
    componentDidUpdate: function (prevProps, prevState) {
        this.lifecycle.componentDidUpdate.onNext({
            prevProps: prevProps, 
            prevState: prevState
        });
    },
    
    componentWillUnmount: function () {
        this.lifecycle.componentWillUnmount.onNext();
    }
};

module.exports = RxLifecycleMixin;
