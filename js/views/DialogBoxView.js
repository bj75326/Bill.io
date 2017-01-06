/**
 * Created by Bill on 2017/1/4.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"text!/Bill.io/templates/DialogBox.tpl"
        ,"text!/Bill.io/templates/DialogBoxContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"DialogBox"],
    function($, _, Backbone, Handlebars, util, DialogBoxTpl, DialogBoxContentTpl, ErrorTpl, DialogBox){

        var DialogBoxView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(DialogBoxTpl, {}, ".page");
                util.setViewportHeight();

                util.loadHandlebarTemplate2(DialogBoxContentTpl, {}, ".viewport");
                util.switchSpin(".viewport .spin");

                DialogBox({
                    //options defined here.
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

        return DialogBoxView;
});
