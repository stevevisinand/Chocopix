/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   27.10.15			            --*/
/*--   ______\     \    /	 draw.js         	            --*/
/*--  /             \  /	 Draw class                     --*/
/*-- /_______________\/							            --*/

var Draw = function(posX, posY, width, height){

    this.pos = {x : posX, y : posY};
    this.width = width;
    this.height = height;

    this.bitmapElements = [];
};

/**
 * Add an element on the draw
 * @param elementBitmap : element to add
 */
Draw.prototype.addBitmap = function (elementBitmap) {
    this.bitmapElements.append(elementBitmap);
};

/**
 * Clear the draw
 */
Draw.prototype.clearDraw = function () {
    this.bitmapElements.clear();
};