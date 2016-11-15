/**
 * Created by Bill on 2016/11/8.
 */
define(["jQuery", "underscore", "Backbone",
    "/Bill.io/js/models/PullUpModel.js"
    ], function($, _, Backbone, PullUpModel){

        var PullUpCollection = Backbone.Collection.extend({
            model: PullUpModel,

            url: "/Bill.io/json/scrollLoading.json",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse PullUp collection start");
                if(serverResponse){
                    var content = serverResponse["content"];
                    return content;
                }
                return serverResponse;
            },

            initialize: function(){
                console.log("PullUpCollection initialize...");
            }
        });

        return PullUpCollection;
});