/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   27.10.15			            --*/
/*--   ______\     \    /	 resize_module.js         	    --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/

var resizeModule = angular.module('resizeModule', ['drawModule']);

drawModule.factory('resizeUtils', function(drawUtils) {
    var resizeModule = {};

    //
    // private attributs
    //




    //
    // public attributs
    //

    /**
     *   Resize the application width the news w and h values
     *   Defined in the rootScope ! shared methode
     *   Call automatically "resizeCanvas"
     *   w,h = new size
     */
    resizeModule.resizeApp = function(w, h){

        var h = h - $('#head').height() - 4; //border = 4px
        var left_pannels = $('.left_pannel');

        var widthPannels = 0;
        $('.left_pannel').each(function() {
            $(this).height(h);
            widthPannels = widthPannels + $(this).width();
        });

        resizeModule.resizeCanvas(w - widthPannels - 4, h);
    };

    /**
     *   Set a size on the canvas "#draw"
     *   Defined in the rootScope ! shared methode
     *   w, h = new sizes
     */
    resizeModule.resizeCanvas = function(w, h){
        var canvas = $('#draw');
        canvas.attr('width', w);
        canvas.attr('height', h);


        drawUtils.draw();
    };



    return resizeModule;
});