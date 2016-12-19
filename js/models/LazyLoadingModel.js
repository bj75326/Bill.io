/**
 * Created by Bill on 2016/12/9.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var LazyLoadingModel = Backbone.Model.extend({
            defaults: {
                "imgSrc" : "",
                "lovedNum" : "",
                "sharedNum" : ""
            }
        });

        return LazyLoadingModel;
});