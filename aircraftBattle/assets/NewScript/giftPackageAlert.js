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

        lqBtn: {
            default: null,
            type: cc.Node
        },

        countdownLQ: {
            default: null,
            type: cc.Node
        },

        ggBtn: {
            default: null,
            type: cc.Node
        },

        countdownGG: {
            default: null,
            type: cc.Node
        },

        dxLQ: 0,
        dxGG: 0,

        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
        adInterval:0.5,
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
        //     console.log("这是广告领取界面~！");

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

        //把那边的node加载到这个界面

        this.startFadeIn();

        //1读取上次登陆距离1970的毫秒数 d1
        //2现在时间的距离1970的毫秒数   d2
        //3 两者的差值 dx = (d2-d1)/1000>(4*60*60) 玩家可以再次领取
        //4 差值弱小于，则剩余（4*60*60）-（d2-d1)/1000秒数 赋予一个变量
        //5 定时器一秒调用一次，一次让这个变量减一，然后把变量的值转化为时分秒 赋予label上

        //根据时间差来设置btn是否可点击
        let d1 = parseInt(cc.sys.localStorage.getItem('lqTime'));
        let d2 = parseInt(Date.now());
        this.dxLQ = parseInt((d2 - d1) * 0.001);
        //  cc.log("aaaa  " +this.dxLQ);
        if (this.dxLQ > (4 * 60 * 60)) {//超过4个小时
            this.lqBtn.getComponent(cc.Button).interactable = true;
            this.countdownLQ.active = false;
        } else {
            //剩余时间是4个小时 减去 这个两个的时间差
            this.dxLQ = 4 * 60 * 60 - this.dxLQ;
            this.lqBtn.getComponent(cc.Button).interactable = false;
            this.countdownLQ.active = true;
            this.setTimeToLabel(this.dxLQ, this.countdownLQ);
            //   this.schedule(this.countdownFUN,this,1,this.dxLQ);

            this.schedule(this.countdownFUN, 1);
        }

        let d3 = parseInt(cc.sys.localStorage.getItem('ggTime'));
        let d4 = parseInt(Date.now());

        this.dxGG = parseInt((d4 - d3) * 0.001);
        // cc.log("aaaa  " +this.dxLQ);
        if (this.dxGG > (this.adInterval * 60 * 60)) {//超过1个小时 //改为半小时了
            this.ggBtn.getComponent(cc.Button).interactable = true;
            this.countdownGG.active = false;
        } else {
            this.dxGG = this.adInterval * 60 * 60 - this.dxGG;
            this.ggBtn.getComponent(cc.Button).interactable = false;
            this.countdownGG.active = true;
            this.setTimeToLabel(this.dxGG, this.countdownGG);
            //   this.schedule(this.countdownFUN,this,1,this.dxLQ);

            this.schedule(this.countdownFUNGG, 1);
        }
    },

    countdownFUN: function () {

        this.dxLQ = this.dxLQ - 1;

        this.setTimeToLabel(this.dxLQ, this.countdownLQ);
        if (this.dxLQ <= 0) {
            this.lqBtn.getComponent(cc.Button).interactable = true;
            this.countdownLQ.active = false;
            this.unschedule(this.countdownFUN);
        }
    },

    countdownFUNGG: function () {

        this.dxGG = this.dxGG - 1;

        this.setTimeToLabel(this.dxGG, this.countdownGG);
        if (this.dxGG <= 0) {
            this.ggBtn.getComponent(cc.Button).interactable = true;
            this.countdownGG.active = false;
            this.unschedule(this.countdownFUNGG);
        }
    },

    setTimeToLabel: function (dx, labelNode) {
        let label = labelNode.getComponent(cc.Label);
        //dx-->3:50:49 
        //小时
        let h = parseInt(dx / 3600);
        let m = parseInt((dx - (3600 * h)) / 60);
        let s = parseInt(dx - h * 3600 - m * 60);
        //转为两位数
        //小时必然是，m<10,
        let sh = "0" + h;
        let sm = m;
        if (m < 10) {
            sm = "0" + m;
        }
        let ss = s;
        if (s < 10) {
            ss = "0" + s;
        }

        label.string = sh + ":" + sm + ":" + ss;
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





    onLingQuClick: function () {
        //  cc.log("onLingQuClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        //添加 金币 护盾 必杀 生命
        //1 读取 2 添加 3 写入
        let jbC = cc.sys.localStorage.getItem('jinBiCount');
        let dzC = cc.sys.localStorage.getItem('dazhaoCount');
        let hdC = cc.sys.localStorage.getItem('hudunCount');
        let plC = cc.sys.localStorage.getItem('planeLifeCount');

        let ajbC = parseInt(jbC) + 500;
        //   let adzC = parseInt(dzC) + 1;
        let ahdC = parseInt(hdC) + 1;
        //  let aplC = parseInt(plC) + 1;


        cc.sys.localStorage.setItem('jinBiCount', ajbC);
        //   cc.sys.localStorage.setItem('dazhaoCount', adzC);
        cc.sys.localStorage.setItem('hudunCount', ahdC);
        //    cc.sys.localStorage.setItem('planeLifeCount', aplC);
        //   cc.log("!!!!---  " + cc.sys.localStorage.getItem('planeLifeCount'));

        //使用时间记录下
        cc.sys.localStorage.setItem('lqTime', Date.now());
        // cc.sys.localStorage.setItem('ggTime', Date.now());



        let cbFadeOut = cc.callFunc(this.onLingQuSuccess, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },

    onLingQuSuccess: function () {
        //通知调取的页面 数据更新
        if (this.onWho.getComponent("begin") != null && this.onWho.getComponent("begin") != undefined) {
            this.onWho.getComponent("begin").refreshPrize("begin_gift");
        }

        this.onFadeOutFinish();
    },

    onGuangGaoClick: function () {
        //     cc.log("onGuangGaoClick");
        let self = this;
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.videoAd.show();
    },

    givePrize: function () {
        console.log("给用户奖励！~~");

        cc.eventManager.pauseTarget(this.node, true);
        // 添加 金币 护盾 必杀 生命
        // 1 读取 2 添加 3 写入
        let jbC = cc.sys.localStorage.getItem('jinBiCount');
        let dzC = cc.sys.localStorage.getItem('dazhaoCount');
        let hdC = cc.sys.localStorage.getItem('hudunCount');
        let plC = cc.sys.localStorage.getItem('planeLifeCount');

        let ajbC = parseInt(jbC) + 500;
        let ahdC = parseInt(hdC) + 1;

        cc.sys.localStorage.setItem('jinBiCount', ajbC);
        cc.sys.localStorage.setItem('hudunCount', ahdC);
        cc.sys.localStorage.setItem('ggTime', Date.now());

        let cbFadeOut = cc.callFunc(this.onGGSuccess, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },


    onGGSuccess: function () {
        //通知调取的页面 数据更新
        if (this.onWho.getComponent("begin") != null && this.onWho.getComponent("begin") != undefined) {
            this.onWho.getComponent("begin").refreshPrize("begin_gift");
        }

        this.onFadeOutFinish();
    },

    onFadeOutFinish: function () {
        cc.eventManager.resumeTarget(this.onWho, true);
        this.node.destroy();
    },


    onCancelClick: function () {
        //  cc.log("onCancelClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);

        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);
    },



});


















// //观看广告按钮点击
// onGuangGaoClick: function () {
//     let self = this;

//     let videoAd = wx.createRewardedVideoAd({
//         adUnitId: 'adunit-123456'
//     });

//     videoAd.load()
//         .then(() => videoAd.show())
//         .catch(err => console.log(err.errMsg));


//     videoAd.onClose(res => {
//         console.log("用户关闭广告~！");
//         if (res && res.isEnded || res === undefined) {
//             // 正常播放结束，可以下发游戏奖励
//             console.log("这里给用户奖励！！");
//             console.log(res);
//             self.givePrize();
//         }
//         else {
//             // 播放中途退出，不下发游戏奖励
//             console.log("中途退出，没有奖励！");
//         }
//     });

// },

// givePrize: function () {
//     console.log("给用户奖励！~~");
// },
