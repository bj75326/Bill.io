/**
 * Created by Bill on 2016/11/25.
 */
define(["jQuery", "underscore", "Backbone",
        "/Bill.io/js/models/VSwipeModel.js"
    ], function($, _, Backbone, VSwipeModel){

        var VSwipeCollection = Backbone.Collection.extend({
            model: VSwipeModel,

            url: "/Bill.io/json/scrollLoading.json",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse Vertical Swipe collection start");
                if(serverResponse){
                    var content = serverResponse["content"];
                    return content;
                }
                return serverResponse;
            },

            initialize: function(){
                console.log("VSwipeCollection initialize...");
            }
        });

        return VSwipeCollection;
});