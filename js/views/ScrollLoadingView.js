/**
 * Created by Bill on 2016/10/17.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        , "/Bill.io/js/collections/ScrollLoadingCollection.js"
        , "text!/Bill.io/templates/ScrollLoading.tpl"
        , "text!/Bill.io/templates/ScrollLoadContent.tpl"
        , "text!/Bill.io/templates/Error.tpl"
        , "scrollLoading"],
    function ($, _, Backbone, Handlebars, util, ScrollLoadingCollection, ScrollLoadingTpl, ScrollLoadContentTpl, ErrorTpl, ScrollLoading) {

        var objScrollLoadingCollection = new ScrollLoadingCollection();

        var ScrollLoadingView = Backbone.View.extend({
            el: ".page",
            initialize: function (attrs) {
                this.options = attrs;
                //View listenTo put here.
            },
            render: function(){
                util.switchBackgroundColor(false);
                util.loadHandlebarTemplate(ScrollLoadingTpl, {}, ".page");
                util.setViewportHeight();
                objScrollLoadingCollection.fetch({
                    success: function(collection, resp){
                        console.dir(collection.models);
                        console.dir(resp);
                        if(collection.models){
                            util.loadHandlebarTemplate2(ScrollLoadContentTpl, resp, ".viewport");
                        }
                        util.switchSpin(".viewport .spin");

                        ScrollLoading({
                            //options defined here.
                        });
                    },
                    error: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".viewport");
                        util.switchSpin(".viewport .spin");
                    }
                });
            }

        });

        return ScrollLoadingView;
    });