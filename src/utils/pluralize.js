/*jshint node:true*/

module.exports = function pluralize(count, word) {
    return count === 1 ? word : word + 's';
};
