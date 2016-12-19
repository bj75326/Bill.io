/**
 * Created by Bill on 2016/12/9.
 */
define(["jQuery", "underscore", "Backbone",
    "/Bill.io/js/models/LazyLoadingModel.js"
    ], function($, _, Backbone, LazyLoadingModel){

        var LazyLoadingCollection = Backbone.Collection.extend({
            model: LazyLoadingModel,

            url: "",

            /*
             This function is used to handle the response received from the server
             before setting the response to the collection.
             */
            parse: function(serverResponse, xhr){
                console.log("parse LazyLoading collection start...");
                if(serverResponse){
                    var content = serverResponse["content"];
                    return content;
                }
                return serverResponse;
            },

            initialize: function(){
               console.log("LazyLoadingCollection initialize...");
            }
        });

        return LazyLoadingCollection;
});
