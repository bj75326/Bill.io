/**
 * Created by Bill on 2016/10/10.
 */
define(["jQuery", "underscore", "Backbone"],
    function($, _, Backbone){
        var HomePageModel = Backbone.Model.extend({
            defaults: {
                "icon" : "",
                "name" : "",
                "href" : ""
            }
        });

        return HomePageModel;
});