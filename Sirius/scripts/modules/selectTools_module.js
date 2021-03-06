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
        controller: function($scope, $sce, resizeUtils, drawUtils) {

            //Strings values
            this.name = "Outils";

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

            var ref = this;
            this.changeColor = function(colorRGB){
                ref.primaryColor = colorRGB;
                drawUtils.setPrimaryColor(colorRGB);

                $scope.$apply(); //force to reload scope (data-binding), because changeColor is called out of angularJS
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
                ref.changeColor = function(colorRGB){
                    ref.primaryColor = colorRGB; //ref = this
                    drawUtils.setPrimaryColor(colorRGB);

                    $scope.$apply();
                };

                showPopup('popup_colorPicker', 500);
            };

            this.selectSecondaryColor = function() {
                //redifine function
                ref.changeColor = function(colorRGB){
                    ref.secondaryColor = colorRGB; //ref = this
                    drawUtils.setSecondaryColor(colorRGB);

                    $scope.$apply();
                };

                showPopup('popup_colorPicker', 500);
            };

            this.startColorPicker = function(){
                this.closePopupColor();

                drawUtils.selectColorOnCanvas(this.changeColor);
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
                    if(drawUtils.isPenSelected()) {
                        ctrl.sizeBrush = drawUtils.getBrushSelectedTool().getSize();
                        ctrl.density = drawUtils.getDensitySelectedTool();
                    }
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

    appModule.directive("topshapepannel", function(drawUtils) {
        return {
            restrict: "E",
            templateUrl: "views/toppannel-shape-inUse.html",
            controller: function($scope, drawUtils) {

                //strings values
                this.control_name = "Paramètres de formes";
                this.control_shape_isstroked = "contours";
                this.control_shape_isfilled = "remplis";
                this.control_shape_sizestroke = "taille du trait : ";


                //binded values
                this.sizestroke = 0;
                this.isFilled = true;
                this.isStroked = true;


                //abo to callback
                var ctrl = this;
                this.loadShape = function(){
                    if(drawUtils.isShapeSelected()) {
                        ctrl.sizestroke = drawUtils.getSizeStokeSelectedTool();
                        ctrl.isFilled = drawUtils.getIsFillSelectedTool();
                        ctrl.isStroked = drawUtils.getIsStokeSelectedTool();
                    }
                }
                drawUtils.abonementCallbackChangeTool(this.loadShape);




                //functions
                this.changeSizestroke = function(){
                    drawUtils.setSizeStokeSelectedTool(this.sizestroke);
                };

                this.changeIsFilled = function(){
                    drawUtils.setIsFillSelectedTool(this.isFilled);
                };
                this.changeIsStroked = function(){
                    drawUtils.setIsStokeSelectedTool(this.isStroked);
                };

                this.isShowed = function(){
                    return drawUtils.isShapeSelected();
                };

            },
            controllerAs: "paneltopshape"
        };
    });

})();