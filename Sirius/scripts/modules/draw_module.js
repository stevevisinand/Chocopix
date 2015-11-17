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


    //public value
    drawModule.primaryColor = "FF0000";
    drawModule.secondaryColor = "FF0000";

    //
    // private values
    //


    //canvas
    canvas = document.getElementById('draw');
    context = canvas.getContext('2d');


    //draw
    var drawZone = new Draw(context, 10, 10, 500, 500);

    //default tools
    var drawBrush = new SimpleDotBrush(context, 2, drawModule.primaryColor, 1.0, false);
    var eraserBrush = new SimpleDotBrush(context, 10, drawModule.primaryColor, 1.0, true);

    var pen = new Pencil(context, "Pinceau", drawBrush);
    var eraser = new Pencil(context, "Gomme", eraserBrush);


    // tool selected
    var selectedTool = pen;

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
            selectedTool.addPoint(mousePos.x, mousePos.y);
        }

    }, false);


    /**
     * Add listener on mouseDown : btn pressed
     */
    canvas.addEventListener("mousedown", function(evt) {
        var mousePos = getMousePos(canvas, evt);
        //var message = 'Mouse DOWN: ' + mousePos.x + ',' + mousePos.y;
        //console.log(message);


        selectedTool.addPoint(mousePos.x, mousePos.y);
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
        selectedTool.end();
        drawZone.save();
        clearCanvas();
        drawZone.drawMe();

    }, false);

    //
    // public values
    //

    //the available tools
    drawModule.tools = [];
    drawModule.tools.push(pen);
    drawModule.tools.push(eraser);


    drawModule.selectTool = function (atool){
        selectedTool = atool;
        callAbonned();
    };

    drawModule.isSelected = function (atool){
        return Object.is(atool, selectedTool);
    };

    drawModule.setPrimaryColor = function (colorRGB){
        this.primaryColor = colorRGB;

        if(Object.is(selectedTool, pen)){
            pen.getBrush().setRvbColor(colorRGB);
        }
        else if(Object.is(selectedTool, eraser)){
            //eraser.getBrush().setRvbColor(colorRGB);
        }

    };

    drawModule.isPenSelected = function(){
        return (selectedTool instanceof Pencil);
    };

    drawModule.getBrushSelectedTool = function(){
        if (selectedTool instanceof Pencil){
            return selectedTool.getBrush();
        }
        else{
            throw new Error("No pencil selected");
        }
    };
    drawModule.setBrushSelectedTool = function(brush){
        if (selectedTool instanceof Pencil){
            selectedTool.setBrush(brush);
        }
        else{
            throw new Error("No pencil selected");
        }
    };

    drawModule.getDensitySelectedTool = function(){
        if (selectedTool instanceof Pencil){
            return selectedTool.getDensity();
        }
        else{
            throw new Error("No pencil selected");
        }
    };
    drawModule.setDensitySelectedTool = function(density){
        if (selectedTool instanceof Pencil){
            selectedTool.setDensity(density);
        }
        else{
            throw new Error("No pencil selected");
        }
    };


    var abonnedFcts = [];
    var callAbonned = function(){
        for(var i=0;i<abonnedFcts.length; i++){
            abonnedFcts[i]();
        }
    }
    drawModule.abonementCallbackChangeTool = function (fct){
        abonnedFcts.push(fct);
    }

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