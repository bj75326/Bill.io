/**
 * Created by Bill on 2016/10/7.
 */
define(["jQuery", "Backbone", "util"], function($, Backbone, util){
    var AppRouter = Backbone.Router.extend({
        routes: {
            'Home' : 'showHomePage',
            'menu-extension' : 'showMenuExtension',
            'scroll-loading' : 'showScrollLoading',
            'pull-down' : 'showPullDown',
            'pull-up' : 'showPullUp',
            'horizontal-swipe' : 'showHorizontalSwipe',
            'vertical-swipe' : 'showVerticalSwipe',
            'lazy-loading' : 'showLazyLoading',
            'cell-swipe' : 'showCellSwipe',
            'dialog-box' : 'showDialogBox',
            'toast' : 'showToast',
            'error' : 'showError'
        },

        initialize: function(options){
            console.log("initialize router...");
        },

        showHomePage: function(){
            console.log("within showHomePage...");
            requirejs(["/Bill.io/js/views/HomePageView.js"], function(HomePageView){
                util.formatViewEL();
                var objHomePageView = new HomePageView();
                objHomePageView.render();
            });
        },

        showScrollLoading: function(){
            console.log("within showScrollLoading...");
            requirejs(["/Bill.io/js/views/ScrollLoadingView.js"], function(ScrollLoadingView){
                util.formatViewEL();
                var objScrollLoadingView = new ScrollLoadingView();
                objScrollLoadingView.render();
            });
        },

        showPullDown: function(){
            console.log("within showPullDown...");
            requirejs(["/Bill.io/js/views/PullDownView.js"], function(PullDownView){
                util.formatViewEL();
                var objPullDownView = new PullDownView();
                objPullDownView.render();
            });
        },

        showPullUp: function(){
            console.log("within showPullUp...");
            requirejs(["/Bill.io/js/views/PullUpView.js"], function(PullUpView){
                util.formatViewEL();
                var objPullUpView = new PullUpView();
                objPullUpView.render();
            });
        },

        showMenuExtension: function(){
            console.log("within showMenuExtension...");
            requirejs(["/Bill.io/js/views/MenuExtensionView.js"], function(MenuExtensionView){
                util.formatViewEL();
                var objMenuExtensionView = new MenuExtensionView();
                objMenuExtensionView.render();
            });
        },

        showHorizontalSwipe: function(){
            console.log("within showHorizontalSwipe...");
            requirejs(["/Bill.io/js/views/HorizontalSwipeView.js"], function(HorizontalSwipeView){
                util.formatViewEL();
                var objHorizontalSwipeView = new HorizontalSwipeView();
                objHorizontalSwipeView.render();
            });
        },

        showVerticalSwipe: function(){
            console.log("within showVerticalSwipe...");
            requirejs(["/Bill.io/js/views/VerticalSwipeView.js"], function(VerticalSwipeView){
                util.formatViewEL();
                var objVerticalSwipeView = new VerticalSwipeView();
                objVerticalSwipeView.render();
            });
        },

        showLazyLoading: function(){
            console.log("within showLazyLoading...");
            requirejs(["/Bill.io/js/views/LazyLoadingView.js"], function(LazyLoadingView){
                util.formatViewEL();
                var objLazyLoadingView = new LazyLoadingView();
                objLazyLoadingView.render();
            });
        },

        showCellSwipe: function(){
            console.log("within showCellSwipe...");
            requirejs(["/Bill.io/js/views/CellSwipeView.js"], function(CellSwipeView){
                util.formatViewEL();
                var objCellSwipeView = new CellSwipeView();
                objCellSwipeView.render();
            });
        },

        showDialogBox: function(){
            console.log("within showDialogBox...");
            requirejs(["/Bill.io/js/views/DialogBoxView.js"], function(DialogBoxView){
                util.formatViewEL();
                var objDialogBoxView = new DialogBoxView();
                objDialogBoxView.render();
            });
        },

        showToast: function(){
            console.log("within showToast...");
            requirejs(["/Bill.io/js/views/ToastView.js"], function(ToastView){
                util.formatViewEL();
                var objToastView = new ToastView();
                objToastView.render();
            });
        }

        /*
        showError: function(){
            console.log("within showError...");
            requirejs(["/Popstate/Bill.io/js/views/ErrorView.js"], function(ErrorView){
                util.formatViewEL();
                var objErrorView = new ErrorView();
                objErrorView.render();
            });
        }
        */
    });

    return AppRouter;
});