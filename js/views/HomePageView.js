/**
 * Created by Bill on 2016/10/7.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"/Bill.io/js/collections/HomePageCollection.js"
        ,"text!/Bill.io/templates/HomePage.tpl"
        ,"text!/Bill.io/templates/ShowCaseContent.tpl"
        ,"text!/Bill.io/templates/CanvasContent.tpl"
        ,"text!/Bill.io/templates/HomePageError.tpl"],
        function($, _, Backbone, Handlebars, util, HomePageCollection, HomePageTpl, ShowCaseContentTpl, CanvasContentTpl, HomePageErrorTpl){

            var objShowCaseCollection = new HomePageCollection();
            var objCanvasCollection = new HomePageCollection();

            objShowCaseCollection.parseIndicator = "showCase";
            objCanvasCollection.parseIndicator = "canvasPractise";

            var HomePageView = Backbone.View.extend({
                el: ".page",
                initialize: function(attrs){
                    this.options = attrs;
                },
                render: function(){
                    util.switchBackgroundColor(true);
                    util.closeOverLayer();
                    util.loadHandlebarTemplate(HomePageTpl, {}, ".page");
                    objShowCaseCollection.fetch({
                        success: function(collection, resp){
                            console.dir(collection.models);
                            console.dir(resp);
                            if(collection.models){
                                util.loadHandlebarTemplate2(ShowCaseContentTpl, resp, ".showCase");
                                util.switchSpin(".showCase .spin");
                            }
                        },
                        error: function(collection, resp){
                            console.dir(collection);
                            console.dir(resp);
                            util.loadHandlebarTemplate2(HomePageErrorTpl, resp, ".showCase");
                            util.switchSpin(".showCase .spin");
                        }
                    });

                    objCanvasCollection.fetch({
                        success: function(collection, resp){
                            console.dir(collection.models);
                            console.dir(resp);
                            if(collection.models){
                                util.loadHandlebarTemplate2(CanvasContentTpl, resp, ".canvasPractise");
                                util.switchSpin(".canvasPractise .spin");
                            }
                        },
                        error: function(collection, resp){
                            console.dir(collection);
                            console.dir(resp);
                            util.loadHandlebarTemplate2(HomePageErrorTpl, resp, ".canvasPractise");
                            util.switchSpin(".canvasPractise .spin");
                        }
                    });
                },
                events: {
                    "click .showcases>a": "overLayerHandler"
                    //"touchstart .showcases>a": "addMaskHandler",
                    //"touchend .showcases>a": "removeMaskHandler"
                },
                overLayerHandler: function(){
                    //var event = arguments[0];
                    //if(event.target.parentNode.nodeName === "A"){
                    //    event.target.parentNode.setAttribute("class", event.target.parentNode.getAttribute("class") + " active");
                    //}
                    util.openOverLayer();
                    this.undelegateEvents(); //temp
                }
            });

            return HomePageView;
});
