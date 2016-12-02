/**
 * Created by Bill on 2016/11/25.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var VSwipeModel = Backbone.Model.extend({
            default: {
                "date" : "",
                "author" : "",
                "content" : ""
            }
        });

        return VSwipeModel;
});
