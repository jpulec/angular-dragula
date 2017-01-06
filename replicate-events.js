'use strict';

var atoa = require('atoa');
var events = [
  'cancel',
  'cloned',
  'drag',
  'dragend',
  'drop',
  'out',
  'over',
  'remove',
  'shadow',
  'drop-model',
  'remove-model'
];

function replicateEvents (angular, bag) {
  events.forEach(replicator);

  function replicator (type) {
    bag.drake.on(type, replicate);

    function replicate () {
      var args = atoa(arguments).map(angularize);
      args.unshift(bag.name + '.' + type);
      var scope = args[1].scope();
      scope.$emit.apply(scope, args);
    }
  }

  function angularize (value) {
    if (angular.isElement(value)) {
      return angular.element(value);
    }
    return value;
  }
}

module.exports = replicateEvents;
