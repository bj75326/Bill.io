/**
 * Created by Bill on 2017/1/4.
 */
define(["jQuery", "underscore", "Backbone", "handlebars", "util"
        ,"text!/Bill.io/templates/DialogBox.tpl"
        ,"text!/Bill.io/templates/DialogBoxContent.tpl"
        ,"text!/Bill.io/templates/Error.tpl"
        ,"DialogBox"],
    function($, _, Backbone, Handlebars, util, DialogBoxTpl, DialogBoxContentTpl, ErrorTpl, DialogBox){

        var DialogBoxView = Backbone.View.extend({
            el: ".page",

            initialize: function(attrs){
                this.options = attrs;
            },

            render: function(){
                util.switchBackgroundColor(false);
                util.closeOverLayer();
                util.loadHandlebarTemplate(DialogBoxTpl, {}, ".page");
                util.setViewportHeight();

                util.loadHandlebarTemplate2(DialogBoxContentTpl, {}, ".viewport");
                util.switchSpin(".viewport .spin");

                var alert = new DialogBox({
                    //options defined here.
                    wrapper: '.page',

                    container: {
                        header : '提示',
                        content : {
                            message: '欢迎来到Bill.io！'
                        },
                        footer : [{
                            text : "确认",
                            fn : "yesFn",
                            highlight : true
                        }]
                    },

                    yesFn: function(){
                        this.close();
                    }
                });

                var confirm = new DialogBox({
                    wrapper: '.page',

                    container: {
                        header : '提示',
                        content : {
                            message: '确认执行此操作？'
                        },
                        footer : [{
                            text: '取消',
                            fn : 'noFn'
                        },{
                            text: '确认',
                            fn : 'yesFn',
                            highlight : true
                        }]
                    },

                    yesFn: function(){
                        this.close();
                    },

                    noFn: function(){
                        this.close();
                    }
                });

                var prompt = new DialogBox({
                    wrapper: '.page',

                    container: {
                        header : '提示',
                        content : {
                            message: '请输入姓名：',
                            input: {
                                name: 'name',
                                placeholder: '',
                                validator: 'validator'
                            }
                        },
                        footer : [{
                            text: '取消',
                            fn: 'noFn'
                        },{
                            text: '确认',
                            fn: 'yesFn',
                            highlight: true
                        }]
                    },

                    yesFn: function(){
                        this.close();
                    },

                    noFn: function(){
                        this.close();
                    }
                });

                var alertBtn = document.querySelectorAll(".dialogbox-button")[0];
                var confirmBtn = document.querySelectorAll(".dialogbox-button")[1];
                var promptBtn = document.querySelectorAll(".dialogbox-button")[2];
                alertBtn.addEventListener("click", function(){
                    alert.open();
                }, false);
                confirmBtn.addEventListener("click", function(){
                    confirm.open();
                }, false);
                promptBtn.addEventListener("click", function(){
                    prompt.open();
                }, false);
            },

            events: {
                "click .page-back>a": "overLayerHandler"
            },
            overLayerHandler: function(){
                util.openOverLayer();
                this.undelegateEvents();
            }
        });

        return DialogBoxView;
});
