/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   27.10.15			            --*/
/*--   ______\     \    /	 tool.js         	            --*/
/*--  /             \  /	 Abstract Tool class            --*/
/*-- /_______________\/							            --*/

/**
 * Tools base abstract class
 * @abstract
 * @param ctx
 * @constructor
 */
var Tool = function(draw, name, ico){

    this.draw = draw;
    this.name = name;
    this.ico = ico;
};

/**
 * Add a point
 * @param x : Coord X on canvas of point to add
 * @param y : Coord Y on canvas of point to add
 */
Tool.prototype.addPoint = function(x, y){
    throw new Error("Can't use an abstract class!");
};

/**
 * Call this to end the line
 */
Tool.prototype.end = function(){
    throw new Error("Can't use an abstract class!");
};

/**
 * get the current ctx
 */
Tool.prototype.ctx = function(){
    return this.draw.getActualContext();
};

