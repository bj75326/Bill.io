/**
 * Created by Bill on 2016/7/12.
 */

var Bin = {

    mixin: function (dest /*, any numbers of object*/) {    //_.extend(), $.extend()
        var sources = Array.prototype.slice.call(arguments, 1);

        for (var i = 0, len = sources.length; i < len; i++) {
            var src = sources[i];
            for (var key in src) {
                if (!(key in dest)) {
                    dest[key] = src[key];
                }
            }
        }

        return dest;
    },

    extend: function (dest /*, any numbers of objects*/){  //����source�����е��������Ը��ǵ�destination�����ϣ����ҷ��� destination ����. �����ǰ�˳���, ���Ժ���Ķ������Ի��ǰ��Ķ������Ը��ǵ�(������ظ�).
        var sources = Array.prototype.slice.call(arguments, 1).reverse();

        for(var i= 0, len= sources.length; i<len; i++){
            var src = sources[i];
            for(var key in src){
                if (!(key in dest)){
                    dest[key] = src[key];
                }
            }
        }

        return dest;
    },

    defaults: function(obj /*, defaults*/){
        var oDefaults = Array.prototype.slice.call(arguments, 1);

        for(var i=0, len=oDefaults.length; i<len; i++){
            var oDefault = oDefaults[i];
            for(var key in oDefault){
                if(obj[key] === void 0){
                    obj[key] = oDefault[key]
                }
            }
        }

        return obj;
    },


    /*
     * _.result(object, property, [defaultValue])
     */
    result: function(object, property, defaultValue){
        var value = object[property];
        if(value){
            if(Object.prototype.toString.call(value).slice(8, -1) === "Function"){
                return "nonsense";
            }else{
                return value;
            }
        }else{
            return defaultValue;
        }
    },

    clone: function(obj){
        var result;

        if(typeof obj == "object"){
            if(obj === null){
                result = null;
            }else{
                if(obj instanceof Array){
                    result = [];
                    for(var i=0, len=obj.length; i<len; i++){
                        result.push(this.clone(obj[i]));
                    }
                }else{
                    result = {};
                    for(var prop in obj){
                        result[prop] = this.clone(obj[prop]);
                    }
                }
            }
        }else {
            result = obj;
        }
        return result;
    },

    isEqual: function(){  //underscore _.isEqual()

    },

    uniqueArray1: function (arr) {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (result.indexOf(arr[i]) == -1) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    uniqueArray2: function (arr) {
        var result = [];
        var hash = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            if (!(arr[i] in hash)) {
                hash[arr[i]] = true;
                result.push(arr[i]);
            }
        }
        return result;
    },

    uniqueArray3: function (arr) {
        arr.sort();
        var result = [arr[0]];
        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] !== result[result.length - 1]) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    getAllPropertyNames: function (obj) {
        var result = [];
        do {
            result = result.concat(Object.getOwnPropertyNames(obj));
        } while (obj = Object.getPrototypeOf(obj))
        return result;
    },

    ready: function(fn){
        if(document.addEventListener){
            document.addEventListener("DOMContentLoaded", function(){
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                fn();
            }, false);
        }else if(document.attachEvent){
            document.attachEvent("onreadystatechange", function(){
                if(document.readyState == "complete"){
                    document.detachEvent("onreadystatechange", arguments.callee);
                    fn();
                }
            });
        }
    },

    on: function(element, type, handler, userCapture){
        if(document.addEventListener){
            element.addEventListener(type, handler, userCapture);
        }else if(document.attachEvent){
            element.attachEvent("on" + type, handler);
        }
    },

    off: function(element, type, handler, userCapture){
        if(document.removeEventListener){
            element.removeEventListener(type, handler, userCapture);
        }else if(document.detachEvent){
            element.detachEvent("on" + type, handler);
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
                for(var prop in customProperty){
                    if(!(prop in event)){
                        event[prop] = customProperty[prop];
                    }
                }
            }
            element.dispatchEvent(event);
        }
    },

    parseURL: function(url){
        var oA = document.createElement("a");
        var result = {};
        oA.href = url;
        result.source = url;
        result.protocol = oA.protocol.replace(/:/, '');
        result.hostname = oA.hostname;
        result.port = oA.port;
        result.pathname = oA.pathname;
        result.querys = {};
        if(oA.search){
            var aQuerys = oA.search.substring(1).split("&");
            for(var i= 0, len= aQuerys.length; i< len; i++){
                var tmp = aQuerys[i].split("=");
                result.querys[tmp[0]] = tmp[1];
            }
        }
        return result;
    },

    customAjaxCall: function(method, data, url, async){  //return a Promise object
        if(method.toLowerCase() == "get"){
            return new Promise(function(resolve, reject){
                var xhr = new XMLHttpRequest();
                //xhr.timeout = 3000;
                xhr.responseType = "json"; //"blob", "arrayBuffer", "document", "text"
                xhr.onreadystatechange = function(){
                    if(xhr.readyState == 4){
                        if(xhr.status == 200 || xhr.status == 304){  //for RESTful, should take care
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
                var xhr = new XMLHttpRequest(); // readyState == 0
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
                xhr.open("POST", url, async); // readyState = 1
                //xhr.setRequestHeader("Content-Type", "application/json");
                //xhr.setRequestHeader("Content-Type", "mutipart/form-data");
                xhr.send(data); // readyState = 2
            });
        }
    },

    isArray: function(arr){
        return Object.prototype.toString.call(arr).slice(8, -1) == "Array";
    },

    isFunction: function(fn){
        return Object.prototype.toString.call(fn).slice(8, -1) == "Function";
    },

    pick: function(obj, iterator, context){
        var result = {};
        if(Bin.isFunction(iterator)){
            for(var key in obj){
                var value = obj[key];
                if(iterator.call(context, value, key, obj)){
                    result[key] = value;
                }
            }
        }else{
            var keys = Array.prototype.concat.apply([], Array.prototype.slice.call(arguments, 1));

            for(var i=0, len=keys.length; i<len; i++){
                var key = keys[i];
                if(key in obj){
                    result[key] = obj[key];
                }
            }
        }
        return result;
    },

    arrayFlatten: function(arr){
        if(!this.isArray(arr)){
            return arr;
        }else{
            return Array.prototype.concat.apply([], arr.map(function(value){
                return this.arrayFlatten(value);
            }));
        }
    },

    parseHTMLString: function(ctx, html){
        var divTemp = document.createElement('div');
        var nodes;
        var fragment = document.createDocumentFragment();

        divTemp.innerHTML = html;
        nodes = divTemp.childNodes;
        for(var i= 0, len=nodes.length; i<len; i++){
            fragment.appendChild(nodes[i].cloneNode(true));
        }
        ctx.appendChild(fragment);

        nodes = null;
        fragment = null;
    },

    throttle: function(delay, action){
        var last = 0;
        return function(){
            var curr = +new Date();
            if(curr-last > delay){
                action.apply(this, arguments);
                last = curr;
            }
        };
    },

    debounce: function(idle, action){
        var last;
        return function(){
            var ctx = this;
            var arg = arguments;
            clearTimeout(last);
            last = setTimeout(function(){
                action.apply(ctx, arg);
            }, idle);
        }
    },

    shuffle1: function(arr){
        if(!Bin.isArray(arr)){
            throw new TypeError("argument type error");
        }else{
            var result = [];
            var index;
            for(var i=0, len=arr.length; i<len; i++){
                index = Math.floor(Math.random() * arr.length);
                result.push(arr.splice(index, 1)[0]);
            }
            return result;
        }
    },

    shuffle2: function(arr){
        if(!Bin.isArray(arr)){
            throw new TypeError("argument type error");
        }else {
            return arr.sort(function(){
                return Math.round(Math.random());
            });
        }
    },

    //for DOM element
    getPos: function(element){
        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = element.getBoundingClientRect();
        return {
            top: pos.top + scrollY,
            right: pos.right + scrollX,
            bottom: pos.bottom + scrollY,
            left: pos.bottom + scrollX
        };
    },

    pageX: function(element){
        return element.offsetLeft + (element.offsetParent ? arguments.callee(element.offsetParent) : 0);
    },

    pageY: function(element){
        return element.offsetTop + (element.offsetParent ? arguments.callee(element.offsetParent) : 0);
    },

    getBrowserInfo: function(){
        var result = {};

        var m = window.navigator.userAgent.toLowerCase().match(/(msie|firefox|chrome|opera|version).*?([\d.]+)/);
        m[1].replace(/version/, 'safari');

        result.browser = m[1];
        result.version = m[2];

        return result;

    },

    isPC: function(){
        var flag = true;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var ua = window.navigator.userAgent;
        Agents.forEach(function(value){
            if(ua.indexOf(value) > -1){
                flag = false;
            }
        });
        return flag;
    },

    random: function(m, n){
        return Math.floor(Math.random() * (n - m) + m );
    }
};

//some use cases, pls ignore when import Bin.js

/**
 * mixinʵ�ֶ���̳�
 */
var A = function () {
    function SuperClass() {
        this.x = 0;
        this.y = 0;
    }

    SuperClass.prototype.fn1 = function () {
        console.info("fn1 defined in SuperClass's prototype");
    };

    SuperClass.prototype.fn2 = function () {
        console.info("fn2 defined in SuperClass's prototype");
    };

    function OtherSuperClass() {
        this.z = 0;
    }

    OtherSuperClass.prototype.fn3 = function () {
        console.info("fn3 defined in OtherSuperClass's prototype");
    }

    function MyClass() {
        SuperClass.call(this);
        OtherSuperClass.call(this);
    }

    Bin.mixin(MyClass.prototype, SuperClass.prototype, OtherSuperClass.prototype);

    var obj = new MyClass();
};

/**
 * Object.Create ʵ�ֵ�����̳�
 */
var B = function(){
    function SuperClass(){
        this.x = 0;
        this.y = 0;
    }
    SuperClass.prototype.fn1 = function(){
        console.info("fn1 defined in SuperClass's prototype");
    };
    SuperClass.prototype.fn2 = function () {
        console.info("fn2 defined in SuperClass's prototype");
    };

    function MyClass(){
        SuperClass.call(this);
        this.z = 0;
    }

    MyClass.prototype = Object.create(SuperClass.prototype);

    var obj = new MyClass();
};

Function.prototype.extend = function () {
    var Child = this;
    var cProto = Child.prototype;
    var aParents = Array.prototype.slice.call(arguments);
    var wrapChild = function () {
        var ctx = this;
        aParents.forEach(function (Parent) {
            Parent.call(ctx);
        });
        Child.call(ctx);
    };

    aParents.forEach(function (Parent) {
        var proto = Parent.prototype;
        for (var key in proto) {
            if (!(key in cProto)) {
                cProto[key] = proto[key];
            }
        }
    });
    wrapChild.prototype = cProto;
    return wrapChild;
};



