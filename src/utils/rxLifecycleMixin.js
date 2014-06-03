/*jshint node:true*/

var Rx = require('rx');

var RxLifecycleMixin = {
    componentWillMount() {
        this.lifecycle = {
            componentWillMount: new Rx.Subject(),
            componentDidMount : new Rx.Subject(),
            componentWillReceiveProps : new Rx.Subject(),
            componentWillUpdate : new Rx.Subject(),
            componentDidUpdate : new Rx.Subject(),
            componentWillUnmount: new Rx.Subject()
        };
    },
    
    componentDidMount() {
        this.lifecycle.componentDidMount.onNext();
    },
    
    componentWillReceiveProps(nextProps) {
        this.lifecycle.componentWillReceiveProps.onNext(nextProps);
    },
    
    componentWillUpdate(nextProps, nextState) {
        this.lifecycle.componentWillUpdate.onNext({
            nextProps: nextProps, 
            nextState: nextState
        });
    },
    
    componentDidUpdate(prevProps, prevState) {
        this.lifecycle.componentDidUpdate.onNext({
            prevProps: prevProps, 
            prevState: prevState
        });
    },
    
    componentWillUnmount() {
        this.lifecycle.componentWillUnmount.onNext();
    }
};

module.exports = RxLifecycleMixin;
