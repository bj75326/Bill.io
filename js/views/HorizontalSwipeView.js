/**
 * Created by Bill on 2016/11/20.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"/Bill.io/js/collections/HSwipeCollection.js"
        ,"text!/Bill.io/templates/HorizontalSwipe.tpl"
        ,"text!/Bill.io/templates/HSwipeContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"HorizontalSwipe"],
    function($, _, Backbone, Handlebars, util, HSwipeCollection, HorizontalSwipeTpl, HSwipeContentTpl, ErrorTpl, HorizontalSwipe){

        var objHSwipeCollection = new HSwipeCollection();

        var HorizontalSwipeView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
                //View listenTo put here.
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(HorizontalSwipeTpl, {}, ".page");
                util.setViewportHeight();

                objHSwipeCollection.fetch({
                    success: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        if(collection){
                            util.loadHandlebarTemplate2(HSwipeContentTpl, resp, ".horizontalSwipe");
                        }
                        util.switchSpin(".horizontalSwipe .spin");

                        HorizontalSwipe({

                        });
                    },
                    error: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".horizontalSwipe");
                        util.switchSpin(".horizontalSwipe .spin");
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

        return HorizontalSwipeView;

});
