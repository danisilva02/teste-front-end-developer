module.exports = function($routeProvider){
  $routeProvider
       .when('/',{
           controller: 'main',
           templateUrl:'views/includes/container.html'

    });
}
