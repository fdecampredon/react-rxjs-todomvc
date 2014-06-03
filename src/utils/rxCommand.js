/*jshint node:true*/

var Rx                  = require('rx');
var getPropertyNames    = require('./getPropertyNames');
var Promise             = require('bluebird');

var subjectProperties = getPropertyNames(Rx.Subject.prototype);

exports.create= function (cb, thisObject) {
    var command = function (arg) {
        return Promise.resolve(cb.call(thisObject, arg))
            .then(function (res) {
                command.onNext.call(command, res);
            }, function (err) {
                command.onError.calll(command, err);
            });
    };
    
    subjectProperties.forEach(function (property) {
        command[property] = Rx.Subject.prototype[property];
    });
    Rx.Subject.call(command);
    
    return command;
};