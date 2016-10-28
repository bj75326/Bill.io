/**
 * Created by Bill on 2016/10/17.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var ScrollLoadingModel = Backbone.Model.extend({
            defaults: {
                "date" : "",
                "author" : "",
                "content" : ""
            }
        });

        return ScrollLoadingModel;
});