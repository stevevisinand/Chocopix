/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand   		        --*/
/*--        \     \      /   24.11.15			            --*/
/*--   ______\     \    /	 colorpick.js         	    --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/


/**
 * Pencil tool, Tool heritage
 * @param draw : contain canvas context
 * @constructor
 */
var Colorpick = function (draw, fctCallback, widthDraw, heightDraw) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Tool.call(this, draw, "", "");

    this.fctCallbackColor = fctCallback;
    this.widthDraw = widthDraw;
    this.heightDraw = heightDraw;

    //change cursor
    $('#draw').css( "cursor", "crosshair" );
};
Colorpick.prototype = Object.create( Tool.prototype );


/**
 * Add a point
 * @param x : Coord X on canvas of point to add
 * @param y : Coord Y on canvas of point to add
 */
Colorpick.prototype.addPoint = function(mouseX, mouseY){

    //  get imageData object from canvas
    var imagedata = this.ctx().getImageData(0, 0, this.widthDraw, this.heightDraw);

    //  get pixelArray from imagedata object
    var data = imagedata.data;

    //  calculate offset into array for pixel at mouseX/mouseY
    var i = ((mouseY * this.widthDraw) + mouseX) * 4;

    //  get RGBA values
    var r = data[i];
    var g = data[i+1];
    var b = data[i+2];
    //var a = data[i+3];

    this.fctCallbackColor(this.formatColor(r, g, b));
};

/**
 *
 * @param r : red value, 0 to 255
 * @param g : green value, 0 to 255
 * @param b : blue value, 0 to 255
 * @returns hex formated in string
 */
Colorpick.prototype.formatColor = function (r, g, b){
    return this.formatHex(r) + this.formatHex(g) + this.formatHex(b);
};

/**
 * Format a number decimal in hexadecimal with 2 numbers.
 * @param nb int between 0 and 255
 * @returns hex formated in string
 */
Colorpick.prototype.formatHex = function (nb){
    var nbString = nb.toString(16).toUpperCase();
    if(nbString.length != 2){
        nbString = "0"+nbString;
    }
    return nbString;
};

/**
 * Call this to end the line
 */
Colorpick.prototype.end = function(){
    $('#draw').css( "cursor", "auto" );
};
