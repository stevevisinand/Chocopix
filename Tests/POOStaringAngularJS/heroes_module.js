
(function() {
    var appModule = angular.module('heroes-directives', []);


    appModule.directive("addHero", function () {
        return {
            restrict: 'E',
            templateUrl: "addhero-view.html"
        };
    });
    // ATTENTION TOUJOURS COMMENCER PAR UNE MINUSCULE
    appModule.directive("heroView", function () {
        return {
            restrict: 'E',
            templateUrl: "hero-view.html"

        };
    });

})();