/**
 * Created by Bill on 2016/11/20.
 */
define(["jQuery", "underscore", "Backbone",
        "/Bill.io/js/models/HSwipeModel.js"
    ], function($, _, Backbone, HSwipeModel){

        var HSwipeCollection = Backbone.Collection.extend({
            model: HSwipeModel,

            url: "/Bill.io/json/scrollLoading.json",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse Horizontal Swipe collection start");
                if(serverResponse){
                    var content = serverResponse["content"];
                    return content;
                }
                return serverResponse;
            },

            initialize: function(){
                console.log("HSwipeCollection initialize...");
            }
        });

        return HSwipeCollection;
});
