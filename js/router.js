/**
 * Created by Bill on 2016/10/7.
 */
define(["jQuery", "Backbone"], function($, Backbone){
    var AppRouter = Backbone.Router.extend({
        routes: {
            'Home' : 'showHomePage',
            'menu-extension' : 'showMenuExtension',
            'scroll-loading' : 'showScrollLoading',
            'horizontal-swipe' : 'showSwipe',
            'error' : 'showError'
        },

        initialize: function(options){
            console.log("initialize router...");
        },

        showHomePage: function(){
            console.log("within showHomePage...");
            requirejs(["/Bill.io/js/views/HomePageView.js"], function(HomePageView){
                var objHomePageView = new HomePageView();
                objHomePageView.render();
            });
        },

        showScrollLoading: function(){
            console.log("within showScrollLoading...");
            requirejs(["/Bill.io/js/views/ScrollLoadingView.js"], function(ScrollLoadingView){
                var objScrollLoadingView = new ScrollLoadingView();
                objScrollLoadingView.render();
            });
        }

        /*
        showError: function(){
            console.log("within showError...");
            requirejs(["/Popstate/Bill.io/js/views/ErrorView.js"], function(ErrorView){
                var objErrorView = new ErrorView();
                objErrorView.render();
            });
        }
        */
    });

    return AppRouter;
});