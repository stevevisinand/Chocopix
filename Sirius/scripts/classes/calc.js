/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand   		        --*/
/*--        \     \      /   01.12.15			            --*/
/*--   ______\     \    /	 calc         	                --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/

var Calc = function(posX, posY, width, height, id){

    this.id = id;

    $('#drawing_zone').append('<canvas id="draw-'+id+'" class="draw" ng-controller="DrawZoneCtrl"></canvas>');

    this.canvas = document.getElementById('draw-'+id);
    this.context = this.canvas.getContext('2d');


    this.pos = {x : posX, y : posY};
    this.width = width;
    this.height = height;

    this.bitmapImage;

    /**
     * Initialize the bitmapImage in white
     */
    var imageData = new ImageData(this.width, this.height);

    /*for(var i = 0; i < imageData.data.length; i++){
        imageData.data[i]=255;
    }*/

    this.bitmapImage = imageData;



    this.name = "calc "+this.id;

};

/**
 * Add an element on the draw
 * @param elementBitmap : element to add
 */
Calc.prototype.save = function () {
    this.bitmapImage = this.context.getImageData(this.pos.x,this.pos.y,this.width,this.height);
};

/**
 * Draw the actual draw (bitmapImage)
 */
Calc.prototype.drawMe = function () {
    this.context.putImageData(this.bitmapImage, this.pos.x, this.pos.y);
};

/**
 * Clear the draw
 */
Calc.prototype.clearDraw = function () {

    this.context.clearRect(this.pos.x,this.pos.y, this.width, this.height);
    this.context.fillStyle = "white";
    this.context.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    this.bitmapImage = this.context.getImageData(this.pos.x, this.pos.y, this.width, this.height);
};