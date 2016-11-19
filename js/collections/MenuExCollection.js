/**
 * Created by Bill on 2016/11/17.
 */
define(["jQuery", "underscore", "Backbone",
        "/Bill.io/js/models/MenuExModel.js"
    ], function($, _, Backbone, MenuExModel){

        var MenuExCollection = Backbone.Collection.extend({
            model: MenuExModel,

            url: "/Bill.io/json/scrollLoading.json",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse MenuExtension collection start");
                if(serverResponse){
                    var content = serverResponse["content"];
                    return content;
                }
                return serverResponse;
            },

            initialize: function(){
                console.log("MenuExCollection initialize...");
            }
        });

        return MenuExCollection;
});
