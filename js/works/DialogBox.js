/**
 * Created by Bill on 2017/1/4.
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

        customAjaxCall: function(){

        },

        extend: function(dest /*, any numbers of objects*/){
            var sources = Array.prototype.slice.call(arguments, 1);

            if(sources.length) {
                for(var i=0, len1=sources.length; i<len1; i++){
                    var source = sources[i];
                    var arr = Object.keys(source);
                    for(var j= 0, len2 = arr.length; j<len2; j++){
                        dest[arr[j]] = source[arr[j]];
                    }
                }
            }
            return dest;
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

    /**
     * DialogBox 为构造函数...
     */
    var DialogBox = function(options){
        /**
         * option parameters
         *
         *
         *
         */

        this.options = Bin.extend({}, this.defaultOptions, options);

        this.init(); //ensure this.wrapper & this.overlayer existed
        this.render(); //get this.fragment ready
    };

    DialogBox.prototype = {
        constructor: DialogBox,

        defaultOptions: {
            //reinjection : false,
            container : {                       //String or Object
                header : '提示',
                content : {
                    message: '欢迎来到Bill.io！'
                    /*input: {
                     name: '',
                     placeholder: '',
                     validator: 'validator'
                     }*/
                },
                footer : [{
                    text : "确认",
                    fn : "yesFn",
                    highlight : true
                }]
            },
            yesFn : function(){
                console.log(this);
            },
            noFn : function(){
                console.log(this);
            },
            validator : function(){
                console.log(this);
            },
            wrapper : "body",

            overlayerForClose : false,

            enter_effect : "dialogbox-bounce-enter",

            leave_effect : "dialogbox-bounce-leave"
        },

        render: function(){
            var that = this;
            if(typeof this.options.container === "string"){
                var divTemp = document.createElement("div");
                var nodes;
                var fragment = document.createDocumentFragment();
                divTemp.innerHTML = this.options.container;
                nodes = divTemp.childNodes;
                if(nodes.length === 1){
                    this.fragment = fragment.appendChild(nodes[0]);
                }else{
                    this.fragment = fragment.appendChild(divTemp);
                }
                nodes = null;
                fragment = null;
                //this.originalClass = this.fragment.className;
                //when typeof container was string, another parameter required for event binding


            }else if(Object.prototype.toString.call(this.options.container).slice(8, -1) === "Object"){
                var fragment = document.createDocumentFragment();
                var dialogbox = document.createElement("div");
                dialogbox.setAttribute("class", "dialogbox");

                var header;
                if(!this.options.container["header"]){
                    header = this.defaultOptions.container.header;
                }else{
                    header = this.options.container["header"];
                }
                dialogbox.innerHTML = '<div class="dialogbox-header"><div class="dialogbox-title">' + header + '</div></div>';

                if(!this.options.container["content"] || !this.options.container["content"]["message"]){
                    dialogbox.querySelector("dialogbox-header").setAttribute("class", "dialogbox-header no-content");
                }

                if(this.options.container["content"]){
                    var content = document.createElement("div");
                    content.setAttribute("class", "dialogbox-content");
                    if(this.options.container["content"]["message"]){
                        content.innerHTML = '<div class="dialogbox-message">' + this.options.container["content"]["message"] + '</div>';
                    }
                    if(this.options.container["content"]["input"]){
                        var input = document.createElement("div");
                        input.setAttribute("class", "dialogbox-input");
                        input.innerHTML = '<input type="text" placeholder><div class="dialogbox-errmsg"></div>';

                        this.options.container["content"]["input"]["name"] || input.querySelector("input").setAttribute("name", this.options.container["content"]["input"]["name"]);
                        this.options.container["content"]["input"]["placeholder"] || input.querySelector("input").setAttribute("placeholder", this.options.container["content"]["input"]["placeholder"]);

                        content.appendChild(input);
                        content.setAttribute("class", "dialogbox-content input");
                    }

                    dialogbox.appendChild(content);
                }

                if(this.options.container["footer"] && this.options.container["footer"].length){
                    var footer = document.createElement("div");
                    footer.className = "dialogbox-footer";
                    var button, btnInfo;
                    for(var i= 0, len=this.options.container["footer"].length;i<len;i++){
                        btnInfo = this.options.container["footer"][i];
                        button = document.createElement("button");
                        button.innerHTML = btnInfo["text"];
                        if(btnInfo["highlight"]){
                            button.className = "dialogbox-btn highlight";
                        }else{
                            button.className = "dialogbox-btn";
                        }
                        if(btnInfo["fn"] && this.options[btnInfo["fn"]]){
                            Bin.on(button, "click", function(){
                                that.options[btnInfo["fn"]].apply(that, arguments);
                            }, false);
                        }
                        footer.appendChild(button);
                    }
                    dialogbox.appendChild(footer);
                }
                this.fragment = fragment.appendChild(dialogbox);

            }else{
                throw new TypeError("Bill.io_DialogBox_Container_TypeError...");
            }
        },

        init: function(){
            if(this.options.wrapper && document.querySelector(this.options.wrapper)){
                var wrapper = document.querySelector(this.options.wrapper);
                if(!wrapper.querySelector(this.options.wrapper + ">.dialogbox-wrapper")){
                    var div = document.createElement("div");
                    div.setAttribute("class", "dialogbox-wrapper");
                    wrapper.appendChild(div);
                }
                if(!wrapper.querySelector(this.options.wrapper + ">.dialogbox-overlayer")){
                    var layer = document.createElement("div");
                    layer.setAttribute("class", "dialogbox-overlayer");
                    wrapper.appendChild(layer);
                }
                this.wrapper = wrapper.querySelector(this.options.wrapper + ">.dialogbox-wrapper");
                this.overlayer = document.querySelector(this.options.wrapper + ">.dialogbox-overlayer");
            }else{
                if(!document.body.querySelector("body>.dialogbox-wrapper")){
                    var div = document.createElement("div");
                    div.setAttribute("class", "dialogbox-wrapper");
                    document.body.appendChild(div);
                }
                if(document.body.querySelector("body>.dialogbox-overlayer")){
                    var layer = document.createElement("div");
                    layer.setAttribute("class", "dialogbox-overlayer");
                    document.body.appendChild(layer);
                }
                this.wrapper = document.body.querySelector("body>.dialogbox-wrapper");
                this.overlayer = document.body.querySelector("body>.dialogbox-overlayer");
            }
        },

        open: function(){
            var that = this;
            //remove children of this.wrapper
            while(this.wrapper.lastChild){
                this.wrapper.removeChild(this.wrapper.lastChild);
            }
            this.wrapper.appendChild(this.fragment.cloneNode(true));

            var dialogbox = this.wrapper.childNodes[0];
            var originalClass = dialogbox.className;
            dialogbox.className += " " + this.options.enter_effect;

            this.overlayer.style.display = "block";
            this.wrapper.style.display = "block";

            if(this.options.overlayerForClose === true){
                this.closeFnForOverlayer = (function(){
                    this.close();
                }).bind(this);
                Bin.on(this.overlayer, "click", this.closeFnForOverlayer, false);
            }
            setTimeout(function(){
                dialogbox.className = originalClass;
            }, 20);
        },

        close: function(){
            var that = this;

            var dialogbox = this.wrapper.childNodes[0];
            //var originalClass = dialogbox.className;
            dialogbox.className += " " + this.options.leave_effect;

            if(this.options.overlayerForClose === true){
                Bin.off(this.overlayer, "click", this.closeFnForOverlayer, false);
            }
            setTimeout(function(){
                while(that.wrapper.lastChild){
                    that.wrapper.removeChild(that.wrapper.lastChild);
                }
                that.overlayer.style.display = "";
                that.wrapper.style.display = "";
            }, 200);
        },

        animate_open: function(){
            var that = this;
            while(this.wrapper.lastChild){
                this.wrapper.removeChild(this.wrapper.lastChild);
            }
            this.wrapper.appendChild(this.fragment.cloneNode(true));
            var dialogbox = this.wrapper.childNodes[0];
            dialogbox.className += " " + this.options.enter_effect;

            this.wrapper.style.display = "block";
            this.overlayer.style.display = "block";

            if(this.options.overlayerForClose === true){
                this.closeFnForOverlayer = (function(){
                    this.animate_close();
                }).bind(this);
                Bin.on(this.overlayer, "click", this.closeFnForOverlayer, false);
            }
        },

        animate_close: function(){
            var that = this;
            var dialogbox = this.wrapper.childNodes[0];
            dialogbox.className = dialogbox.className.replace(this.options.enter_effect, "").replace(/(^\s+)|(\s+$)/g, "");
            dialogbox.className += " " + this.options.leave_effect;
            if(this.options.overlayerForClose === true){
                Bin.off(this.overlayer, "click", this.closeFnForOverlayer, false);
            }

            setTimeout(function(){
                while(that.wrapper.lastChild){
                    that.wrapper.removeChild(that.wrapper.lastChild);
                }
                that.wrapper.style.display = "";
                that.overlayer.style.display = "";
            }, 500);
        }
    };

    return DialogBox;
});