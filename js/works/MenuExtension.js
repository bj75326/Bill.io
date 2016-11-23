/**
 * Created by Bill on 2016/11/15.
 */
define([], function(){
    var Bin = {
        on: function(element, type, handler, userCapture){
            if(document.attachEvent){
                element.attachEvent("on" + type, handler);
            }
            else if(document.addEventListener){
                element.addEventListener(type, handler, userCapture);
            }
        },

        off: function(element, type, handler, userCapture){
            if(document.detachEvent){
                element.detachEvent("on"+type, handler);
            }else if(document.removeEventListener){
                element.removeEventListener(type, handler, userCapture);
            }
        },

        eventDispatch: function(element, type, customProperty){
            if(document.fireEvent){
                var event = document.createEventObject();
                event.eventType = type;
                event.dispatchFlag = true;
                element.fireEvent("on"+type, event);
            }else if(document.dispatchEvent){
                var event = new MouseEvent("click", {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                event.dispatchFlag = true;
                if(customProperty){
                    for(var key in customProperty){
                        if(!(key in event)){
                            event[key] = customProperty[key];
                        }
                    }
                }
                element.dispatchEvent(event);
            }
        },

        styleChange: function(elements, style, interval){
            return new Promise(function(resolve, reject){
                if(Object.prototype.toString.call(elements).slice(8, -1) === "Array"){
                    elements.forEach(function(element){
                        element.setAttribute("style", style);
                    });
                    setTimeout(function(){
                        resolve();
                    }, interval);
                }else{
                    elements.setAttribute("style", style);
                    setTimeout(function(){
                        resolve();
                    }, interval);
                }
            });
        },

        cssCapture: function(){

        }
    };

    var MenuExtension = function(options){
        /*
         *  options parameters
         *  1. viewport element
         *
         */

        //变量初始化
        var plus = options["plus"] || document.querySelector(".menuEx-plus a");
        var overLayer = options["overLayer"] || document.querySelector(".menuEx-overlayer");
        var closeIcon = options["closeIcon"] || document.querySelector(".menuEx-exit i");
        var popup = options["popup"] || document.querySelector(".menuEx-popup");

        var Icons = options["Icons"] || document.querySelectorAll(".menuEx-popup .menuEx-icon a");

        var close = options["close"] || document.querySelector(".menuEx-exit");
        var close2 = options["close2"] || document.querySelector(".menuEx-exit2");
        var backBtn = options["closeBtn"] || document.querySelector(".menuEx-exit2 i:nth-child(1)");
        var closeBtn = options["backBtn"] || document.querySelector(".menuEx-exit2 i:nth-child(2)");

        var more = options["more"] || document.querySelector(".menuEx-icons .menuEx-icons-group:nth-child(1) .menuEx-icon:nth-child(6) a");
        var IconWrapper = options["IconWrapper"] || document.querySelector(".menuEx-icons");

        var swiped = false;

        var width = window.innerWidth;

        var startX, startY;

        var popupFn = function(){

            Bin.styleChange(overLayer, "display: block; opacity: 1", 16).then(function(){
                return Bin.styleChange(popup, "display: block; opacity: 1", 16);
            }).then(function(){
                return Bin.styleChange(closeIcon, "transform: rotate(0deg)", 16);
            }).then(function(){
                return Bin.styleChange([Icons[0], Icons[6]], "transform: translate3d(0, 0, 0)", 50);
            }).then(function(){
                return Bin.styleChange([Icons[1], Icons[7]], "transform: translate3d(0, 0, 0)", 50);
            }).then(function(){
                return Bin.styleChange([Icons[2], Icons[8]], "transform: translate3d(0, 0, 0)", 50);
            }).then(function(){
                return Bin.styleChange([Icons[3], Icons[9]], "transform: translate3d(0, 0, 0)", 50);
            }).then(function(){
                return Bin.styleChange([Icons[4], Icons[10]], "transform: translate3d(0, 0, 0)", 50);
            }).then(function(){
                return Bin.styleChange([Icons[5], Icons[11]], "transform: translate3d(0, 0, 0)", 50);
            });

            Bin.on(window, "touchstart", vpTouchStartFn, false);

            Bin.on(window, "touchmove", vpTouchMoveFn, false);
        };

        var popupCloseFn = function(){

            Bin.styleChange(closeIcon, "", 16).then(function(){
                return Bin.styleChange([Icons[5], Icons[11]], "", 50);
            }).then(function(){
                return Bin.styleChange([Icons[4], Icons[10]], "", 50);
            }).then(function(){
                return Bin.styleChange([Icons[3], Icons[9]], "", 50);
            }).then(function(){
                return Bin.styleChange([Icons[2], Icons[8]], "", 50);
            }).then(function(){
                return Bin.styleChange([Icons[1], Icons[7]], "", 50);
            }).then(function(){
                return Bin.styleChange([Icons[0], Icons[6]], "", 600);
            }).then(function(){
                return Bin.styleChange(popup, "", 0);
            }).then(function(){
                return Bin.styleChange(overLayer, "", 0);
            }).then(function(){
                close.setAttribute("style", "");
                close2.setAttribute("style", "");
                Bin.styleChange(IconWrapper, "transform: translate3d(0, 0, 0)", 0);
            });

            Bin.off(window, "touchstart", vpTouchStartFn, false);

            Bin.off(window, "touchmove", vpTouchMoveFn, false);
        };

        var swipeFn = function(){
            if(swiped){
                Bin.styleChange(IconWrapper, "transform: translate3d(0, 0, 0)", 0).then(function(){
                    close.setAttribute("style", "");
                    close2.setAttribute("style", "");
                    swiped = false;
                });

            }else{
                Bin.styleChange(IconWrapper, "transform: translate3d(-" + width + "px, 0, 0)", 0).then(function(){
                    close.setAttribute("style", "display: none");
                    close2.setAttribute("style", "display: flex");
                    swiped = true;
                });
            }
        };

        var vpTouchStartFn = function(ev){

            var event = ev || window.event;
            event.preventDefault();
            var touch = event.touches[0];
            startX = touch.pageX;
            startY = touch.pageY;
        };

        var vpTouchMoveFn = function(ev){
            var event = ev || window.event;
            event.preventDefault();
            var touch = event.touches[0];
            var deltaX = touch.pageX - startX;
            var deltaY = touch.pageY - startY;
            if(Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0 && swiped){
                swipeFn();
            }
        };

        Bin.on(plus, "click", popupFn, false);
        Bin.on(close, "click", popupCloseFn, false);
        Bin.on(more, "click", swipeFn, false);
        Bin.on(closeBtn, "click", popupCloseFn, false);
        Bin.on(backBtn, "click", swipeFn, false);
        Bin.on(overLayer, "click", popupCloseFn, false);

        //temp!! hashchange should remove event bind on window
        Bin.on(window, "hashchange", function(){
            Bin.off(window, "hashchange", arguments.callee, false);
            Bin.off(window, "touchstart", vpTouchStartFn, false);
            Bin.off(window, "touchmove", vpTouchMoveFn, false);
        }, false);
    };

    return MenuExtension;
});