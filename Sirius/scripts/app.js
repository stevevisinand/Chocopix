/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   26.10.15			            --*/
/*--   ______\     \    /	 app.js     		            --*/
/*--  /             \  /	 "Main angularJS file"		    --*/
/*-- /_______________\/							            --*/


(function() {

    var app = angular.module('Drawer', ['selectTools-directives', 'calcs-directives', 'drawModule', 'resizeModule']);


    
    app.run(function($rootScope) {
        
        // ==> Define globals attribute of all "scopes" here
        
        //Module for the window resizing
        //$rootScope.resizeModule = {};
        
        //Module to call the draw functions
        //$rootScope.drawModule = {};
        //$rootScope.drawModule.canvas = document.getElementById('draw');
    });
    
    //====================================================================
    //====================================================================
    //==========================Global CTRL===============================
    //==== Windows resizing                                           ====
    //====================================================================
    
    app.controller('GlobalViewCtrl', function ($scope, drawUtils, resizeUtils) {
        
        // --- --- --- --- --- --- --- --- --- --- ---
        // --- --- --- --- JS resizing --- --- --- ---
        // --- --- --- --- --- --- --- --- --- --- ---
        
        /**
        *   Return the dimention of the window
        */
        var w = $(window);
        $scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                'w': w.width()
            };
        };
        
        /**
        *   Listen the changes in the windows dimension and resize the app
        */
        $scope.$watch($scope.getWindowDimensions, function(newValue) {

            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;
            resizeUtils.resizeApp(newValue.w,newValue.h);
            
        }, true);

        /**
        *   Keep the size listener alive
        */
        w.bind('resize', function () {
            $scope.$apply();
        });


        // --- --- --- --- --- --- --- --- --- --- ---

    });
    
    
    app.controller('DrawZoneCtrl', function($scope, drawUtils){
        drawUtils.draw();
    });
    
    
})();


