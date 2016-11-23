/**
 * Created by Bill on 2016/11/21.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var HSwipeModel = Backbone.Model.extend({
            default: {
                "date" : "",
                "author" : "",
                "content" : ""
            }
        });
        
        return HSwipeModel;
});