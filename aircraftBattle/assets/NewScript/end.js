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

        getJinBiCountLabel :{
            default:null,
            type:cc.Node,
        },

        // killedEnemyLabel: {
        //     default:null,
        //     type:cc.Node,
        // },

        spriteCoin: null,
        labelCoin: null,
       

        settingButton:null,

        soundSetting: {
            default: null,
            type: cc.Prefab,
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        audio:{
            default: null,
            url: cc.AudioClip
        },


        revivePackageAlert: {
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         //读取数据
         var jbc = cc.sys.localStorage.getItem('jinBiCount');
         var hs = cc.sys.localStorage.getItem('bestScore');
         var cs = cc.sys.localStorage.getItem("currentScore");
         
        
       //  var kc = cc.sys.localStorage.getItem("killedEnemyCount");

       var gc = cc.sys.localStorage.getItem("getJinBiCount");

         //写入数据
        this.coinLabel.getComponent(cc.Label).string = jbc;
        this.historyLabel.getComponent(cc.Label).string = "历史最高分：" +hs;
        this.currentLabel.getComponent(cc.Label).string = "加成后本局得分：" +cs;
      //  this.killedEnemyLabel.getComponent(cc.Label).string = "击落目标：" +kc;
        
      this.getJinBiCountLabel.getComponent(cc.Label).string = "加成后获得金币: "+gc;

        //适配
         //适配
         let wx = cc.director.getVisibleSize().width * 0.5;
         let hy = cc.director.getVisibleSize().height * 0.5;
    //      this.spriteCoin = this.node.getChildByName("spriteCoin");
    //      this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width / 2 - wx, hy - (this.spriteCoin.getContentSize().height / 2));
 
    //      this.labelCoin = this.node.getChildByName("spriteCoin").getChildByName("coinLabel").getComponent(cc.Label);
       
 
    //   this.settingButton = this.node.getChildByName("soundSetting");
    //   this.settingButton.setPosition(this.settingButton.getContentSize().width / 2-wx,hy - this.spriteCoin.getContentSize().height-10 -(this.settingButton.getContentSize().height / 2));
     
   
      let gameSoundBG = cc.sys.localStorage.getItem('gameSoundBG');
      if (gameSoundBG == 1) {
          cc.audioEngine.playMusic(this.audio, true);
      } else {
          cc.audioEngine.stopMusic();
      }
   
    },

    start () {

    },

    

    share: function(){ 
       //cc.log("share");
    },
    ad: function(){ 
       // cc.log("ad");
    },
    coin: function(){ 
      //  cc.log("coin");
    },

    reStart:function() {
        cc.director.loadScene("game");
    },
    giveup: function(){ 
       // cc.log("giveup");
        cc.director.loadScene("start");
    },

    revive:function() {
        //cc.log("revive");
    },


    onSoundButtonClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.soundSetting);
        ss.setPosition(0, 0);

        ss.getComponent("sound").onWho = this.node;
        this.node.addChild(ss);

    },


    onRevivePackageClick:function() {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.revivePackageAlert);
        ss.setPosition(0, 0);

        ss.getComponent("revivePackageAlert").onWho = this.node;
        this.node.addChild(ss);
    },

    onInviteFriendClick:function(){
       // cc.log("onInviteFriendClick");


        cc.audioEngine.playEffect(this.buttonAudio, false);
       

        

        wx.shareAppMessage({ title: "我邀请了8个好友一起PK，就差你了，赶紧来！",
        imageUrl: "http://www.youngwingtec.com/VRContent/bowuguan/res/raw-assets/Texture/shareLogo.5717b.jpg",query:"end_share"});

        this.getReviveCallback();
    },

    
    planesClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.director.loadScene('warehouse');
    },


    getReviveCallback:function() {
        let rc =   cc.sys.localStorage.getItem('reviveCount');
        let irc = parseInt(rc);
       if(rc>=2) {
           return;
       } 
       rc++;
       cc.sys.localStorage.setItem("reviveCount",rc);
   },

});
