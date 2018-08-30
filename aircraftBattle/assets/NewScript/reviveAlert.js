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

        reviveBtn: {
            default: null,
            type: cc.Node
        },

        lifeBtn: {
            default: null,
            type: cc.Node
        },
        lifeCountLabel: {
            default: null,
            type: cc.Node
        },

        reviveCountLabel: {
            default: null,
            type: cc.Node
        },

        ggBtn: {
            default: null,
            type: cc.Node
        },

        scoreLabel: {
            default: null,
            type: cc.Node
        },

        skip:{
            default:null,
            type: cc.Node,
        },



        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击

        display: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // let self =this;
        // //先创建，可不用，由于是单例模式，所以后面再创建就快了。
        // this.videoAd = wx.createRewardedVideoAd({
        //     adUnitId: 'adunit-aa5bb944ef989f55'
        // });
        
        // this.videoAd.onClose(res => {
        //     // 用户点击了【关闭广告】按钮
        //     // 小于 2.1.0 的基础库版本，res 是一个 undefined
        //     console.log("这是复活界面~！");

        //     if (res && res.isEnded || res === undefined) {
        //         // 正常播放结束，可以下发游戏奖励
        //         console.log("这里给用户奖励！！");
        //         console.log(res);
        //         self.givePrize();
        //     }
        //     else {
        //         // 播放中途退出，不下发游戏奖励
        //         console.log("中途退出，没有奖励！");
        //     }
        // });

        // console.log(this.videoAd);

        this.skip.active = false;
        this.scheduleOnce(this.showSkip,3.0);
        this.startFadeIn();

        //1 读取分数到分数label 2 读取复活卡个数 到复活卡个数label  根据复活个数 来设置复活按钮的开启与否 
        //另外一个免费按钮将来再说，需要对接之后
        //将来还需获得 下个超越的好友的 头像， 相差的分数 。  目前之做1

        //cc.sys.localStorage.setItem("GuangGaoFuhuoFlag",1);
        let reviveCount = cc.sys.localStorage.getItem('reviveCount');
       

        this.scoreLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem("currentScore");
        this.reviveCountLabel.getComponent(cc.Label).string = "X" + reviveCount;

        if (reviveCount > 0) {
            this.reviveBtn.getComponent(cc.Button).interactable = true;
        } else {
            this.reviveBtn.getComponent(cc.Button).interactable = false;
        }

        let  GuangGaoFuhuoFlag = parseInt( cc.sys.localStorage.getItem("GuangGaoFuhuoFlag"));
        if(GuangGaoFuhuoFlag == 1) {
            this.ggBtn.getComponent(cc.Button).interactable = true;
        }else {
            this.ggBtn.getComponent(cc.Button).interactable = false;
        }


        let lifeCount = parseInt(cc.sys.localStorage.getItem('planeLifeCount'));
        this.lifeCountLabel.getComponent(cc.Label).string = "X" + lifeCount;

        if (lifeCount > 0) {
          this.lifeBtn.getComponent(cc.Button).interactable = true;
        }  else {
            this.lifeBtn.getComponent(cc.Button).interactable = false;
        }

        if(cc.isOpen_wx) {
            wx.postMessage({
                message: "nextInfo",
            });
        }
     

        this.display.scale = 1.0;




    },


    showSkip:function() {
        this.skip.active = true;''
    },

    start() {
        if(cc.isOpen_wx) {
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 720;
            window.sharedCanvas.height = 1280;
        }
      
    },

    _updaetSubDomainCanvas() {

        if(!cc.isOpen_wx) {
            return;
        }

        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },

    update() {
        this._updaetSubDomainCanvas();
    },

    startFadeIn: function () {
        cc.eventManager.pauseTarget(this.node, true);
       
        this.node.setScale(2);
        this.node.opacity = 0;

        let cbFadeIn = cc.callFunc(this.onFadeInFinish, this);
        let actionFadeIn = cc.sequence(cc.spawn(cc.fadeTo(0.3, 255), cc.scaleTo(0.3, 1.3)), cbFadeIn);
        this.node.runAction(actionFadeIn);
    },
    onFadeInFinish: function () {
     //   cc.log(this.node);
        cc.eventManager.resumeTarget(this.node, true);
    },





    onReviveClick: function () {
     //   cc.log("onReviveClick");
       
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        let rc = parseInt(cc.sys.localStorage.getItem('reviveCount')) - 1;
        cc.sys.localStorage.setItem('reviveCount', rc);

        this.onWho.getComponent("Game").goNewPlane();


        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },

    onGuangGaoClick: function () {
      //  cc.log("onGuangGaoClick");
      let self = this;
      cc.audioEngine.playEffect(this.buttonAudio, false);
      cc.videoAd.show();


     




        // cc.sys.localStorage.setItem("GuangGaoFuhuoFlag",0);
        // cc.audioEngine.playEffect(this.buttonAudio, false);
        // cc.eventManager.pauseTarget(this.node, true);


        // this.onWho.getComponent("Game").goNewPlane();


        // let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        // let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        // this.node.runAction(actionFadeOut);
    },

    givePrize: function () {
        console.log("给用户奖励！~~");

        cc.eventManager.pauseTarget(this.node, true);
        // 添加 金币 护盾 必杀 生命
        // 1 读取 2 添加 3 写入
        cc.sys.localStorage.setItem("GuangGaoFuhuoFlag",0);
       


        this.onWho.getComponent("Game").goNewPlane();


        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },

    onLifeClick:function() {
    //    cc.log("onlifeclick");
       
       


        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        let rc = parseInt(cc.sys.localStorage.getItem('planeLifeCount')) - 1;
        cc.sys.localStorage.setItem('planeLifeCount', rc);

        this.onWho.getComponent("Game").goNewPlane();


        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);

    },

    onFadeOutFinish: function () {
        cc.eventManager.resumeTarget(this.onWho, true);
        this.node.destroy();
    },


    onCancelClick: function () {
      //  cc.log("onCancelClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        cc.director.loadScene('end');
    },



});



