/*jshint node:true*/

var Rx = require('rx');

// simple mixin that give our components to interact with RxJS
// based on this version : https://github.com/reactjs/react-page/blob/rx/src/rxutils/RxMixin.js
var RxMixin = {
    componentWillMount: function() {
        this.stateStream = this.setState.bind(this);
    }
};

module.exports = RxMixin;



