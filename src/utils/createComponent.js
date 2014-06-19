/*jshint node:true*/

var React   = require('react/addons');
var Rx      = require('rx');

function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var key;
  // Test for A's keys different from B.
  for (key in objA) {
    if (objA.hasOwnProperty(key) &&
        (!objB.hasOwnProperty(key) || objA[key] !== objB[key])) {
      return false;
    }
  }
  // Test for B'a keys missing from A.
  for (key in objB) {
    if (objB.hasOwnProperty(key) && !objA.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function createComponent(initialState, render, shouldComponentUpdate) {
    if (typeof initialState === 'function') {
        shouldComponentUpdate = render;
        render = initialState;
        initialState = {};
    }
    shouldComponentUpdate = shouldComponentUpdate || function (nextProps, nexState) {
        return !shallowEqual(this.props, nextProps) || 
            !shallowEqual(this.state, nexState);
    };
    
    var api = {
        componentWillMount: new Rx.Subject(),
        componentDidMount : new Rx.Subject(),
        componentWillReceiveProps : new Rx.Subject(),
        componentWillUpdate : new Rx.Subject(),
        componentWillUnmount: new Rx.Subject(),
        
        getDOMNode: function () {
            return component.getDOMNode();
        },
        setState: function (state, callback) {
            component.setState(state, callback);
        }
    };
    
    var component = React.createClass({
        getInitialState: function () {
            return initialState;
        },
        componentWillMount: function () {
          api.componentWillMount.onNext();  
        },
        componentDidMount: function () {
          api.componentDidMount.onNext();  
        },
        componentWillReceiveProps: function (nextProps) {
          api.componentWillMount.onNext(nextProps);  
        },
        componentWillUpdate: function (nextProps, nextState) {
          api.componentWillMount.onNext({
              nextProps: nextProps,
              nextState: nextState
          });  
        },
        componentWillUnmount: function () {
          api.componentWillMount.onNext();  
        },
        shouldComponentUpdate: shouldComponentUpdate,
        
        render: function() {
            return render(this.props, this.state, api);
        }
    });
    return component;
}
module.exports = createComponent;