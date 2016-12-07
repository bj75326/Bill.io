/**
 * Created by Bill on 2016/12/5.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"text!/Bill.io/templates/LazyLoading.tpl"
        ,"LazyLoading"],
    function($, _, Backbone, Handlebars, util, LazyLoadingTpl, LazyLoading){

        var LazyLoadingView = Backbone.View.extend({
            el: ".page",

            initialize: function(){

            },

            render: function(){
                
            },

            events: {

            }
        });

        return LazyLoadingView;
});
