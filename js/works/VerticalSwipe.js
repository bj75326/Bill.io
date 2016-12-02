/**
 * Created by Bill on 2016/11/25.
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

    var VerticalSwipe = function(options){
        /*
         *  options parameters
         *
         */
        var wrapper = options["wrapper"] || document.querySelector(".verticalSwipe");
        var content = options["content"] || document.querySelector(".verticalSwipe-content");
        var pageViews = options["pageViews"] || wrapper.querySelectorAll(".verticalSwipe-pageView");
        var subs = options["subs"] || document.querySelectorAll(".verticalSwipe-pageNumber>div");

        var startX, startY, timestamp;

        var currentPos = 0;

        var pageHeight = wrapper.clientHeight;
        var maxDisplace = -pageHeight * (pageViews.length - 1);

        var moveLength, direction;

        var isTouched = false;
        var isMove = false;

        var transform = function(element, pos){
            element.style.transform = "translate3d(0, "+ pos +"px, 0)";
        };

        Bin.on(wrapper, "touchstart", function(ev){
            if(!isTouched){
                isTouched = true;
                var event = ev || window.event;
                event.preventDefault();
                var touch = event.touches[0];
                startX = touch.pageX;
                startY = touch.pageY;
                timestamp = +new Date();
                moveLength = 0;
                content.style.transition = "";
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
                if(Math.abs(deltaY) > Math.abs(deltaX)){
                    var newPos = currentPos + deltaY;
                    if(newPos < 0 && newPos > maxDisplace){
                        transform(content, newPos);
                        moveLength = deltaY;
                        direction = deltaY > 0 ? "bottom" : "top";
                        isMove = true;
                    }
                }
            }
        }, false);

        Bin.on(wrapper, "touchend", function(ev){

            if(isMove && isTouched){
                var event = ev|| window.event;
                event.preventDefault();
                var deltaTime = +new Date() - timestamp;
                content.style.transition = "0.3s ease transform";

                if(deltaTime < 300){
                    var finalPos = direction === "top" ? currentPos - pageHeight : currentPos + pageHeight;
                    transform(content, finalPos);
                    currentPos = finalPos;
                }else{
                    if(Math.abs(moveLength) < pageHeight/2){
                        transform(content, currentPos);
                    }else if(Math.abs(moveLength) >= pageHeight/2){
                        var finalPos = direction === "top" ? currentPos - pageHeight : currentPos + pageHeight;
                        transform(content, finalPos);
                        currentPos = finalPos;
                    }
                }
            }
            isTouched = false;
            setTimeout(function(){
                for(var i= 0, len = subs.length; i<len; i++){
                    subs[i].setAttribute("class", "");
                }
                subs[Math.abs(currentPos/pageHeight)].setAttribute("class", "now");
            }, 100);
            if(options["callback"]){
                setTimeout(function(){
                    options["callback"].apply(window, [content, pageViews[Math.abs(currentPos/pageHeight)]]);
                }, 150);
            }
        }, false);
    };

    return VerticalSwipe;
});