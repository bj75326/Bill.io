/**
 * Created by Bill on 2016/12/14.
 */
define(["util"], function(util){
    var Bin = {
        on: function(element, type, handler, userCapture){
            if(document.attachEvent){
                element.attachEvent("on"+ type, handler);
            }else if(document.addEventListener){
                element.addEventListener(type, handler, userCapture);
            }
        },

        off: function(element, type, handler, userCapture){
            if(document.detachEvent){
                element.detachEvent("on"+ type, handler);
            }else if(document.removeEventListener){
                element.removeEventListener(type, handler, userCapture);
            }
        },

        eventDispatch: function(element, type, customProperty){
            if(document.fireEvent){
                var event = document.createEventObject();
                event.eventType = type;
                event.dispatchFlag = true;
                element.fireEvent("on"+ type, event);
            }else if(document.dispatchEvent){
                var event = new MouseEvent('click', {
                    'view' : window,
                    'bubbles' : true,
                    'cancelable' : true
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

        debounce: function(idle, action){
            var last;
            return function(){
                clearTimeout(last);
                var ctx = this;
                var arg = arguments;
                last = setTimeout(function(){
                    return action.apply(ctx, arg);
                }, idle);
            }
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

        customAjaxCall: function(method, data, url, async){
            if(method.toLowerCase() === "get"){
                return new Promise(function(resolve, reject){
                    var xhr = new XMLHttpRequest();
                    //xhr.timeout = 3000;
                    xhr.responseType = "json";
                    xhr.onreadystatechange = function(){
                        if(xhr.readyState === 4){
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
            }else if(method.toLowerCase() === "post"){
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
        }
    };

    var ScrollLoadingForLzlo = function(options){

        /*
         *  options parameters:
         *
         */

        var viewport = options["viewport"] || document.querySelector(".viewport");
        var spin = options["spin"] || viewport.querySelector(".spin");
        var viewportHeight = viewport !== window ? viewport.clientHeight : window.innerHeight;

        var collection = options["collection"];
        var url = options["url"] || "/Bill.io/json/lazyLoading1.json";
        var template = options["template"];
        var callback = options["callback"];

        var loading = false;
        var testUsedOnly = false;

        // viewport滚动事件句柄
        var scrollFn = function(){
            var scrollTop;
            if(viewport === window){
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            }else{
                scrollTop = viewport.scrollTop;
            }

            var contentHeight = viewport !== window ? viewport.scrollHeight : document.body.scrollHeight;

            if((contentHeight - viewportHeight - scrollTop)/contentHeight < 0.02 && !loading){
                loading = true;

                if(spin.getAttribute("class").indexOf("hidden") >= 0){
                    spin.setAttribute("class", spin.getAttribute("class").replace(/hidden/, "").replace(/(^\s+)|(\s+$)/g, ""));
                }

                setTimeout(function(){
                    if(collection){
                        if(!template){
                            throw new TypeError("template required!!!");
                        }
                        if(testUsedOnly){
                            collection.url = "/Bill.io/json/lazyLoading3.json";
                        }else{
                            collection.url = url;
                        }
                        collection.fetch({
                            add: true,
                            success: function(collection, resp){
                                console.dir(collection.models);
                                console.dir(resp);
                                if(resp["content"].length > 0){
                                    util.loadHandlebarTemplate3(template, resp, ".viewport", ".spin");
                                    if(callback) callback({});
                                    testUsedOnly = true;
                                    loading = false;
                                }else if(resp["content"].length === 0 && resp["EOF"]){
                                    var tpl = '<div class="lazyloading-tips">没有更多内容了...</div>';
                                    util.loadHandlebarTemplate3(tpl, resp, ".viewport", ".spin");
                                    Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "", 500).then(function(){
                                        return Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "opacity: 0", 1500);
                                    }).then(function(){
                                        viewport.removeChild(viewport.querySelector(".lazyloading-tips"));
                                    });
                                }
                                util.switchSpin(".viewport .spin");
                            },
                            error: function(collection, resp){
                                var tpl = '<div class="lazyloading-tips">加载错误>_<</div>';
                                util.loadHandlebarTemplate3(tpl, resp, ".viewport", ".spin");
                                util.switchSpin(".viewport .spin");
                                Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "", 500).then(function(){
                                    return Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "opacity: 0", 1500);
                                }).then(function(){
                                    viewport.removeChild(viewport.querySelector(".lazyloading-tips"));
                                    loading = false;
                                });
                            }
                        });
                    }else{
                        if(testUsedOnly){
                            url = "/Bill.io/json/lazyLoading3.json";
                        }
                        Bin.customAjaxCall("get", null, url, true).then(function(value){
                            if(value["content"]){
                                var arrContent = value["content"];
                                var strContent = "";
                                if(arrContent.length){
                                    arrContent.forEach(function(value, index){
                                        strContent += '<div class="lazy-card"><div class="lazyload-imgWrapper"><img class="lazyload-img" src="" data-url="'
                                            + value["imgSrc"] + '" data-loaded="false"><div class="lazyload-default"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div></div></div>'
                                            + '<div class="lazyload-actbar"><span><i class="fa fa-heart" aria-hidden="true"></i> ' + value["lovedNum"] + '</span><span><i class="fa fa-share-alt" aria-hidden="true"></i>' + value["sharedNum"] + '</span></div>';
                                    });
                                    Bin.parseHTMLString(strContent, viewport, spin);
                                    spin.setAttribute("class", spin.getAttribute("class").replace(/(^\s+)|(\s+$)/g, "") + "hidden");
                                    if(callback) callback({});
                                    testUsedOnly = true;
                                    loading = false;
                                }else if(!arrContent.length && value["EOF"]){
                                    strContent += '<div class="lazyloading-tips">没有更多内容了...</div>';
                                    Bin.parseHTMLString(strContent, viewport, spin);
                                    spin.setAttribute("class", spin.getAttribute("class").replace(/(^\s+)|(\s+$)/g, "") + "hidden");
                                    Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "", 500).then(function(){
                                        return Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "opacity: 0", 1500);
                                    }).then(function(){
                                        viewport.removeChild(viewport.querySelector(".lazyloading-tips"));
                                    });
                                }
                            }
                        }, function(reason){
                            if(reason){
                                var strContent = '<div class="lazyloading-tips">加载错误>_<</div>';
                                Bin.parseHTMLString(strContent, viewport, spin);
                                spin.setAttribute("class", spin.getAttribute("class").replace(/(^\s+)|(\s+$)/g, "") + "hidden");
                                Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "", 500).then(function(){
                                    return Bin.styleChange(viewport.querySelector(".lazyloading-tips"), "opacity: 0", 1500);
                                }).then(function(){
                                    viewport.removeChild(viewport.querySelector(".lazyloading-tips"));
                                    loading = false;
                                });
                            }
                        });
                    }
                }, 800);
            }
        };

        // 事件绑定
        Bin.on(viewport, "scroll", scrollFn, false);
    };

    return ScrollLoadingForLzlo;
});