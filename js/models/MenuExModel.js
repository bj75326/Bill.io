/**
 * Created by Bill on 2016/11/17.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var MenuExModel = Backbone.Model.extend({
            default: {
                "date" : "",
                "author" : "",
                "content" : ""
            }
        });

        return MenuExModel;
});
