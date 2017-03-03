module.exports = function($rootScope, $timeout){
    $rootScope.$on('$stateChangeSuccess', function () {
        $timeout(function () {
            // componentHandler.upgradeAllRegistered();
        });
    });
}
