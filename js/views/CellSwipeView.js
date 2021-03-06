/**
 * Created by Bill on 2016/12/27.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"text!/Bill.io/templates/CellSwipe.tpl"
        ,"text!/Bill.io/templates/CellSwipeContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"CellSwipe"],
    function($, _, Backbone, Handlebars, util, CellSwipeTpl, CellSwipeContentTpl, ErrorTpl, CellSwipe){

        var CellSwipeView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
            },
            
            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(CellSwipeTpl, {}, ".page");
                util.setViewportHeight();

                util.loadHandlebarTemplate2(CellSwipeContentTpl, {}, ".viewport");
                util.switchSpin(".viewport .spin");

                CellSwipe({
                    //options defined here.
                    "wrapper" : document.querySelectorAll(".bin-cell-wrapper")[0],
                    "direction" : "left",
                    "cellClickHandler" : function(){
                        console.log(1);
                    }
                });

                CellSwipe({
                    //options defined here.
                    "wrapper" : document.querySelectorAll(".bin-cell-wrapper")[1],
                    "direction" : "right",
                    "cellClickHandler" : function(){
                        console.log(2);
                    }
                });
            },

            events: {
                "click .page-back>a": "overLayerHandler"
            },
            overLayerHandler: function(){
                util.openOverLayer();
                this.undelegateEvents();
            }
        });

        return CellSwipeView;
});
