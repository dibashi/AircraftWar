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

        titleLabel: {
            default: null,
            type: cc.Node,
        },
        gouMaiLabel: {
            default: null,
            type: cc.Node,
        },

        node0: {
            default: null,
            type: cc.Prefab,
        },
        node1: {
            default: null,
            type: cc.Prefab,
        },
        node2: {
            default: null,
            type: cc.Prefab,
        },
        node3: {
            default: null,
            type: cc.Prefab,
        },
        node4: {
            default: null,
            type: cc.Prefab,
        },
        node5: {
            default: null,
            type: cc.Prefab,
        },


        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //把那边的node加载到这个界面

        this.startFadeIn();
    },

    startFadeIn: function () {
        cc.eventManager.pauseTarget(this.node, true);
        this.node.position = cc.p(0, 0);
        this.node.setScale(2);
        this.node.opacity = 0;

        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.0)), cbFadeIn);
        this.node.runAction(actionFadeIn);
    },
    onFadeInFinish: function () {
        cc.eventManager.resumeTarget(this.node, true);
    },



    gouMaiClick: function () {
        cc.log("gouMaiClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);
        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },

    onCancelClick: function () {
        cc.log("onCancelClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);
        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },

    onFadeOutFinish: function () {
        cc.eventManager.resumeTarget(this.onWho, true);
        this.node.destroy();
    },

    setTitle: function (titleTxt) {
        this.titleLabel.getComponent(cc.Label).string = titleTxt;
    },

    setPriceText: function (priceTxt) {
        this.gouMaiLabel.getComponent(cc.Label).string = priceTxt;
    },

    setNodeTag: function (nodeTag) {
        // this.node.addChild(menuNode);
        let _node = null;
        if (nodeTag == 0) {
            _node = cc.instantiate(this.node0);
            _node.scale = 1.5;
        }
        else if (nodeTag == 1) {
            _node = cc.instantiate(this.node1);
            _node.scale = 1.5;
        }
        else if (nodeTag == 2) {
            _node = cc.instantiate(this.node2);
            _node.scale = 1.5;
        }
        else if (nodeTag == 3) {
            _node = cc.instantiate(this.node3);
            _node.scale = 1.5;
        }
        else if (nodeTag == 4) {
            //cc.log('zhixing111111');
            _node = cc.instantiate(this.node4);
            _node.scale = 1.5;
        }
        else if (nodeTag == 5) {
            _node = cc.instantiate(this.node5);
            _node.scale = 1.5;
        }
        this.node.addChild(_node);
    },
});



