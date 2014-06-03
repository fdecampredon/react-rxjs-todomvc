/*jshint node:true, proto: true*/

var Rx                  = require('rx');
var getPropertyNames    = require('./getPropertyNames');

var subjectProperties = getPropertyNames(Rx.Subject.prototype);

exports.create = function () {
    var subject = function() {
        subject.onNext.apply(subject, arguments);
    };
    
    subjectProperties.forEach(function (property) {
        subject[property] = Rx.Subject.prototype[property];
    });
    
    Rx.Subject.call(subject);
    
    return subject;
};
