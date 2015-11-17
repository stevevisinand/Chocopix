/*--        ____________ _____   				            --*/
/*--       /            \    /   				            --*/
/*--      /     _________\  /					            --*/
/*--      \     \          /					            --*/
/*--       \     \        /	 Steve Visinand		            --*/
/*--        \     \      /   26.10.15			            --*/
/*--   ______\     \    /	 selectTools_module.js     	    --*/
/*--  /             \  /	 "Selecting  draw tools module" --*/
/*-- /_______________\/							            --*/


(function() {
    
    var appModule = angular.module('selectTools-directives', ['resizeModule', 'drawModule']);


    appModule.directive("drawtoolspannel", function(resizeUtils, drawUtils) {
      return {
        restrict: "E",
        templateUrl: "views/leftpannel-tools.html",
        controller: function($scope, resizeUtils, drawUtils) {

            //Strings values
            this.name = "Control";

            this.popupColor_name = "Mélangeur";
            this.popupColor_btnValid = "Confirmer";


            //links to drawUtils functions
            this.isSelected = drawUtils.isSelected;
            this.selectTool = drawUtils.selectTool;

            //links to drawUtils attributs
            this.primaryColor = drawUtils.primaryColor;
            this.secondaryColor = drawUtils.secondaryColor;

            this.tools = [];
            this.tools = this.tools.concat(drawUtils.tools);


            this.changeColor = function(colorRGB){
                this.primaryColor = colorRGB;
                drawUtils.setPrimaryColor(colorRGB);
            };

            //Start picker
            var drawtoolspannel = this;
            var colorp = $('.cp-basic').colorpicker({
                select:			function(event, color) {
                    //setColor
                    drawtoolspannel.changeColor(color.formatted);
                }
            });


            this.selectPrimaryColor = function() {
                //redefine function
                this.changeColor = function(colorRGB){
                    this.primaryColor = colorRGB;
                    drawUtils.setPrimaryColor(colorRGB);
                };

                showPopup('popup_colorPicker', 500);
            };

            this.selectSecondaryColor = function() {
                //redifine function
                this.changeColor = function(colorRGB){
                    this.secondaryColor = colorRGB;
                };

                showPopup('popup_colorPicker', 500);
            };



            //
            //	Close all popups
            //
            this.closePopupColor = function(){

                $.when($('.popup_block').fadeOut())
                    .done(function() {
                        $('#fade').fadeOut();
                    });
            };

            //
            //	showPopup
            //	affiche la popup avec l'id "popID" (sans # !)
            //
            function showPopup(popID, popWidth)
            {
                var verifpopup = $("#"+popID).attr('class'); // Si la popup existe elle a un nom de class
                if(verifpopup != undefined) // la popup existe
                {
                    $.when($("#"+popID)).done(function() {

                        //Faire apparaitre la pop-up
                        $('#' + popID).fadeIn().css({'width': popWidth});

                        //Récupération du margin, qui permettra de centrer la fenêtre - on ajuste de 80px en conformité avec le CSS
                        var popMargLeft = ($('#' + popID).width() + 80) / 2;

                        //On affecte le margin pour centrer la popup verticalement
                        $('#' + popID).css({
                            'margin-left' : -popMargLeft
                        });

                        //Effet fade-in du fond opaque
                        $('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
                        //Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
                        $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
                    });
                }
            }
            
            
            //resize the windows when this module is loaded
            var w = $(window);
            resizeUtils.resizeApp(w.width(), w.height());

        },
        controllerAs: "panel"
      };
    });


    appModule.directive("toppenpannel", function(drawUtils) {
        return {
            restrict: "E",
            templateUrl: "views/toppannel-pen-inUse.html",
            controller: function($scope, drawUtils) {

                //strings values
                this.control_name = "Paramètres de dessin"
                this.control_brush_sizeName = "taille : ";
                this.control_brush_densityName = "densité : ";
                this.control_brush_btnChangeBrush = "Choisir une brosse";


                this.sizeBrush = 0;
                this.density = 0;

                var ctrl = this;
                this.loadPencil = function(){
                    ctrl.sizeBrush = drawUtils.getBrushSelectedTool().getSize();
                    ctrl.density = drawUtils.getDensitySelectedTool();
                }

                drawUtils.abonementCallbackChangeTool(this.loadPencil);
                this.loadPencil();

                this.changeSizeBrush = function(){
                    var brush = drawUtils.getBrushSelectedTool();
                    brush.setSize(parseInt(this.sizeBrush));
                };

                this.changeDensity = function(){
                    drawUtils.setDensitySelectedTool(this.density);
                }

                this.isShowed = function(){
                    return drawUtils.isPenSelected();
                };

            },
            controllerAs: "paneltop"
        };
    });

})();