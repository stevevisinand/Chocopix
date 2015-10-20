/*
$(document).ready(function() {
    var w = $(window).width();
	var h = $(window).height();
    
    resizeApp(w, h);
});

$(window).resize(function(){
    var w = $(window).width();
	var h = $(window).height();
    
    resizeApp(w, h);
    
});

function resizeApp(w, h){
    
    var h = h - $('#head').height() - 4; //border = 4px
    var left_pannels = $('.left_pannel');
    
    var widthPannels = 0;
    $('.left_pannel').each(function() {
        $(this).height(h);
        widthPannels = widthPannels + $(this).width();
    });
    
    resizeCanvas(w - widthPannels - 4, h);
    
}

function resizeCanvas(w, h){
    var canvas = $('#draw');
    canvas.attr('width', w);
    canvas.attr('height', h);
}*/