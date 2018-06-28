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
     

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        soundSetting: {
            default: null,
            type: cc.Prefab,
        },

        diamondAlert: {
            default: null,
            type: cc.Prefab,
        },



      


       

        spriteDiamond: {
            default: null,
            type: cc.Node,

        },

        diamondLabel: {
            default: null,
            type: cc.Node,

        },

    },

    // LIFE-CYCLE CALLBACKS:

  

   


   
    onLoad () {
       
        let wx = cc.director.getVisibleSize().width * 0.5;
        let hy = cc.director.getVisibleSize().height * 0.5;

        this.spriteDiamond.setPosition(this.spriteDiamond.getContentSize().width / 2 - wx, hy - (this.spriteDiamond.getContentSize().height / 2) - 10);
        
        this.diamondLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('diamondCount');
      
     },



    goMain:function() {
        cc.audioEngine.playEffect(this.buttonAudio,false);
        cc.log("goMain");
        cc.director.loadScene('store');
       

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
        let ss = cc.instantiate(this.diamondAlert);
        ss.setPosition(0,0);

        ss.getComponent("diamondAlert").onWho = this.node;
        this.node.addChild(ss);
        return ss;
    },

    button0Click:function() {
        cc.log("btn0 click!");
        //1 弹窗 把物品放在 弹窗 上  确定则购买， 取消则返回
        let ss = this.alertPop();

        ss.getComponent("diamondAlert").setTitle("钻石购买");
         ss.getComponent("diamondAlert").setPriceText("¥1购买");
         ss.getComponent("diamondAlert").setNodeTag(0);
    },
    button1Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("超值礼包");
         ss.getComponent("storeAlert").setPriceText("¥12购买");
         ss.getComponent("storeAlert").setNodeTag(1);
    },
    button2Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("土豪金礼包");
         ss.getComponent("storeAlert").setPriceText("¥128购买");
         ss.getComponent("storeAlert").setNodeTag(2);
    },
    button3Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("金币礼包");
         ss.getComponent("storeAlert").setPriceText("¥12购买");
         ss.getComponent("storeAlert").setNodeTag(3);
    },
    button4Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("进攻礼包");
         ss.getComponent("storeAlert").setPriceText("¥8购买");
         ss.getComponent("storeAlert").setNodeTag(4);
    },
    button5Click:function() {
        let ss = this.alertPop();

        ss.getComponent("storeAlert").setTitle("防御礼包");
         ss.getComponent("storeAlert").setPriceText("¥12购买");
         ss.getComponent("storeAlert").setNodeTag(5);
    },

    refreshPrize:function() {
        //刷新 金币 必杀 护盾 飞机命数的值
        this.diamondLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('diamondCount');

    },
    


});
