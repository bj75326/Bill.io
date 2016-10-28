/**
 * Created by Bill on 2016/10/11.
 */
define(["jQuery", "underscore", "Backbone",
    "/Bill.io/js/models/HomePageModel.js"
    ], function($, _, Backbone, HomePageModel){

        var HomePageCollection = Backbone.Collection.extend({
            model: HomePageModel,

            url: "/Bill.io/json/showcases.json",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse HomePage collection start...");
                if(serverResponse){
                    var arr = serverResponse[this.parseIndicator];
                    return arr;
                }
                return serverResponse;
            },

            initialize: function(){
                console.log("HomePageCollection initialize...");
            }

        });

        return HomePageCollection;
});