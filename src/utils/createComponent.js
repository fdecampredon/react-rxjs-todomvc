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

function createComponent(render, shouldComponentUpdate) {
    shouldComponentUpdate = shouldComponentUpdate || function (nextProps, nexState) {
        return !shallowEqual(this.props || {}, nextProps || {}) || 
            !shallowEqual(this.state || {}, nexState || {});
    };
    var component = React.createClass({
        shouldComponentUpdate: shouldComponentUpdate,
        
        render: function() {
            var state = this.setState.bind(this);
            state.value = this.state || {};
            return render(this.props || {}, state);
        }
    });
    return component;
}
module.exports = createComponent;