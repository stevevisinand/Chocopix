/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   27.10.15			            --*/
/*--   ______\     \    /	 draw_module.js         	    --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/


var drawModule = angular.module('drawModule', []);


drawModule.factory('drawUtils', function() {
    var drawModule = {};

    //
    // private attributs
    //

    canvas = document.getElementById('draw');

    /**
     * get the mouse pos in the canvas
     * @param canvas : canvas (scene)
     * @param evt : contains mouse pos in the windows
     * @returns {{x: number, y: number}}
     */
    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }


    var pen = new Pencil(canvas.getContext('2d'));
    var pressed = false;
    /**
     * Add listener on mouseMove
     */
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);

        if(pressed) {
            pen.addPoint(mousePos.x, mousePos.y);
        }

    }, false);


    /**
     * Add listener on mouseDown : btn pressed
     */
    canvas.addEventListener("mousedown", function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse DOWN: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);


        pen.addPoint(mousePos.x, mousePos.y);
        pressed = true;



    }, false);

    /**
     * Add listener on mouseDown : btn released
     */
    canvas.addEventListener("mouseup", function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse UP: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);


        pressed = false;
        pen.end();

    }, false);



    //
    // public attributs
    //

    /**
     * Main draw function, call it when redrawing scene is necessary
     */
    drawModule.draw = function(){
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.fillStyle = "#FF0000";
            ctx.fillRect(200, 100, 90, 90);
        }
    };


    return drawModule;
});