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

    var app = angular.module('Drawer', ['selectTools-directives']);

    
    
    app.run(function($rootScope) {
        
        // ==> Define globals attribute of all "scopes" here
        
        //Module for the window resizing
        $rootScope.resizeModule = {};
    });
    
    //====================================================================
    //====================================================================
    //==========================Global CTRL===============================
    //==== Windows resizing                                           ====
    //====================================================================
    
    app.controller('GlobalViewCtrl', function ($scope, $rootScope) {
        
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
            $scope.resizeModule.resizeApp(newValue.w,newValue.h);
            
        }, true);

        /**
        *   Keep the size listener alive
        */
        w.bind('resize', function () {
            $scope.$apply();
        });
        
        /**
        *   Resize the application width the news w and h values
        *   Defined in the rootScope ! shared methode
        *   Call automatically "resizeCanvas"
        *   w,h = new size
        */
        $rootScope.resizeModule.resizeApp = function(w, h){
            
            var h = h - $('#head').height() - 4; //border = 4px
            var left_pannels = $('.left_pannel');

            var widthPannels = 0;
            $('.left_pannel').each(function() {
                $(this).height(h);
                widthPannels = widthPannels + $(this).width();
            });

            $scope.resizeModule.resizeCanvas(w - widthPannels - 4, h); 
        };
        
        /**
        *   Set a size on the canvas "#draw"
        *   Defined in the rootScope ! shared methode
        *   w, h = new sizes
        */
        $rootScope.resizeModule.resizeCanvas = function(w, h){
            var canvas = $('#draw');
            canvas.attr('width', w);
            canvas.attr('height', h);
        };
        
        
        // --- --- --- --- --- --- --- --- --- --- ---
    
        
    });
    
    app.controller('DrawZoneCtrl', function(){
    
    });
    
    
})();


