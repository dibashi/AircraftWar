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



        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
        _nodeTag: -1,

        LimitationsAlert: {
            default: null,
            type: cc.Prefab,
        }
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
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.3)), cbFadeIn);
        this.node.runAction(actionFadeIn);
    },
    onFadeInFinish: function () {
        cc.eventManager.resumeTarget(this.node, true);
    },



    gouMaiClick: function () {
        // cc.log("gouMaiClick");

        var today = new Date();

        let currDate = "" + today.getFullYear() + today.getMonth() + today.getDate();
        let preDate = cc.sys.localStorage.getItem('purchasingLimitationsDate');
        if (currDate == preDate) {
            console.log("日期相同");
            let lc = parseInt(cc.sys.localStorage.getItem("LimitationsCount"));
            if (lc >= 20) {
                console.log("限购");
                //弹窗

                cc.audioEngine.playEffect(this.buttonAudio, false);

                cc.eventManager.pauseTarget(this.node, true);
                let ss = cc.instantiate(this.LimitationsAlert);
                ss.setPosition(0, 0);

                ss.getComponent("zuanShiBuZuAlert").onWho = this.node;
                this.node.addChild(ss);
            } else {
                this._goumai();
                lc += 1;
                console.log("lc  " + lc);
                cc.sys.localStorage.setItem("LimitationsCount", lc);
            }

        } else {
            console.log("日期不同");
            this._goumai();
            cc.sys.localStorage.setItem("LimitationsCount", 1);

        }



    },

    _goumai: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);
        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);

        //以后这里要跳转到付款界面，然后在付款回调中来添加奖品。

        this.getPrizeByTag();

        if (this.onWho.getComponent("diamondStore") != null && this.onWho.getComponent("diamondStore") != undefined) {
            this.onWho.getComponent("diamondStore").refreshPrize();
        }

    },


    getPrizeByTag: function () {
        //  cc.log("!!!!!!!");
        //  cc.log(this._nodeTag);
        //添加 金币 护盾 必杀 生命
        //1 读取 2 添加 3 写入

        let dc = cc.sys.localStorage.getItem('diamondCount');

        if (this._nodeTag == 0) {
            //  cc.log("!!!!!!!nodeTag0");
            dc = parseInt(dc) + 100;
            cc.sys.localStorage.setItem('diamondCount', dc);

        } else if (this._nodeTag == 1) {
            dc = parseInt(dc) + 888;
            cc.sys.localStorage.setItem('diamondCount', dc);

        } else if (this._nodeTag == 2) {
            dc = parseInt(dc) + 1500;
            cc.sys.localStorage.setItem('diamondCount', dc);
        }
        else if (this._nodeTag == 3) {
            dc = parseInt(dc) + 25000;
            cc.sys.localStorage.setItem('diamondCount', dc);
        }
    },


    onCancelClick: function () {
        //  cc.log("onCancelClick");
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
        this._nodeTag = nodeTag;
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

        this.node.addChild(_node);
    },
});



