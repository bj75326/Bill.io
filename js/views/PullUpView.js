/**
 * Created by Bill on 2016/11/8.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"/Bill.io/js/Collections/PullUpCollection.js"
        ,"text!/Bill.io/templates/PullUp.tpl"
        ,"text!/Bill.io/templates/ScrollLoadContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"PullUp"],
    function($, _, Backbone, Handlebars, util, PullUpCollection, PullUpTpl, ScrollLoadContentTpl, ErrorTpl, PullUp){

        var objPullUpCollection = new PullUpCollection();

        var PullUpView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
                //View listenTo put here.
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(PullUpTpl, {}, ".page");
                util.setViewportHeight();
                objPullUpCollection.fetch({
                    success: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        if(collection){
                            util.loadHandlebarTemplate2(ScrollLoadContentTpl, resp, ".pullup-list");
                        }
                        util.switchSpin(".pullup-list .spin");

                        PullUp({
                            //options defined here.
                        });
                    },
                    error: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".pullup-list");
                        util.switchSpin(".pullup-list .spin");
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

        return PullUpView;
    });
