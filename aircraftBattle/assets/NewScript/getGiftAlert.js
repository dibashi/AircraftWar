// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {


        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        giftNode: {
            default: null,
            type: cc.Node
        },

        begin_gift: {
            default: null,
            type: cc.Node
        },

        daily_gift: {
            default: null,
            type: cc.Node
        },

        store_node0: {
            default: null,
            type: cc.Node
        },
        store_node1: {
            default: null,
            type: cc.Node
        },
        store_node2: {
            default: null,
            type: cc.Node
        },
        store_node3: {
            default: null,
            type: cc.Node
        },
        store_node4: {
            default: null,
            type: cc.Node
        },
        store_node5: {
            default: null,
            type: cc.Node
        },



        giftTag: "begin_gift",
        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
    },



    //onload的时候要知道是哪个gift要显示，所以要先调用 setGiftTag;
    setGiftTag: function (tag) {
        let gift_children = this.giftNode.children;

        for (let i = 0; i < gift_children.length; ++i) {
            gift_children[i].setPosition(2000, -2000);
        }
        
        this.giftTag = tag;

        switch (this.giftTag) {
            case "begin_gift":
                this.begin_gift.setPosition(0, 0);
                break;
            case "daily_gift":
                this.daily_gift.setPosition(0, 0);
                break;
            case "store_node0":
                this.store_node0.setPosition(0, 0);
                break;
            case "store_node1":
                this.store_node1.setPosition(0, 0);
                break;
            case "store_node2":
                this.store_node2.setPosition(0, 0);
                break;
            case "store_node3":
                this.store_node3.setPosition(0, 0);
                break;
            case "store_node4":
                this.store_node4.setPosition(0, 0);
                break;
            case "store_node5":
                this.store_node5.setPosition(0, 0);
                break;

        }
    },


    onLoad() {
        this.startFadeIn();
       

        
    },






    startFadeIn: function () {
        cc.eventManager.pauseTarget(this.node, true);
        this.node.position = cc.p(0, 0);
        this.node.setScale(2);
        this.node.opacity = 0;

        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.3)), cbFadeIn);
        this.node.runAction(actionFadeIn);
    },
    onFadeInFinish: function () {
        cc.eventManager.resumeTarget(this.node, true);
    },







    onFadeOutFinish: function () {
        cc.eventManager.resumeTarget(this.onWho, true);
        this.node.destroy();
    },


    onCancelClick: function () {
        cc.log("onCancelClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },



});



