/*jshint node:true*/

module.exports = function assign(target, items) {
    
    items = [].slice.call(arguments);
    
    return items.reduce(function (target, item) {
        return Object.keys(item).reduce(function (target, property) {
            target[property] = item[property];
            return target;
        }, target);
    }, target);
};