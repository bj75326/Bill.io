/**
 * Created by Bill on 2016/12/5.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"/Bill.io/js/collections/LazyLoadingCollection.js"
        ,"text!/Bill.io/templates/LazyLoading.tpl"
        ,"text!/Bill.io/templates/LazyLoadContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"LazyLoading", "ScrollLoadingForLzlo"],
    function($, _, Backbone, Handlebars, util, LazyLoadingCollection, LazyLoadingTpl, LazyLoadContentTpl, ErrorTpl, LazyLoading, ScrollLoadingForLzlo){

        var objLazyLoadingCollection = new LazyLoadingCollection();

        var LazyLoadingView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
                //View listenTo put here.
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(LazyLoadingTpl, {}, ".page");
                util.setViewportHeight();
                objLazyLoadingCollection.url = "/Bill.io/json/lazyLoading1.json";
                objLazyLoadingCollection.fetch({
                    success: function(collection, resp){
                        console.dir(collection.models);
                        console.dir(resp);
                        if(collection.models){
                            util.loadHandlebarTemplate2(LazyLoadContentTpl, resp, ".viewport");
                        }
                        util.switchSpin(".viewport .spin");

                        LazyLoading({
                            //options defined here.
                        });

                        ScrollLoadingForLzlo({
                            //options defined here.
                            "collection": objLazyLoadingCollection,
                            "template": LazyLoadContentTpl,
                            "url": "/Bill.io/json/lazyLoading2.json",
                            "callback": LazyLoading
                        });
                    },
                    error: function(collection, resp){
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".viewport");
                        util.switchSpin(".viewport .spin");
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

        return LazyLoadingView;
});
