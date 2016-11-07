/**
 * Created by Bill on 2016/10/18.
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

        ready: function(fn){
            if(document.attachEvent){
                document.attachEvent("onreadystatechange", function(){
                    if(document.readyState === "completed"){
                        document.detachEvent("onreadystatechange", arguments.callee);
                        fn();
                    }
                })
            }else if(document.addEventListener){
                document.addEventListener("DOMContentLoaded", function(){
                    document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                    fn();
                }, false);
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
        }
    };

    var ScrollLoading = function(options){
        /*
         *  options parameters:
         *  1. viewport element
         *  2. spin element
         *  3. Ajax method
         *  4. Ajax url
         *  5. Ajax async
         *  6. Page
         */

        //变量初始化
        var page = options["page"] || 1;
        var loading = false;
        var viewport = options["viewport"] || document.querySelector(".viewport");
        var spin = options["spin"] || viewport.querySelector(".spin");
        var viewportHeight = viewport !== window ? viewport.clientHeight : window.innerHeight;

        //判断是否需要对页面进行scrollloading处理
        var contentHeight = viewport !== window ? viewport.scrollHeight : document.body.scrollHeight;
        if(viewportHeight === contentHeight){
            return;
        }

        //spin隐藏切换
        var toggleSpin = function(){
            var style = spin.getAttribute("class");
            if(style.indexOf("hidden") < 0){
                spin.setAttribute("class", style.replace(/(^\s+)|(\s+$)/g, "") + " hidden");
            }else{
                spin.setAttribute("class", style.replace(/hidden/, "").replace(/(^\s+)|(\s+$)/g, ""));
            }
        };

        //viewport滚动事件回调函数定义
        var scrollFn = function(){
            var scrollTop;
            if(viewport === window){
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            }else{
                scrollTop = viewport.scrollTop;
            }

            var contentHeight = viewport !== window ? viewport.scrollHeight : document.body.scrollHeight;

            if((contentHeight - viewportHeight - scrollTop)/contentHeight < 0.01 && !loading){

                loading = true;

                if(spin.getAttribute("class").indexOf("hidden") >= 0){
                    spin.setAttribute("class", spin.getAttribute("class").replace(/hidden/, "").replace(/(^\s+)|(\s+$)/g, ""));
                }

                Bin.customAjaxCall("get", null, "/Bill.io/json/scrollLoading.json", true).then(function(value){
                    if(value["content"]){
                        var arrContent = value["content"];
                        var strContent = "";
                        arrContent.forEach(function(value, index){
                            strContent += '<div class="scrollloading-card"><section>' + (page * 20 + +value["content"])+ '</section></div>'
                        });
                        //console.log(strContent);
                        Bin.parseHTMLString(strContent, viewport, spin);
                        spin.setAttribute("class", spin.getAttribute("class").replace(/(^\s+)|(\s+$)/g, "") + " hidden");
                        page++;
                        loading = false;
                    }
                }, function(reason){
                    if(reason){
                        var strContent = '<div class="scrollloading-tips">加载错误>_<</div>';
                        console.log(reason);
                        Bin.parseHTMLString(strContent, viewport, spin);
                        spin.setAttribute("class", spin.getAttribute("class").replace(/(^\s+)|(\s+$)/g, "") + " hidden");
                    }
                });
            }
        };

        //函数节流处理
        var debouncedFn = Bin.debounce(20, scrollFn);

        //事件绑定
        Bin.on(viewport, "scroll", debouncedFn, false);
    };

    return ScrollLoading;

});
