  var r = require('angular-router-browserify')(angular)

  var Run = require('./config/run'),
  main = require('./controllers/main'),
  Config = require('./routes/Routes'),
  urls = require('./config/config'),
  service = require('./services/service'),
  dashboard = require('./controllers/dashboard'),
  administracao = require('./controllers/administracao'),
  processo = require('./controllers/processo'),
  createDash = require('./factory/createDashboard');

angular.module('app', ["ngRoute","ngAnimate"])
.run(['$rootScope', '$timeout','$http', 'APP_SETTINGS', Run])
.constant('APP_SETTINGS',urls)
.service('aplicativoAPI',['$http', 'APP_SETTINGS', service])
.factory('createDash', createDash)
.controller('main',['$scope', '$rootScope','APP_SETTINGS', main])
.controller('dashboard',['$scope','$rootScope','aplicativoAPI', 'createDash',  dashboard])
.controller('administracao',['$scope','$rootScope','aplicativoAPI',  administracao])
.controller('processo',['$scope','$rootScope','aplicativoAPI',  processo])
.config(['$routeProvider', Config]);
