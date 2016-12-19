/**
 * Created by Bill on 2016/10/14.
 */
define(["jQuery", "underscore", "Backbone", "handlebars"]
    , function($, _, Backbone, Handlebars){

        var util = {};

        util.loadHandlebarTemplate = function(htmlTemplate, jsonData, el, appendYN){

            var compiledTemplate = Handlebars.compile(htmlTemplate);

            var elem = document.querySelector(el);

            if(elem){

                appendYN || this.cleanElement(el);

                var content = compiledTemplate(jsonData);
                var divTemp = document.createElement("div");
                var nodes;
                var fragment = document.createDocumentFragment();

                divTemp.innerHTML = content;
                nodes = divTemp.childNodes;

                for(var i= 0, len=nodes.length; i<len; i++){
                    fragment.appendChild(nodes[i].cloneNode(true));
                }
                elem.appendChild(fragment);

                nodes = null;
                fragment = null;
            }

        };

        //insertBefore
        util.loadHandlebarTemplate2 = function(htmlTemplate, jsonData, el){

            var compiledTemplate = Handlebars.compile(htmlTemplate);

            var elem = document.querySelector(el);

            if(elem && elem.firstChild){
                var content = compiledTemplate(jsonData);
                var divTemp = document.createElement("div");
                var nodes;
                var fragment = document.createDocumentFragment();

                divTemp.innerHTML = content;
                nodes = divTemp.childNodes;
                for(var i= 0, len=nodes.length; i<len; i++){
                    fragment.appendChild(nodes[i].cloneNode(true));
                }
                elem.insertBefore(fragment, elem.firstChild);

                nodes = null;
                fragment = null;
            }
        };

        //insertBeforeSpecificElement
        util.loadHandlebarTemplate3 = function(htmlTemplate, jsonData, el, specificElement){
            var compiledTemplate = Handlebars.compile(htmlTemplate);
            var elem = document.querySelector(el);
            var specificElem = elem.querySelector(specificElement);

            if(elem && specificElem){
                var content = compiledTemplate(jsonData);
                var divTemp = document.createElement("div");
                var nodes;
                var fragment = document.createDocumentFragment();

                divTemp.innerHTML = content;
                nodes = divTemp.childNodes;
                for(var i= 0, len=nodes.length; i<len; i++){
                    fragment.appendChild(nodes[i].cloneNode(true));
                }
                elem.insertBefore(fragment, specificElem);

                nodes = null;
                fragment = null;
            }
        };

        util.switchBackgroundColor = function(homeYN){
            if(homeYN){
                //document.documentElement.setAttribute("style", "background-color: #f2f2f2");
                //document.body.setAttribute("style", "background-color: #f2f2f2");
                document.documentElement.style.backgroundColor = "#f2f2f2";
                document.body.style.backgroundColor = "#f2f2f2";
            }else{
                //document.documentElement.setAttribute("style", "background-color: #fafafa");
                //document.body.setAttribute("style", "background-color: #fafafa");
                document.documentElement.style.backgroundColor = "#fafafa";
                document.body.style.backgroundColor = "#fafafa";
            }
        };

        util.setViewportHeight = function(){
            var elem = document.querySelector(".viewport");
            var subtitle = document.querySelector(".subtitle");

            if(elem){
                elem.setAttribute("style", "height: " + (window.innerHeight - subtitle.offsetHeight) + "px");
            }
        };

        util.setInnerViewportHeight = function(elem, anotherElem){
            var vp = document.querySelector(".viewport");

            if(elem && anotherElem){
                elem.setAttribute("style", "height: " + (vp.clientHeight - anotherElem.offsetHeight) + "px");
            }
        };

        util.cleanElement = function(el){
            var elem = document.querySelector(el);
            if(elem){
                var nodes = elem.childNodes;
                for(var i= 0, len= nodes.length; i<len; i++){
                    elem.removeChild(elem.childNodes[0]);
                }
            }
        };

        util.switchSpin = function(el){
            var spin = document.querySelector(el);
            var style = spin.getAttribute("class");
            if(style && style.indexOf("hidden") < 0){
                spin.setAttribute("class", style.replace(/(^\s+)|(\s+$)/g, "") + " hidden");
            }else{
                spin.setAttribute("class", style.replace(/hidden/, "").replace(/(^\s+)|(\s+$)/g, ""));
            }
        };

        util.closeOverLayer = function(){
            var overlayer = document.querySelector(".overlayer");
            overlayer.setAttribute("style", "display: none");
            document.body.style.overflow = "";
        };

        util.openOverLayer = function(){
            var overlayer = document.querySelector(".overlayer");
            overlayer.setAttribute("style", "");
            document.body.style.overflow = "hidden";
        };

        util.formatViewEL = function(){
            var EL = document.body.querySelector(".page");
            var newEL = document.createElement("div");
            newEL.setAttribute("class", "page");
            document.body.replaceChild(newEL, EL);
        };

        return util;
});