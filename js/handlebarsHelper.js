/**
 * Created by Bill on 2016/11/22.
 */
define(['handlebars', 'util'], function(Handlebars, util){

    /*limit content times for horizontal swipe*/
    Handlebars.registerHelper('limit_each', function(value, limit, options){

        var out = "";
        for(var i= 0; i<limit; i++){
            out += "<div class='horizontalSwipe-pageView'><span>" + value[i]["content"] + "</span></div>"
        }
        return out;
    });
});
