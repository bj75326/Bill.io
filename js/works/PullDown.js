/**
 * Created by Bill on 2016/11/2.
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

        customAjaxCall: function(method, data, url, async){
            if(method.toLowerCase() == "get"){
                return new Promise(function(resolve, reject){
                    var xhr = new XMLHttpRequest();
                    //xhr.timeout = 3000;
                    xhr.responseType = "json";
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4){
                            if(xhr.status == 200 || xhr.status == 304){
                                resolve(xhr.response);
                            }else{
                                reject(xhr.status);
                            }
                        }
                    };
                    xhr.open("GET", url, async);
                    xhr.send(null);
                });
            }else if(method.toLowerCase() == "post"){
                return new Promise(function(resolve, reject){
                    var xhr = new XMLHttpRequest();
                    //xhr.timeout = 3000;
                    xhr.responseType = "json";
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4){
                            if(xhr.status == 304 || xhr.status == 200){
                                resolve(xhr.response);
                            }else{
                                reject(xhr.status);
                            }
                        }
                    };
                    xhr.open("POST", url, async);
                    //xhr.setRequestHeader("Content-Type", "application/json");
                    //xhr.setRequestHeader("Content-Type", "mutipart/form-data");
                    xhr.send(data);
                });
            }
        },

        parseHTMLString: function(html, ctx, beforeNode){
            var divTemp = document.createElement("div");
            var nodes;
            var fragment = document.createDocumentFragment();

            divTemp.innerHTML = html;
            nodes = divTemp.childNodes;
            for(var i= 0, len=nodes.length; i<len; i++){
                fragment.appendChild(nodes[i].cloneNode(true));
            }
            ctx.insertBefore(fragment, beforeNode);

            nodes = null;
            fragment = null;
        }
    };

    var PullDown = function(options){
        /*
         *  options parameters
         *  1.  viewport element
         *  2.  pullElement element
         *  3.
         *
         */

        //变量初始化
        var isTouched = false;
        var isLocked = false;
        var isRefresh = false;
        var viewport = options["viewport"] || document.querySelector(".viewport");
        var pullElement = options["pullElement"] || document.querySelector(".pulldown-content");
        var contentList = options["contentList"] || document.querySelector(".pulldown-list");
        var arrow = options["arrow"] || document.querySelector(".pulldown-top .arrow");
        var snake = options["snake"] || document.querySelector(".pulldown-top span:nth-child(2)");
        var successTip = options["successTip"] || document.querySelector(".pulldown-top .success");
        var failureTip = options["failureTip"] || document.querySelector(".pulldown-top .failure");
        var pullTop = document.querySelector(".pulldown-top");

        var page = 1;

        var transform = function(element, pos){
            element.style.transform = "translate3d( 0, " + pos + "px, 0)";
        };

        var startX, startY;

        Bin.on(viewport, 'touchstart', function(ev){
            if(viewport.scrollTop <= 0 && !isTouched && !isLocked){
                isTouched = true;
                var event = ev || window.event;
                //event.preventDefault();
                //console.log(event);
                startX = event.touches[0].pageX;
                startY = event.touches[0].pageY;
                pullElement.setAttribute("class", pullElement.getAttribute("class").replace(/is-dropped(-slow)?/g, "").replace(/(^\s+)|(\s+$)/g, ""));
            }
        }, false);

        Bin.on(viewport, 'touchmove', function(ev){
            if(viewport.scrollTop <= 0 && isTouched) {
                var event = ev || window.event;
                //console.log(event.touches[0]);
                var endY = event.touches[0].pageY;
                if(startY < endY){
                    event.preventDefault();
                    var deltaY = Math.abs(startY-endY)/2;
                    transform(pullElement, deltaY);

                    if(deltaY > 70){
                        arrow.setAttribute("class", "is-rotated");
                        isRefresh = true;
                    }else{
                        arrow.setAttribute("class", "");
                        isRefresh = false;
                    }
                }
            }
        }, false);

        Bin.on(viewport, 'touchend', function(ev){
            if(viewport.scrollTop <= 0 && isTouched){
                var event = ev || window.event;

                pullElement.setAttribute("class", pullElement.getAttribute("class").replace(/(^\s+)|(\s+$)/g, "") + " is-dropped");
                isTouched = false;

                //console.log(event);
                if(isRefresh){
                    isLocked = true;
                    arrow.setAttribute("class", "");
                    arrow.style.display = "none";
                    snake.style.display = "";
                    transform(pullElement, 50);
                    setTimeout(function(){
                        Bin.customAjaxCall("get", null, "/Bill.io/json/scrollLoading.json", true).then(function(value){
                            if(value["content"]){
                                var arrContent = value["content"];
                                var strContent = "";
                                for(var i= 0; i<10; i++){
                                    strContent += "<div class='scrollloading-card'><section>" + (arrContent[i]["content"]-10 * page) + "</section></div>"
                                }
                                Bin.parseHTMLString(strContent, contentList, document.querySelector(".pulldown-list .scrollloading-card:nth-child(1)"));
                                snake.style.display = "none";
                                successTip.style.display = "";
                                pullElement.setAttribute("class", pullElement.getAttribute("class").replace(/is-dropped/g, "").replace(/(^\s+)|(\s+$)/g,"") + " is-dropped-slow");
                                return new Promise(function(resolve, reject){
                                    setTimeout(function(){
                                        resolve();
                                    }, 600);
                                });
                            }
                        }, function(reason){
                            snake.style.display = "none"
                            failureTip.style.display = "";
                            pullElement.setAttribute("class", pullElement.getAttribute("class").replace(/is-dropped/g, "").replace(/(^\s+)|(\s+$)/g,"") + " is-dropped-slow");
                            return new Promise(function(resolve, reject){
                                setTimeout(function(){
                                    resolve();
                                }, 600);
                            });
                        }).then(function(){
                            transform(pullElement, 0);
                            return new Promise(function(resolve, reject){
                                setTimeout(function(){
                                    resolve();
                                }, 600);
                            });
                        }, function(){
                            //N.A.
                        }).then(function(){
                            arrow.style.display = "";
                            successTip.style.display = "none";
                            failureTip.style.display = "none";
                            page++;
                            isLocked = false;
                        }, function(){
                            //N.A.
                        });
                    }, 600);
                }else{
                    transform(pullElement, 0);
                }
            }
        }, false);
    };

    return PullDown;
});