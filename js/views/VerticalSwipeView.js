/**
 * Created by Bill on 2016/11/25.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"/Bill.io/js/collections/VSwipeCollection.js"
        ,"text!/Bill.io/templates/VerticalSwipe.tpl"
        ,"text!/Bill.io/templates/VSwipeContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"VerticalSwipe"],
    function($, _, Backbone, Handlebars, util, VSwipeCollection, VerticalSwipeTpl, VSwipeContentTpl, ErrorTpl, VerticalSwipe){

        var objVSwipeCollection = new VSwipeCollection();

        var VerticalSwipeView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
                //View listenTo put here.
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(VerticalSwipeTpl, {}, ".page");
                util.setViewportHeight();

                objVSwipeCollection.fetch({
                    success: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        if(collection){
                            util.loadHandlebarTemplate2(VSwipeContentTpl, resp, ".verticalSwipe");
                            util.switchSpin(".verticalSwipe .spin");
                        }
                        util.switchSpin(".verticalSwipe .spin");

                        VerticalSwipe({

                        });
                    },
                    error: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".verticalSwipe");
                        util.switchSpin(".verticalSwipe .spin");
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

        return VerticalSwipeView;
});
