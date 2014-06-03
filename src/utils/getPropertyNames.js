/*jshint node:true*/

function getPropertyNames(subject) {
    var result = [];
    for (var key in subject) {
        result.push(key);
    }
    return result;
}

module.exports = getPropertyNames;