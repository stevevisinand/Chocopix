/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   27.10.15			            --*/
/*--   ______\     \    /	 tool.js         	            --*/
/*--  /             \  /	 Abstract Tool class            --*/
/*-- /_______________\/							            --*/

var Tool = function(ctx){
    this.ctx = ctx;
};





var Pencil = function (ctx) {

    // Invoke the superclass constructor on the new object
    // then use .call() to invoke the constructor as a method of
    // the object to be initialized.
    Tool.call(this, ctx);

    this.line = [];
    this.distPt = 0;
    this.density = 1; //Draw per px

};
Pencil.prototype = Object.create( Tool.prototype );

Pencil.prototype.end = function(){
    this.line = [];
    this.distPt = 0;
};


Pencil.prototype.addPoint = function (x,y) {

    var p1 = { x: x, y: y };

    if(this.line.length-1 > 0)
    {
        var p0 = this.line[this.line.length-1];

        this.distPt += Math.sqrt(Math.pow(p1.x-p0.x, 2)+ Math.pow(p1.y-p0.y, 2));
        console.log("distPts : " + this.distPt);

        if(this.distPt >= this.density){

            var nPt = this.distPt / this.density;
            this.distPt = 0;

            if(nPt < 2)
            {
                this.ctx.beginPath();
                this.ctx.fillStyle="#222222";
                this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
                this.ctx.fill();
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

                    this.ctx.beginPath();
                    this.ctx.fillStyle="#222222";
                    this.ctx.arc(x, y, 10, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            }

        }

        this.line.push(p1);

    }
    else{
        this.ctx.beginPath();
        this.ctx.fillStyle="#FF2222";
        this.ctx.arc(p1.x, p1.y, 10, 0, 2 * Math.PI);
        this.ctx.fill();

        this.line.push(p1);
    }


};
