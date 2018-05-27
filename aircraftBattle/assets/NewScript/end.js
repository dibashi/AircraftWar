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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        coinLabel :{
            default:null,
            type:cc.Node,
        },

        historyLabel :{
            default:null,
            type:cc.Node,
        },

        currentLabel :{
            default:null,
            type:cc.Node,
        },

        killedEnemyLabel: {
            default:null,
            type:cc.Node,
        },

        spriteCoin: null,
        labelCoin: null,
       

        settingButton:null,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //读取数据
         var jbc = cc.sys.localStorage.getItem('jinBiCount');
         var hs = cc.sys.localStorage.getItem('bestScore');
         var cs = cc.sys.localStorage.getItem("currentScore");
        
         var kc = cc.sys.localStorage.getItem("killedEnemyCount");
         //写入数据
        this.coinLabel.getComponent(cc.Label).string = jbc;
        this.historyLabel.getComponent(cc.Label).string = "历史最高分：" +hs;
        this.currentLabel.getComponent(cc.Label).string = "本局得分：" +cs;
        this.killedEnemyLabel.getComponent(cc.Label).string = "击落目标：" +kc;

        //适配
         //适配
         let wx = cc.director.getVisibleSize().width * 0.5;
         let hy = cc.director.getVisibleSize().height * 0.5;
         this.spriteCoin = this.node.getChildByName("spriteCoin");
         this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width / 2 - wx, hy - (this.spriteCoin.getContentSize().height / 2));
 
         this.labelCoin = this.node.getChildByName("spriteCoin").getChildByName("coinLabel").getComponent(cc.Label);
       
 
      this.settingButton = this.node.getChildByName("soundSetting");
      this.settingButton.setPosition(this.settingButton.getContentSize().width / 2-wx,hy - this.spriteCoin.getContentSize().height-10 -(this.settingButton.getContentSize().height / 2));
     
    },

    start () {

    },

    

    share: function(){ 
       cc.log("share");
    },
    ad: function(){ 
        cc.log("ad");
    },
    coin: function(){ 
        cc.log("coin");
    },

    reStart:function() {
        cc.director.loadScene("game");
    },
    giveup: function(){ 
        cc.log("giveup");
        cc.director.loadScene("start");
    },

    revive:function() {
        cc.log("revive");
    },


    
    // update (dt) {},
});
