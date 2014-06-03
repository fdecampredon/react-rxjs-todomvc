/*jshint node:true*/

var Rx = require('rx');

function Property(value) {
    Rx.BehaviorSubject.call(this, value);
}

Property.prototype = Object.create(Rx.BehaviorSubject.prototype, {
    constructor: {
        value: Property,
        writable: true,
        configurable: true
    }
});

Property.prototype.update = function (func) {
    this.onNext(func(this.value));
};