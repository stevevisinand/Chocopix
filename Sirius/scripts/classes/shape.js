/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand   		        --*/
/*--        \     \      /   18.11.15			            --*/
/*--   ______\     \    /	 Shape         	    --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/


var Shape = function (ctx, name, ico, strokeColor, fillColor, lineWidth, stroked, filled, clearFct) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Tool.call(this, ctx, name, ico);

    this.startPoint = null;
    this.lastPoint = null;
    this.cleanCanvas = clearFct;

    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.lineWidth = lineWidth;

    this.filled = filled;
    this.stroked = stroked;
};
Shape.prototype = Object.create( Tool.prototype );



var Rectangle = function (ctx, name, ico,strokeColor, fillColor, lineWidth, stroked, filled, clearFct) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Shape.call(this, ctx, name, ico, strokeColor, fillColor, lineWidth, stroked, filled, clearFct);
};
Rectangle.prototype = Object.create( Shape.prototype );

/**
 * Add a point
 * @param x : Coord X on canvas of point to add
 * @param y : Coord Y on canvas of point to add
 */
Rectangle.prototype.addPoint = function(x, y){

    if(this.startPoint == null){
        this.startPoint = { x:x, y:y };
    }
    else{
        this.cleanCanvas();

        this.lastPoint = {x: x, y: y};

        if(this.filled){
            this.ctx.fillStyle="#" + this.fillColor;
            this.ctx.fillRect(this.startPoint.x, this.startPoint.y, this.lastPoint.x - this.startPoint.x, this.lastPoint.y - this.startPoint.y);
        }
        if(this.stroked) {
            this.ctx.lineWidth = this.lineWidth;
            this.ctx.strokeStyle = "#" + this.strokeColor;
            this.ctx.strokeRect(this.startPoint.x, this.startPoint.y, this.lastPoint.x - this.startPoint.x, this.lastPoint.y - this.startPoint.y);
        }
    }

};

/**
 * Call this to end the line
 */
Rectangle.prototype.end = function(){
    this.startPoint = null;
};


var Oval = function (ctx, name, ico, strokeColor, fillColor, lineWidth, stroked, filled, clearFct) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Shape.call(this, ctx, name, ico, strokeColor, fillColor, lineWidth, stroked, filled, clearFct);
};
Oval.prototype = Object.create( Shape.prototype );

/**
 * Add a point
 * @param x : Coord X on canvas of point to add
 * @param y : Coord Y on canvas of point to add
 */
Oval.prototype.addPoint = function(x, y){

    if(this.startPoint == null){
        this.startPoint = { x:x, y:y };
    }
    else{
        this.cleanCanvas();

        this.lastPoint = {x: x, y: y};

        this.drawEllipse((this.startPoint.x+this.lastPoint.x)/2 , (this.startPoint.y+this.lastPoint.y)/2,
            (this.lastPoint.x - this.startPoint.x)/2, (this.lastPoint.y - this.startPoint.y)/2);

    }

};

Oval.prototype.drawEllipse = function(cx, cy, rx, ry){
    this.ctx.save(); // save context state
    this.ctx.beginPath();

    this.ctx.translate(cx-rx, cy-ry);
    this.ctx.scale(rx, ry);
    this.ctx.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.ctx.restore(); // restore the original context state


    // apply styling
    if(this.filled) {
        this.ctx.fillStyle = "#" + this.fillColor;
        this.ctx.fill();
    }
    if(this.stroked) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = "#" + this.strokeColor;
        this.ctx.stroke();
    }
};

/**
 * Call this to end the line
 */
Oval.prototype.end = function(){
    this.startPoint = null;
};
