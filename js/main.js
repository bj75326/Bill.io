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
        }
    },

    paths: {
        jQuery : "libs/jQuery/jquery",
        underscore : "libs/underscore/underscore",
        Backbone : "libs/Backbone/backbone",
        Bin : "libs/BinJS/Bin",
        handlebars : "libs/handlebars/handlebars",
        AppRouter : "router",
        text : "libs/require-text/text",
        util : "util",
        scrollLoading : "works/ScrollLoading"
    }
});

//Start main app logic...
requirejs(["jQuery", "underscore", "Backbone", "handlebars", "AppRouter", "Bin", "util"]
, function($, _, Backbone, Handlebars, AppRouter, Bin, util){

        //system entry...
        console.log("system entry...");
        var appRouter = new AppRouter();
        Backbone.history.start();
});
