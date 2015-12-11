/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand   		        --*/
/*--        \     \      /   18.11.15			            --*/
/*--   ______\     \    /	 Pencil         	    --*/
/*--  /             \  /	                                --*/
/*-- /_______________\/							            --*/

/**
 * Pencil tool, Tool heritage
 * @param draw : draw
 * @constructor
 */
var Pencil = function (draw, name, ico, brush) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Tool.call(this, draw, name, ico);

    this.line = [];
    this.distPt = 0;
    this.density = 1; //Draw per px
    this.brush = brush;
};
Pencil.prototype = Object.create( Tool.prototype );


Pencil.prototype.setDensity = function(density) {
    this.density = density;
};

Pencil.prototype.getDensity = function() {
    return this.density;
};

/**
 * Set a new brush to the tool
 */
Pencil.prototype.setBrush = function(brush) {
    this.brush = brush;
};

/**
 * Get the brush
 */
Pencil.prototype.getBrush = function() {
    return this.brush;
};

/**
 * Call this to end the line
 */
Pencil.prototype.end = function(){
    this.line = [];
    this.distPt = 0;
};

/**
 * Add a point on the line, complete space in the line (with this.density)
 * @param x : Coord X on canvas of point to add
 * @param y : Coord Y on canvas of point to add
 */
Pencil.prototype.addPoint = function (x,y) {

    var p1 = { x: x, y: y };

    if(this.line.length-1 > 0)
    {
        var p0 = this.line[this.line.length-1];

        this.distPt += Math.sqrt(Math.pow(p1.x-p0.x, 2)+ Math.pow(p1.y-p0.y, 2));
        //console.log("distPts : " + this.distPt);

        if(this.distPt >= this.density){

            var nPt = this.distPt / this.density;
            this.distPt = 0;

            if(nPt < 2)
            {
                this.brush.drawBrush(x,y);
            }
            else
            {
                //direction vector
                var ABx = p1.x - p0.x;
                var ABy = p1.y - p0.y;

                //unitaire direction vector
                var uX = ABx/nPt;
                var uY = ABy/nPt;
                for(var i=0; i<=nPt; i++){

                    var x = p0.x + i*uX;
                    var y = p0.y + i*uY;

                    this.brush.drawBrush(x,y);
                }
            }

        }

        this.line.push(p1);

    }
    else{

        this.brush.drawBrush(p1.x, p1.y);
        this.line.push(p1);
    }


};