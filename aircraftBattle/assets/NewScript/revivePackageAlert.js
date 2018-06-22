// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

//开始界面中点击 互助礼 弹出的界面 的 控制脚本
cc.Class({
    extends: cc.Component,

    properties: {


        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },


       

        reviveCountLabel: {
            default: null,
            type: cc.Node
        },



        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        this.startFadeIn();

        let reviveCount = cc.sys.localStorage.getItem('reviveCount');
       

        this.reviveCountLabel.getComponent(cc.Label).string = "X" + reviveCount;


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




    onInviteClick:function() {
        cc.log("onInviteClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        cc.eventManager.resumeTarget(this.onWho, true);
        this.node.destroy();

        
      
        wx.shareAppMessage({ title: "我邀请了8个好友一起PK，就差你了，赶紧来！",
        imageUrl: "http://www.youngwingtec.com/VRContent/bowuguan/res/raw-assets/Texture/shareLogo.5717b.jpg",query:"begin_share"});

        this.getReviveCallback();
    },

    getReviveCallback:function() {
         let rc =   cc.sys.localStorage.getItem('reviveCount');
         let irc = parseInt(rc);
        if(rc>=2) {
            return;
        } 
        rc++;
        cc.sys.localStorage.setItem("reviveCount",rc);

        //先要获得 begin JS 然后刷新
        if(this.onWho != null && this.onWho.getComponent("begin")!=null) {
            this.onWho.getComponent("begin").refreshReviveCount();
        }
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



