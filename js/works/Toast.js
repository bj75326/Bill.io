/**
 * Created by jibin on 17/2/4.
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
                                reject(xhr.status);
                            }
                        }
                    };
                    xhr.open('POST', url, async);
                    //xhr.setRequestHeader("Content-Type", "application/json");
                    //xhr.setRequestHeader("Content-Type", "mutipart/form-data");
                    xhr.send(data);
                });
            }
        },

        extend: function(dest /*, any numbers of objects*/){
            var sources = Array.prototype.slice.call(arguments, 1);

            if(sources.length){
                for(var i=0, len1=sources.length; i<len1; i++){
                    var source = sources[i];
                    var arr = Object.keys(source);
                    for(var j=0, len2=arr.length; j<len2; j++){
                        dest[arr[j]] = source[arr[j]];
                    }
                }
            }
            return dest;
        }
    };

    /**
     *
     * @constructor
     */
    var Toast = function(options){
        /**
         * option parameters
         *
         *
         */

        this.options = Bin.extend({}, this.defaultOptions, options);
    };

    Toast.prototype = {
        constructor: Toast,

        defaultOptions: {

        },

        render: function(){

        },

        init: function(){

        },

        open: function(){

        },

        close: function(){

        }
    };

    return Toast;


});
