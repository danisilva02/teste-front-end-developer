module.exports = function($rootScope, $timeout, $http, APP_SETTINGS){

    $rootScope.getApi = $http;
    $rootScope.allUlrs = APP_SETTINGS();

    // $rootScope.$on('$stateChangeSuccess', function () {
    //     $timeout(function () {
    //         // componentHandler.upgradeAllRegistered();
    //     });
    // });
}
