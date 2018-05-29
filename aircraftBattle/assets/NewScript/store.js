// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var heroPlaneID = require("heroPlaneID").heroPlaneID;
cc.Class({
    extends: cc.Component,

    properties: {
     

        spriteCoin:null,
        labelCoin:null,

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        soundSetting: {
            default: null,
            type: cc.Prefab,
        },

        storeAlert: {
            default: null,
            type: cc.Prefab,
        },

  //  settingButton:null,

        node0: {
            default: null,
            type:cc.Node,
        },
        node1: {
            default: null,
            type:cc.Node,
        },
        node2: {
            default: null,
            type:cc.Node,
        },
        node3: {
            default: null,
            type:cc.Node,
        },
        node4: {
            default: null,
            type:cc.Node,
        },
        node5: {
            default: null,
            type:cc.Node,
        },


        spriteDaZhao: {
            default: null,
            type: cc.Node,

        },

        dazhaoLabel: {
            default: null,
            type: cc.Node,

        },

        spriteHuDun: {
            default: null,
            type: cc.Node,

        },

        hudunLabel: {
            default: null,
            type: cc.Node,

        },

        spriteLife: {
            default: null,
            type: cc.Node,

        },

        lifeLabel: {
            default: null,
            type: cc.Node,

        },

    },

    // LIFE-CYCLE CALLBACKS:

  

   


   
    onLoad () {

         //适配
         let wx = cc.director.getVisibleSize().width*0.5;
         let hy = cc.director.getVisibleSize().height*0.5;
         this.spriteCoin = this.node.getChildByName("spriteCoin");
         this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width/2-wx,hy-(this.spriteCoin.getContentSize().height/2)-20);
         this.labelCoin = this.node.getChildByName("spriteCoin").getChildByName("coinLabel").getComponent(cc.Label);
         this.labelCoin.string = cc.sys.localStorage.getItem("jinBiCount");

         this.spriteDaZhao.setPosition(this.spriteCoin.getPosition().x+this.spriteCoin.getContentSize().width / 2+this.spriteDaZhao.getContentSize().width / 2+5, this.spriteCoin.getPosition().y);
         this.spriteHuDun.setPosition(this.spriteDaZhao.getPosition().x+this.spriteDaZhao.getContentSize().width / 2+this.spriteHuDun.getContentSize().width / 2+5, this.spriteCoin.getPosition().y);
         this.spriteLife.setPosition(this.spriteHuDun.getPosition().x+this.spriteHuDun.getContentSize().width / 2+this.spriteLife.getContentSize().width / 2+5, this.spriteCoin.getPosition().y);

        //  this.settingButton = this.node.getChildByName("soundSetting");
        //  this.settingButton.setPosition(this.settingButton.getContentSize().width / 2-wx,hy - this.spriteCoin.getContentSize().height-10 -(this.settingButton.getContentSize().height / 2));
        this.labelCoin.getComponent(cc.Label).string = cc.sys.localStorage.getItem('jinBiCount');
         this.dazhaoLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('dazhaoCount');
         this.hudunLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('hudunCount');
         this.lifeLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('planeLifeCount');
     },



    goMain:function() {
        cc.audioEngine.playEffect(this.buttonAudio,false);
        cc.log("goMain");
        cc.director.loadScene('start');
       

    },

    onSoundButtonClick:function() {
        cc.audioEngine.playEffect(this.buttonAudio,false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.soundSetting);
        ss.setPosition(0,0);

        ss.getComponent("sound").onWho = this.node;
        this.node.addChild(ss);

    },

    alertPop:function() {
        cc.audioEngine.playEffect(this.buttonAudio,false);

         cc.eventManager.pauseTarget(this.node, true);
         let ss = cc.instantiate(this.storeAlert);
         ss.setPosition(0,0);

         ss.getComponent("storeAlert").onWho = this.node;
         this.node.addChild(ss);
        // return ss;
    },

    alertPop:function() {
        cc.audioEngine.playEffect(this.buttonAudio,false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.storeAlert);
        ss.setPosition(0,0);

        ss.getComponent("storeAlert").onWho = this.node;
        this.node.addChild(ss);
        return ss;
    },

    button0Click:function() {
        cc.log("btn0 click!");
        //1 弹窗 把物品放在 弹窗 上  确定则购买， 取消则返回
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("1元大礼包");
         ss.getComponent("storeAlert").setPriceText("¥1购买");
         ss.getComponent("storeAlert").setNodeTag(0);
    },
    button1Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("超值礼包");
         ss.getComponent("storeAlert").setPriceText("¥8购买");
         ss.getComponent("storeAlert").setNodeTag(1);
    },
    button2Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("土豪金礼包");
         ss.getComponent("storeAlert").setPriceText("¥15购买");
         ss.getComponent("storeAlert").setNodeTag(2);
    },
    button3Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("2000金币");
         ss.getComponent("storeAlert").setPriceText("¥10购买");
         ss.getComponent("storeAlert").setNodeTag(3);
    },
    button4Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("必杀X10");
         ss.getComponent("storeAlert").setPriceText("¥10购买");
         ss.getComponent("storeAlert").setNodeTag(4);
    },
    button5Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("护盾X10");
         ss.getComponent("storeAlert").setPriceText("¥10购买");
         ss.getComponent("storeAlert").setNodeTag(5);
    },

    refreshPrize:function() {
        //刷新 金币 必杀 护盾 飞机命数的值
        this.labelCoin.getComponent(cc.Label).string = cc.sys.localStorage.getItem('jinBiCount');
        this.dazhaoLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('dazhaoCount');
        this.hudunLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('hudunCount');
        this.lifeLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('planeLifeCount');

    },
    


});
