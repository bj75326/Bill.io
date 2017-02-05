/**
 * Created by Bill on 2016/10/6.
 */
requirejs.config({
    shim: {
        "Backbone" : {
            deps : ["jQuery", "underscore"],
            exports : "Backbone"
        },

        "Bin": {
            deps : [],
            exports : "Bin"
        },

        "FastClick" : {
            deps : [],
            exports : "FastClick"
        }
    },

    paths: {
        jQuery : "libs/jQuery/jquery.min",
        underscore : "libs/underscore/underscore-min",
        Backbone : "libs/Backbone/backbone-min",
        Bin : "libs/BinJS/Bin",
        handlebars : "libs/handlebars/handlebars.amd.min",
        FastClick : "libs/FastClick/fastclick.min",
        AppRouter : "router",
        text : "libs/require-text/text",
        handlebarsHelper : "handlebarsHelper",
        util : "util",
        ScrollLoading : "works/ScrollLoading",
        ScrollLoadingForLzlo : "works/ScrollLoadingForLzlo",
        PullDown : "works/PullDown",
        PullUp : "works/PullUp",
        MenuExtension : "works/MenuExtension",
        HorizontalSwipe : "works/HorizontalSwipe",
        VerticalSwipe : "works/VerticalSwipe",
        LazyLoading : "works/LazyLoading",
        CellSwipe : "works/CellSwipe",
        DialogBox : "works/DialogBox",
        Toast : "works/Toast"
    }
});

//Start main app logic...
requirejs(["jQuery", "underscore", "Backbone", "handlebars", "AppRouter", "FastClick", "handlebarsHelper", "util"]
, function($, _, Backbone, Handlebars, AppRouter, FastClick, handlebarsHelper, util){

        //system entry...
        console.log("system entry...");
        var appRouter = new AppRouter();
        Backbone.history.start();

        //FastClick put here...
        FastClick.attach(document.body);
});
