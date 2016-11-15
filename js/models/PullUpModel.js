/**
 * Created by Bill on 2016/11/8.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var PullUpModel = Backbone.Model.extend({
            default: {
                "date" : "",
                "author" : "",
                "content" : ""
            }
        });

        return PullUpModel;
});