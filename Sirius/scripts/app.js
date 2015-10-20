(function() {

    var app = angular.module('Drawer', []);

    app.controller('ViewCtrl', function () {
        
        this.onresize = function(){
           var w = $(window).width();
	       var h = $(window).height();
    
            resizeApp(w, h);
            alert("hello");
        };
        
        this.resizeApp = function(w, h){
    
            var h = h - $('#head').height() - 4; //border = 4px
            var left_pannels = $('.left_pannel');

            var widthPannels = 0;
            $('.left_pannel').each(function() {
                $(this).height(h);
                widthPannels = widthPannels + $(this).width();
            });

            this.resizeCanvas(w - widthPannels - 4, h); 
        };
        
        this.resizeCanvas = function(w, h){
            var canvas = $('#draw');
            canvas.attr('width', w);
            canvas.attr('height', h);
        };
        
        
        this.resizeApp(100,500);
    });
    
    app.controller('DrawToolsCtrl', function () {
        
        this.name = "Control";
        
    });
    
    app.controller('DrawZoneCtrl', function(){
    
    });

})();

