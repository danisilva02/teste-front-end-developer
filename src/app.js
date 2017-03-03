  var angular = require('angular');
  require('angular-router-browserify')(angular)

  var Run = require('./config/run'),
  main = require('./controllers/main'),
  Config = require('./routes/Routes');

angular.module('app', ["ngRoute","ngAnimate"])
.run(['$rootScope', '$timeout', Run])
.config(['$routeProvider', Config])
.controller('main',['$scope', '$rootScope', main]);
