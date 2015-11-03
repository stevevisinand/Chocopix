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
    // private values
    //

    //canvas
    canvas = document.getElementById('draw');
    context = canvas.getContext('2d');


    //draw
    var drawZone = new Draw(context, 10, 10, 500, 500);

    //default values
    var drawBrush = new SimpleDotBrush(context, 2, "#FF0000", 1.0, false);
    var eraserBrush = new SimpleDotBrush(context, 10, "#FF0000", 1.0, true);

    var pen = new Pencil(context, drawBrush);

    //use to detect the mouse click
    var pressed = false;


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

    /**
     * Simply clear the canvas
     * @param canvas
     */
    function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }


    /**
     * Add listener on mouseMove
     */
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        //var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
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
        //var message = 'Mouse DOWN: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);


        pen.addPoint(mousePos.x, mousePos.y);
        pressed = true;

    }, false);

    /**
     * Add listener on mouseDown : btn released
     */
    canvas.addEventListener("mouseup", function(evt) {
        var mousePos = getMousePos(canvas, evt);
        //var message = 'Mouse UP: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);


        pressed = false;
        pen.end();
        drawZone.save();
        clearCanvas();
        drawZone.drawMe();

    }, false);




    //
    // public values
    //

    //tools are the available tools
    drawModule.tools = [];

    /**
     * a pannelTool contain the informations to show the tools in the pannel
     * @param name : name of the tool
     * @param tool : the tool
     * @param isSelected : if it is currently in use
     * @param fctClick : function to activate when click on it
     */
    var pannelTool = function (name, tool, isSelected, fctClick) {
        this.name = name;
        this.tool = tool;
        this.isSelected = isSelected; //Draw per px

        this.clickTool = fctClick;
    };

    /**
     * Unselect all tools in drawModule.tools
     */
    function unselectAlltools(){
        drawModule.tools.forEach(function(tool) {
            tool.isSelected = false;
        });
    }

    //Create the pannel
    drawModule.tools.push(new pannelTool("Pinceau", drawBrush, true, function(){
        unselectAlltools();
        this.isSelected = true;
        pen.setBrush(this.tool);
    }));

    drawModule.tools.push(new pannelTool("Gomme", eraserBrush, false, function(){
        unselectAlltools();
        this.isSelected = true;
        pen.setBrush(this.tool);
    }));

    /**
     * Main draw function, call it when redrawing scene is necessary
     */
    drawModule.draw = function(){
        if (canvas.getContext) {
            drawZone.drawMe();
        }
    };




    return drawModule;
});