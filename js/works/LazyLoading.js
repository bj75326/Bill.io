/**
 * Created by Bill on 2016/12/5.
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
                var event = new MouseEvent('click', {
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
                    xhr.responseType = "json"; //"blob", "arrayBuffer", "document", "text"
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4){
                            if(xhr.status == 200 || xhr.status == 304){
                                resolve(xhr.response);
                            }else{
                                reject("http_status_" + xhr.status);
                            }
                        }
                    };
                    xhr.open('GET', url, async);
                    xhr.send(null);
                });
            }else if(method.toLowerCase() == "post"){
                return new Promise(function(resolve, reject){
                    var xhr = new XMLHttpRequest();
                    //xhr.timeout = 3000;
                    xhr.responseType = "json";
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState == 4){
                            if(xhr.status == 200 || xhr.status == 304){
                                resolve(xhr.response);
                            }else{
                                reject("http_status_" + xhr.status);
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

        debounce: function(idle, action){
            var last;
            return function(){
                clearTimeout(last);
                var ctx = this;
                var arg = arguments;
                last = setTimeout(function(){
                    return action.apply(ctx, arg);
                }, idle);
            };
        },

        throttle: function(delay, action){
            var last = 0;
            return function(){
                var curr = +new Date();
                if(curr-last > delay){
                    last = curr;
                    return action.apply(this, arguments);
                }
            };
        },

        toArray: function(elements){
            var result = [];
            for(var i= 0, len = elements.length; i<len; i++){
                result.push(elements[i]);
            }
            return result;
        }
    };

    //var vpScrollHandlerBinded = false;

    var LazyLoading = function(options){

        /**
         *
         *
         */

        //变量初始化
        var viewport = options["viewport"] || document.querySelector(".viewport");
        var arrImg = viewport.querySelectorAll("img[data-loaded = false]");

        arrImg = Bin.toArray(arrImg);
        if(!arrImg.length) return;
        if(viewport === window){
            var vpHeight = window.innerHeight;
        }else{
            var vpHeight = viewport.offsetHeight;
        }

        //判断元素是否在可视窗口内, 暂时只考虑纵向判断。
        var visibleForViewport = function(elements, viewport){
            var elemHeight = elements.offsetHeight;
            if(viewport === window){
                var position = elements.getBoundingClientRect();
                if(position.top > vpHeight || position.bottom < 0){
                    return false;
                }else{
                    return true;
                }
            }else if(viewport === elements.offsetParent){
                //默认viewport是elements的offsetParent.
                var elemTop = elements.offsetTop;
                var elemBottom = elements.offsetTop + elemHeight;
                var vpScrollTop = viewport.scrollTop;
                if(elemTop > vpScrollTop + vpHeight || elemBottom < vpScrollTop){
                    return false;
                }else{
                    //console.log(elements);
                    return true;
                }
            }else{
                console.log("LazyLoading Layout Error.");
                return false;
            }
        };

        //viewport scroll 事件句柄
        var vpScrollHandler = function(){
            for(var i=0; i<arrImg.length; i++){
                if(arrImg[i].parentNode && visibleForViewport(arrImg[i].parentNode, viewport)){
                    arrImg[i].src = arrImg[i].dataset.url;
                    arrImg[i].dataset.loaded = true;
                    arrImg.splice(i--, 1);
                }
            }
            if(!arrImg.length){
                Bin.off(viewport, "scroll", vpScrollHandler, false);
            }
        };

        //img load 事件句柄
        var imgLoadHandler = function(){
            Bin.off(this, "load", arguments.callee, false);
            this.parentNode.querySelector(".lazyload-default").style.display = "none";
            this.style.display = "inline-block";
        };

        //事件绑定
        Bin.on(viewport, "scroll", vpScrollHandler, false);
        arrImg.forEach(function(currImg){
            Bin.on(currImg, "load", imgLoadHandler, false);
        });

        //LazyLoading被调用时即对所有image进行检测是否在可视窗口内。
        vpScrollHandler();
    };

    return LazyLoading;
});
