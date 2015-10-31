/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand   		        --*/
/*--        \     \      /   31.10.15			            --*/
/*--   ______\     \    /	 brush.js         	            --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/

/**
 * Brush abstract base class
 * @abstract
 * @param ctx : canvas context
 * @param size : size of the brush
 * @param rvbColor : rvb brush color, format hex : "#FFFFFF"
 * @param opacity : opactiy of the brush
 * @constructor
 */
var Brush = function(ctx, size, rvbColor, opacity){

    this.ctx = ctx;
    this.size = size;
    this.rvbColor = rvbColor;
    this.opactiy = opacity;
};

/**
 * draw the brush at pos
 * @param x : x Pos
 * @param y : y Pos
 */
Brush.prototype.drawBrush = function(x, y){
    throw new Error("Can't use an abstract class!");
};



/**
 * Simple round brush, based on simples dots
 * Brush heritage
 * @param ctx : canvas context
 * @param size : size of the brush
 * @param rvbColor : rvb brush color
 * @param opacity : opactiy of the brush
 * @constructor
 */
var SimpleDotBrush = function (ctx, size, rvbColor, opacity) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Brush.call(this, ctx, size, rvbColor, opacity);

};
SimpleDotBrush.prototype = Object.create( Brush.prototype );

/**
 * draw the brush at pos
 * @param x : x Pos
 * @param y : y Pos
 */
SimpleDotBrush.prototype.drawBrush = function(x, y){
    this.ctx.beginPath();
    this.ctx.fillStyle=this.rvbColor;
    this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
};