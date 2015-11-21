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


drawModule.factory('drawUtils', function($sce) { //$SCE to sanitize
    var drawModule = {};


    //
    // private values
    //

    //canvas
    canvas = document.getElementById('draw');
    context = canvas.getContext('2d');


    //public value
    drawModule.primaryColor = "FF0000";
    drawModule.secondaryColor = "00FF00";

    /**
     * Main draw function, call it when redrawing scene is necessary
     */
    drawModule.draw = function(){
        if (canvas.getContext) {
            drawZone.drawMe();
        }
    };

    //draw
    var drawZone = new Draw(context, 10, 10, 500, 500);

    //default tools
    var drawBrush = new SimpleDotBrush(context, 2, drawModule.primaryColor, 1.0, false);
    var eraserBrush = new SimpleDotBrush(context, 10, drawModule.primaryColor, 1.0, true);

    var pen = new Pencil(context, "Pinceau", $sce.trustAsHtml('<i class="fa fa-paint-brush"></i>'),
        drawBrush);
    var eraser = new Pencil(context, "Gomme", $sce.trustAsHtml('<i class="fa fa-eraser"></i>'),
        eraserBrush);

    var rectangle = new Rectangle(context, "Rectangle", $sce.trustAsHtml('<i class="fa fa-square-o"></i>'),
        drawModule.primaryColor, drawModule.secondaryColor, 2, true, true, drawModule.draw);
    var oval = new Oval(context, "Elipse", $sce.trustAsHtml('<i class="fa fa-circle-o"></i>'),
        drawModule.primaryColor, drawModule.secondaryColor, 2, true, true, drawModule.draw);


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
    drawModule.tools.push(rectangle);
    drawModule.tools.push(oval);



    drawModule.selectTool = function (atool){
        selectedTool = atool;
        callAbonned();
    };

    drawModule.isSelected = function (atool){
        return Object.is(atool, selectedTool);
    };

    drawModule.setPrimaryColor = function (colorRGB){
        this.primaryColor = colorRGB;

        pen.getBrush().setRvbColor(colorRGB);
        rectangle.strokeColor = colorRGB;

    };

    drawModule.setSecondaryColor = function(colorRGB){
        this.secondaryColor = colorRGB;

        rectangle.fillColor = colorRGB;
    };

    drawModule.isPenSelected = function(){
        return (selectedTool instanceof Pencil);
    };

    drawModule.isShapeSelected = function(){
        return (selectedTool instanceof Shape);
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

    drawModule.setSizeStokeSelectedTool = function(size){

        if(selectedTool instanceof  Shape){
            selectedTool.lineWidth = size;
        }
        else{
            throw new Error("No shape selected");
        }
    };
    drawModule.getSizeStokeSelectedTool = function(){

        if(selectedTool instanceof  Shape){
            return selectedTool.lineWidth;
        }
        else{
            throw new Error("No shape selected");
        }
    };

    drawModule.setIsStokeSelectedTool = function(is){

        if(selectedTool instanceof  Shape){
            selectedTool.stroked = is;
        }
        else{
            throw new Error("No shape selected");
        }
    };
    drawModule.getIsStokeSelectedTool = function(){

        if(selectedTool instanceof  Shape){
            return selectedTool.stroked;
        }
        else{
            throw new Error("No shape selected");
        }
    };
    drawModule.setIsFillSelectedTool = function(is){

        if(selectedTool instanceof  Shape){
            selectedTool.filled = is;
        }
        else{
            throw new Error("No shape selected");
        }
    };
    drawModule.getIsFillSelectedTool = function(){

        if(selectedTool instanceof  Shape){
            return selectedTool.filled;
        }
        else{
            throw new Error("No shape selected");
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




    return drawModule;
});