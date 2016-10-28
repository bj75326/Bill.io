/**
 * Created by Bill on 2016/10/17.
 */
define(["jQuery", "underscore", "Backbone",
    "/Bill.io/js/models/ScrollLoadingModel.js"
    ], function($, _, Backbone, ScrollLoadingModel){

        var ScrollLoadingCollection = Backbone.Collection.extend({
            model: ScrollLoadingModel,

            url: "/Popstate/Bill.io/json/scrollLoading.json",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse ScrollLoading collection start...");
                if(serverResponse){
                    var content = serverResponse["content"];
                    return content;
                }
                return serverResponse;
            },

            initialize: function(){
                console.log("ScrollLoadingCollection initialize...");
            }

        });

        return ScrollLoadingCollection;
});