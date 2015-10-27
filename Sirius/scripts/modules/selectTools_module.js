/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   26.10.15			            --*/
/*--   ______\     \    /	 selectTools_module.js     	    --*/
/*--  /             \  /	 "Selecting  draw tools module" --*/
/*-- /_______________\/							            --*/


(function() {
    
    var appModule = angular.module('selectTools-directives', ['resizeModule']);
    
    //====================================================================
    //====================================================================
    //========================DRAW TOOLS DIRECT===========================
    //==== left pannel infos, buttons listeners                       ====
    //====================================================================
    appModule.directive("drawtoolspannel", function(resizeUtils) {
      return {
        restrict: "E",
        templateUrl: "views/leftpannel-tools.html",
        controller: function($scope, resizeUtils) {

            this.name = "Control";
        
            //TODO: remove this test
            this.clickTest = function(){
                alert("Hello !");
            };
            
            
            //resize the windows when this module is loaded
            var w = $(window);
            resizeUtils.resizeApp(w.width(), w.height());

        },
        controllerAs: "panel"
      };
    });

})();