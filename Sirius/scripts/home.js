$( document ).ready(function() {
    
    
    var btn = $("#btnTry");
    var descr =  $("#descr-head");
    btn.fadeOut(0).css('opacity', 0.0);
    
    descr.fadeOut(0);
    
    var head = $("#banniere-head");
    
    var autoHeight = 300;

    head.css('height', $( window ).height());
    $("#title-head").css('line-height', $( window ).height()+'px');
    
    head.delay(2000).animate({height: autoHeight},800);
    
    
    
    $.when($("#title-head").delay(2000).animate({'line-height': autoHeight},800)).done(function() {
        btn.fadeIn(0).css('opacity', 1.0);
        descr.fadeIn(200);
    });

});