var Nonsense = require('Nonsense');
var _        = require('underscore');
var ns       = new Nonsense();

module.exports = function generatePerson(){
    return {
        id: _.uniqueId('person'),
        name: ns.name(),
        jobTitle: ns.jobTitle(),
        businessPlan: ns.buzzPhrase(),
        aboutText: ns.sentences(4)
    };
};
