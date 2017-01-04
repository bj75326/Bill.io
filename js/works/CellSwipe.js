/**
 * Created by Bill on 2016/12/27.
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
                    "view" : window,
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

    var CellSwipe = function(options){
        /**
         * options parameters
         *
         *
         */

        var wrapper = options["wrapper"] || document.querySelectorAll(".bin-cell-wrapper")[0];

        var cellContents = wrapper.querySelectorAll(".bin-cell-swipe .bin-cell-content");
        var direction = options["direction"] || "left";
        var clickFn = options["cellClickHandler"];

        var transform = function(element, pos){
            element.style.transform = "translate3d(" + pos + "px, 0, 0)";
        };

        var startX, startY, timestamp;

        var isTouched = false;
        var isSwiped = false;
        var isMove = false;
        var isClickWork = true;
        var swipeLocked = false;
        var scrollLocked = false;
        var touchMoveInit = false;

        var swipedCell;
        var swipingCell;
        var swipingCellLBG;
        var swipingCellRBG;
        var swipingCellContent;
        var swipingCellLBG_width;
        var swipingCellRBG_width;

        var swipeDistance = 0;

        //touchstart 句柄
        var cellTouchStartFn = function(ev){
            if(!isTouched){
                isTouched = true;
                isMove = false;
                var event = ev||window.event;
                //event.preventDefault();
                if(isSwiped && swipedCell){
                    var leftBtnGroup = swipedCell.querySelector(".bin-cell-left");
                    var rightBtnGroup = swipedCell.querySelector(".bin-cell-right");
                    var content = swipedCell.querySelector(".bin-cell-content");
                    swipedCell.setAttribute("class", swipedCell.getAttribute("class").replace(/bin-cell-transition/g, "").replace(/(^\s+)|(\s+$)/g, "") + " bin-cell-transition");
                    transform(leftBtnGroup, -leftBtnGroup.clientWidth);
                    transform(content, 0);
                    transform(rightBtnGroup, rightBtnGroup.clientWidth);

                    isSwiped = false;
                    swipedCell = null;
                    swipingCell = null;

                    isClickWork = false;
                }else{
                    var touch = event.touches[0];
                    startX = touch.pageX;
                    startY = touch.pageY;
                    timestamp = +new Date();
                    isClickWork = true;
                    swipingCellContent = this;
                    swipingCell = swipingCellContent.parentNode;
                    swipingCellLBG = swipingCell.querySelector(".bin-cell-left");
                    swipingCellRBG = swipingCell.querySelector(".bin-cell-right");
                    swipingCellLBG_width = swipingCellLBG.clientWidth;
                    swipingCellRBG_width = swipingCellRBG.clientWidth;
                    swipingCell.setAttribute("class", swipingCell.getAttribute("class").replace(/bin-cell-transition/g, "").replace(/(^\s+)|(\s+$)/g, ""));
                    swipeDistance = 0;
                }
            }
        };

        //touchmove 句柄
        var cellTouchMoveFn = function(ev){
            if(isTouched && swipingCell){
                var event = ev || window.event;
                var touch = event.touches[0];
                var deltaX = touch.pageX - startX;
                var deltaY = touch.pageY - startY;

                if(!touchMoveInit){
                    touchMoveInit = true;
                    if(Math.abs(deltaX) > Math.abs(deltaY)){
                        scrollLocked = true;
                    }else{
                        swipeLocked = true;
                    }
                }

                if(!swipeLocked && scrollLocked){
                    event.preventDefault();
                    if(direction === "left"){
                        if(deltaX <= 0 && deltaX >= -swipingCellRBG_width){
                            transform(swipingCellLBG, -swipingCellLBG_width + deltaX);
                            transform(swipingCellRBG, swipingCellRBG_width + deltaX);
                            transform(swipingCellContent, deltaX);
                            isMove = true;
                            swipeDistance = deltaX;
                            //console.log("moved");
                        }
                    }else if(direction === "right"){
                        if(deltaX >=0 && deltaX <= swipingCellLBG_width){
                            transform(swipingCellLBG, -swipingCellLBG_width + deltaX);
                            transform(swipingCellRBG, swipingCellRBG_width + deltaX);
                            transform(swipingCellContent, deltaX);
                            isMove = true;
                            swipeDistance = deltaX;
                        }
                    }
                }
            }
        };

        //touchend 句柄
        var cellTouchEndFn = function(ev){
            if(isTouched && swipingCell && isMove){
                var event = ev || window.event;
                //event.preventDefault();
                var deltaTime = +new Date() - timestamp;
                swipingCell.setAttribute("class", swipingCell.getAttribute("class").replace(/bin-cell-transition/g, "").replace(/(^\s+)|(\s+$)/g, "") + " bin-cell-transition");

                if(deltaTime < 300){
                    if(direction === "left"){
                        transform(swipingCellLBG, -swipingCellLBG_width - swipingCellRBG_width);
                        transform(swipingCellRBG, 0);
                        transform(swipingCellContent, -swipingCellRBG_width);
                    }else if(direction === "right"){
                        transform(swipingCellLBG, 0);
                        transform(swipingCellRBG, swipingCellRBG_width + swipingCellLBG_width);
                        transform(swipingCellContent, swipingCellLBG_width);
                    }
                    isSwiped = true;
                    swipedCell = swipingCell;
                }else{
                    if(direction === "left"){
                        if(swipeDistance < -swipingCellRBG_width/2){
                            transform(swipingCellLBG, -swipingCellLBG_width - swipingCellRBG_width);
                            transform(swipingCellRBG, 0);
                            transform(swipingCellContent, -swipingCellRBG_width);
                            isSwiped = true;
                            swipedCell = swipingCell;
                        }else{
                            transform(swipingCellLBG, -swipingCellLBG_width);
                            transform(swipingCellRBG, swipingCellRBG_width);
                            transform(swipingCellContent, 0);
                            isSwiped = false;
                            swipedCell = null;
                        }
                    }else if(direction === "right"){
                        if(swipeDistance > swipingCellLBG_width/2){
                            transform(swipingCellLBG, 0);
                            transform(swipingCellRBG, swipingCellRBG_width + swipingCellLBG_width);
                            transform(swipingCellContent, swipingCellLBG_width);
                            isSwiped = true;
                            swipedCell = swipingCell;
                        }else{
                            transform(swipingCellLBG, -swipingCellLBG_width);
                            transform(swipingCellRBG, swipingCellRBG_width);
                            transform(swipingCellContent, 0);
                            isSwiped = false;
                            swipedCell = null;
                        }
                    }
                }
            }
            isTouched = false;
            touchMoveInit = false;
            swipeLocked = false;
            scrollLocked = false;
            swipingCell = null;
            swipingCellLBG = null;
            swipingCellRBG = null;
            swipingCellContent = null;
            swipingCellLBG_width = undefined;
            swipingCellRBG_width = undefined;
        };

        var cellClickFn = function(ev){
            var event = ev||window.event;
            if(isClickWork){
                if(clickFn){
                    clickFn.apply(this, arguments);
                }
            }else{
                event.preventDefault();
            }
        };

        //bind
        var i, len;
        for(i= 0, len=cellContents.length; i<len; i++){
            Bin.on(cellContents[i], "touchstart", cellTouchStartFn, false);
        }
        for(i= 0, len=cellContents.length; i<len; i++){
            Bin.on(cellContents[i], "touchmove", cellTouchMoveFn, false);
        }
        for(i= 0, len=cellContents.length; i<len; i++){
            Bin.on(cellContents[i], "touchend", cellTouchEndFn, false);
        }
        for(i= 0, len=cellContents.length; i<len; i++){
            Bin.on(cellContents[i], "click", cellClickFn, false);
        }
    };

    return CellSwipe;
});
