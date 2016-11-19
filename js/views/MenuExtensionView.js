/**
 * Created by Bill on 2016/11/15.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"/Bill.io/js/collections/MenuExCollection.js"
        ,"text!/Bill.io/templates/MenuExtension.tpl"
        ,"text!/Bill.io/templates/MenuExContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"MenuExtension"],
    function($, _, Backbone, Handlebars, util, MenuExCollection, MenuExtensionTpl, MenuExContentTpl, ErrorTpl, MenuExtension){

        var objMenuExCollection = new MenuExCollection();

        var MenuExtensionView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
                //View listenTo put here.
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(MenuExtensionTpl, {}, ".page");
                util.setViewportHeight();

                var elem = document.querySelector(".menuEx-content");
                var anotherElem = document.querySelector(".menuEx-footer");
                util.setInnerViewportHeight(elem, anotherElem);

                objMenuExCollection.fetch({
                    success: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        if(collection){
                            util.loadHandlebarTemplate2(MenuExContentTpl, resp, ".menuEx-content");
                        }
                        util.switchSpin(".menuEx-content .spin");

                        MenuExtension({
                            //options defined here.
                        });
                    },
                    error: function(collection, resp){
                        console.log(collection);
                        console.log(resp);
                        util.loadHandlebarTemplate2(ErrorTpl, resp, ".menuEx-content");
                        util.switchSpin(".menuEx-content .spin");
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

        return MenuExtensionView;
});
