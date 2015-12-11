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

    //draw
    drawModule.drawZone = new Draw(10, 10, 500, 500);
    drawModule.drawZone.addCalc();
    drawModule.calcs = drawModule.drawZone.getCalcs();

    //var w = $(window);
    //resizeUtils.resizeApp(w.width(), w.height());

    //canvas
    canvas = drawModule.drawZone.getActualCanvas();
    context = drawModule.drawZone.getActualContext();


    //public value
    drawModule.primaryColor = "FF0000";
    drawModule.secondaryColor = "00FF00";

    /**
     * Main draw function, call it when redrawing scene is necessary
     */
    drawModule.draw = function(){
        if (canvas.getContext) {
            drawModule.drawZone.drawMe();
        }
    };


    //default tools
    var drawBrush = new SimpleDotBrush(drawModule.drawZone, 2, drawModule.primaryColor, 1.0, false);
    var eraserBrush = new SimpleDotBrush(drawModule.drawZone, 10, drawModule.primaryColor, 1.0, true);

    var pen = new Pencil(drawModule.drawZone, "Pinceau", $sce.trustAsHtml('<i class="fa fa-paint-brush"></i>'),
        drawBrush);
    var eraser = new Pencil(drawModule.drawZone, "Gomme", $sce.trustAsHtml('<i class="fa fa-eraser"></i>'),
        eraserBrush);
    var rectangle = new Rectangle(drawModule.drawZone, "Rectangle", $sce.trustAsHtml('<i class="fa fa-square-o"></i>'),
        drawModule.primaryColor, drawModule.secondaryColor, 2, true, true, drawModule.draw);
    var oval = new Oval(drawModule.drawZone, "Ellipse", $sce.trustAsHtml('<i class="fa fa-circle-o"></i>'),
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
        drawModule.drawZone.save();
        clearCanvas();
        drawModule.drawZone.drawMe();

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
        oval.strokeColor = colorRGB;
    };

    drawModule.setSecondaryColor = function(colorRGB){
        this.secondaryColor = colorRGB;

        rectangle.fillColor = colorRGB;
        oval.fillColor = colorRGB;
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

    drawModule.selectColorOnCanvas = function(fct){
        selectedTool = new Colorpick(drawModule.drawZone.getActualContext(), fct, drawModule.drawZone.width, drawModule.drawZone.height);
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

    drawModule.setActivCalc = function(calc){
        drawModule.drawZone.setActivCalc(calc);
        canvas = drawModule.drawZone.getActualCanvas();
        context = drawModule.drawZone.getActualContext();
    }


    return drawModule;
});