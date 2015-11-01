/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   27.10.15			            --*/
/*--   ______\     \    /	 draw.js         	            --*/
/*--  /             \  /	 Draw class                     --*/
/*-- /_______________\/							            --*/

var Draw = function(ctx, posX, posY, width, height){

    this.context = ctx;
    this.pos = {x : posX, y : posY};
    this.width = width;
    this.height = height;

    this.bitmapImage;


    /**
     * Initialize the bitmapImage in white
     */
    var imageData = new ImageData(this.width, this.height);
    for(var i = 0; i < imageData.data.length; i++){
        imageData.data[i]=255;
    }

    this.bitmapImage = imageData;

};

/**
 * Add an element on the draw
 * @param elementBitmap : element to add
 */
Draw.prototype.save = function () {
    this.bitmapImage = this.context.getImageData(this.pos.x,this.pos.y,this.width,this.height);
};

/**
 * Draw the actual draw (bitmapImage)
 */
Draw.prototype.drawMe = function () {

    this.context.putImageData(this.bitmapImage, this.pos.x, this.pos.y);
};

/**
 * Clear the draw
 */
Draw.prototype.clearDraw = function () {

    this.context.clearRect(this.pos.x,this.pos.y, this.width, this.height);
    this.context.fillStyle = "white";
    this.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    this.bitmapImage = this.context.getImageData(this.pos.x, this.pos.y, this.width, this.height);
};