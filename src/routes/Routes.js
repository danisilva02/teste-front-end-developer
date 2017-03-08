module.exports = function($routeProvider){

  // console.log(aplicativoAPI);
  // var aplicativoAPI = require('../services/service');
  // aplicativoAPI().$inject = ['$http', 'APP_SETTINGS'];

  $routeProvider.when('/',{
           controller: 'main',
           templateUrl:'views/includes/container.html'

    });
    $routeProvider.when('/dashboard',{
            controller: 'dashboard',
            controllerAs:'vm',
            templateUrl:'views/includes/dashboard.html'
     });
     $routeProvider.when('/administracao',{
             controller: 'administracao',
             controllerAs:'vm',
             templateUrl:'views/includes/administracao.html'
      });
      $routeProvider.when('/processo',{
              controller: 'processo',
              controllerAs:'vm',
              templateUrl:'views/includes/processo.html'
       });
}
