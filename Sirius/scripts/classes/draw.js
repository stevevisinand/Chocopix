/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   05.12.15			            --*/
/*--   ______\     \    /	 draw.js         	            --*/
/*--  /             \  /	 Draw class                     --*/
/*-- /_______________\/							            --*/

var Draw = function(posX, posY, width, height){

    this._pos = {x : posX, y : posY};
    this._width = width;
    this._height = height;

    this._calcs = [];
    var id = this._calcs.length;
    this._calcs.push(new Calc(this._pos.x, this._pos.y, this._width, this._height, id));

    this._mainCalc = this._calcs[0];
};

/**
 * Set a calc activ
 * @param calc
 */
Draw.prototype.setActivCalc = function(calc){
    this._mainCalc=calc;
};


/**
 * Inform if it is the activ calc
 * @param calc
 * @returns {boolean}
 */
Draw.prototype.isCalcActiv = function (calc) {
    return this._mainCalc === calc;
};

/**
 * Move a calc up in the list
 * @param calc
 */
Draw.prototype.moveCalcUp = function (calc) {
    var i=0;
    while(!(calc===this._mainCalc) && i<this._calcs.length){
        i++;
    }
    if(i+1 < this._calcs.length) {
        var temp = this._calcs[i + 1];
        this._calcs[i + 1] = this._calcs[i];
        this._calcs[i] = temp;
    }
};

/**
 * Add an element on the draw
 * @param elementBitmap : element to add
 */
Draw.prototype.save = function () {
    this._mainCalc.save();
};

/**
 * Draw the actual draw (bitmapImage)
 */
Draw.prototype.drawMe = function () {
    for(var i=0; i<this._calcs.length; i++){
        this._calcs[i].drawMe();
    }
    //this._mainCalc.drawMe();
};

/**
 * Clear the draw
 */
Draw.prototype.clearDraw = function () {
    this._mainCalc.clearDraw();
};

/**
 * Get context 2D where you need draw
 * @return context
 */
Draw.prototype.getActualContext = function() {
    return this._mainCalc.context;
};

/**
 * Get canvas where you need draw
 * @return context
 */
Draw.prototype.getActualCanvas = function() {
    return this._mainCalc.canvas;
};

/**
 * Add a new calc and pass it to the mainCalc
 */
Draw.prototype.addCalc = function() {
    var id = this._calcs.length;
    this._calcs.push(new Calc(this._pos.x, this._pos.y, this._width, this._height, id));
    this._mainCalc = this._calcs[id];
};

/**
 * Remove a calc if it exists and change the mainCalc if it is the removed
 */
Draw.prototype.removeCalc = function(calc) {

    for(var i = this._calcs.length - 1; i >= 0; i--) {
        if(this._calcs[i] === calc) {
            this._calcs.splice(i, 1);

            if(calc === this._mainCalc){

                if(this._calcs.length == 0){
                    this._mainCalc = null;
                }
                else if(this._calcs.length - 1 == i){ //last element
                    this._mainCalc = this._calcs[i-1];
                }
                else{
                    this._mainCalc = this._calcs[i];
                }
            }

            //TODO : Destruct the calc (in DOM too!)
        }
    }
};

/**
 * Return all calcs
 * @returns {Array}
 */
Draw.prototype.getCalcs = function() {
    return this._calcs;
};