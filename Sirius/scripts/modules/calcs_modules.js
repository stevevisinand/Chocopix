/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand   		        --*/
/*--        \     \      /   07.12.15			            --*/
/*--   ______\     \    /	 calcs_modules         	        --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/


(function() {

    var appModule = angular.module('calcs-directives', ['drawModule']);


    appModule.directive("calcspannel", function(drawUtils) {
        return {
            restrict: "E",
            templateUrl: "views/leftpannel-calcs.html",
            controller: function($scope, drawUtils) {

                //Strings values
                this.name = "Calques";
                this.calcs = drawUtils.calcs;

                this.drawZone = drawUtils.drawZone;
                this.setActivCalc = function(calc){
                    drawUtils.setActivCalc(calc);
                };

            },
            controllerAs: "panelcalc"
        };
    });

    appModule.filter("reverse", function(){
        return function(items){
            return items.slice().reverse(); // Create a copy of the array and reverse the order of the items
        };
    });

})();