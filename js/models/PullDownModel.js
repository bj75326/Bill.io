/**
 * Created by Bill on 2016/11/1.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var PullDownModel = Backbone.Model.extend({
            defaults: {
                "date" : "",
                "author" : "",
                "content" : ""
            }
        });

        return PullDownModel;
});