/**
 * Created by Bill on 2016/11/1.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        , "/Bill.io/js/collections/PullDownCollection.js"
        , "text!/Bill.io/templates/PullDown.tpl"
        , "text!/Bill.io/templates/ScrollLoadContent.tpl"
        , "text!/Bill.io/templates/Error.tpl"
        , "PullDown"],
    function($, _, Backbone, Handlebars, util, PullDownCollection, PullDownTpl, ScrollLoadContentTpl, ErrorTpl, PullDown){

        var objPullDownCollection = new PullDownCollection();

        var PullDownView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
                //View listenTo put here.
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(PullDownTpl, {}, ".page");
                util.setViewportHeight();
                objPullDownCollection.fetch({
                    success: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        if(collection.models){
                            util.loadHandlebarTemplate2(ScrollLoadContentTpl, resp, ".pulldown-list");
                        }
                        util.switchSpin(".pulldown-list .spin");

                        PullDown({
                            //options defined here.
                        });
                    },
                    error: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".pulldown-list");
                        util.switchSpin(".pulldown-list .spin");
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

        return PullDownView;
    });