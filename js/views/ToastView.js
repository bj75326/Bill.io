/**
 * Created by jibin on 17/2/5.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"text!/Bill.io/templates/Toast.tpl"
        ,"text!/Bill.io/templates/ToastContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"Toast"],
    function($, _, Backbone, Handlebars, util, ToastTpl, ToastContentTpl, ErrorTpl, Toast){

        var ToastView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(ToastTpl, {}, ".page");
                util.setViewportHeight();

                util.loadHandlebarTemplate2(ToastContentTpl, {}, ".viewport");
                util.switchSpin(".viewport .spin");
            },

            events: {
                "click .page-back>a": "overLayerHandler"
            },

            overLayerHandler: function(){
                util.openOverLayer();
                this.undelegateEvents();
            }
        });

        return ToastView;
});
