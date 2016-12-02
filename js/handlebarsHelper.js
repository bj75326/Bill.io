/**
 * Created by Bill on 2016/11/22.
 */
define(['handlebars', 'util'], function(Handlebars, util){

    /*limit content times for horizontal swipe*/
    Handlebars.registerHelper('limit_each_HS', function(value, limit, options){

        var out = "";
        for(var i= 0; i<limit; i++){
            out += "<div class='horizontalSwipe-pageView'><span>" + value[i]["content"] + "</span></div>";
        }
        return out;
    });

    /*limit content times for vertical swipe*/
    Handlebars.registerHelper('limit_each_VS', function(value, limit, options){

        var out = "";
        for(var i= 0; i<limit; i++){
            out += "<div class='verticalSwipe-pageView'><span>" + value[i]["content"] + "</span></div>"
        }
        return out;
    });
});
