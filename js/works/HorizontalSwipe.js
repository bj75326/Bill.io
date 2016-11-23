/**
 * Created by Bill on 2016/11/20.
 */
define([], function(){
    var Bin = {
        on: function(element, type, handler, userCapture){
            if(document.attachEvent){
                element.attachEvent("on" + type, handler);
            }else if(document.addEventListener){
                element.addEventListener(type, handler, userCapture);
            }
        },

        off: function(element, type, handler, userCapture){
            if(document.detachEvent){
                element.detachEvent("on" + type, handler);
            }else if(document.removeEventListener){
                element.removeEventListener(type, handler, userCapture);
            }
        },

        eventDispatch: function(element, type, customProperty){
            if(document.fireEvent){
                var event = document.createEventObject();
                event.eventType = type;
                event.dispatchFlag = true;
                element.fireEvent("on" + type, event);
            }else if(document.dispatchEvent){
                var event = new MouseEvent(type, {
                    "view": window,
                    "bubbles": true,
                    "cancelable": true
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
        }
    };

    var HorizontalSwipe = function(options){
        /*
         *  options parameters
         *
         */
        var wrapper = options["wrapper"] || document.querySelector(".horizontalSwipe");
        var content = options["content"] || document.querySelector(".horizontalSwipe-content");
        var pageViews = options["pageViews"] || wrapper.querySelectorAll(".horizontalSwipe-pageView");
        var subs = options["subs"] || wrapper.querySelectorAll(".horizontalSwipe-pageNumber>div");

        var pageWidth = wrapper.clientWidth;

        var startX, startY, timestamp;

        var currentPos = 0;

        var moveLength, direction;

        var maxDisplace = -pageWidth * (pageViews.length - 1);

        var isMove = false;
        var isTouched = false;

        var transform = function(element, pos){
            element.style.transform = "translate3d(" + pos + "px, 0, 0)";
        };

        Bin.on(wrapper, "touchstart", function(ev){
            if(!isTouched){
                var event = ev || window.event;
                event.preventDefault();
                var touch = event.touches[0];
                startX = touch.pageX;
                startY = touch.pageY;
                timestamp = +new Date();
                moveLength = 0;
                content.style.transition = "";
                isTouched = true;
                isMove = false;
            }
        }, false);

        Bin.on(wrapper, "touchmove", function(ev){
            if(isTouched){
                var event = ev || window.event;
                event.preventDefault();
                var touch = event.touches[0];
                var deltaX = touch.pageX - startX;
                var deltaY = touch.pageY - startY;

                if(Math.abs(deltaX) > Math.abs(deltaY)){
                    var newPos = currentPos + deltaX;
                    if(newPos < 0 && newPos > maxDisplace){
                        transform(content, newPos);
                        moveLength = deltaX;
                        direction = deltaX > 0 ? "right" : "left";
                        isMove = true;
                    }
                }
            }
        }, false);

        Bin.on(wrapper, "touchend", function(ev){

            if(isMove && isTouched){
                var event = ev || window.event;
                event.preventDefault();
                var deltaTime = +new Date() - timestamp;
                content.style.transition = "0.3s ease transform";

                if(deltaTime < 300){
                    var finalPos = direction === "left" ? currentPos - pageWidth : currentPos + pageWidth;
                    transform(content, finalPos);
                    currentPos = finalPos;
                }else{
                    if(Math.abs(moveLength) < pageWidth/2){
                        transform(content, currentPos);
                    }else if(Math.abs(moveLength) >= pageWidth/2){
                        var finalPos = direction === "left" ? currentPos - pageWidth : currentPos + pageWidth;
                        transform(content, finalPos);
                        currentPos = finalPos;
                    }
                }
                isTouched = false;
            }
            setTimeout(function(){
                for(var i= 0, len = subs.length; i<len; i++){
                    subs[i].setAttribute("class", "");
                }
                subs[Math.abs(currentPos/pageWidth)].setAttribute("class", "now");
            }, 100);
            if(options["callback"]){
                setTimeout(function(){
                    options["callback"].apply(window, [content, pageViews[Math.abs(currentPos/pageWidth)]]);
                }, 150);
            }
        }, false);
    };

    return HorizontalSwipe;
});
