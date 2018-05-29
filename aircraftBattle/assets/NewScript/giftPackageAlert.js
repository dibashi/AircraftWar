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

        dxLQ:0,
        dxGG:0,

        onWho: null,//在哪个页面上面，当当前页面消失时使得那个页面可点击
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //把那边的node加载到这个界面

        this.startFadeIn();

        //1读取上次登陆距离1970的毫秒数 d1
        //2现在时间的距离1970的毫秒数   d2
        //3 两者的差值 dx = (d2-d1)/1000>(4*60*60) 玩家可以再次领取
        //4 差值弱小于，则剩余（4*60*60）-（d2-d1)/1000秒数 赋予一个变量
        //5 定时器一秒调用一次，一次让这个变量减一，然后把变量的值转化为时分秒 赋予label上

        //根据时间差来设置btn是否可点击
        let d1 = parseInt(cc.sys.localStorage.getItem('dazhaoCount'));
        let d2 = parseInt(Date.now());
        this.dxLQ =parseInt((d2-d1)*0.001);
        if( this.dxLQ > (4*60*60)) {//超过4个小时
            this.lqBtn.getComponent(cc.Button).enabled = true;
            this.countdownLQ.active = false;
        } else {
            this.lqBtn.getComponent(cc.Button).enabled = false;
            this.countdownLQ.active = true;
            this.setTimeToLabel(this.dxLQ,this.countdownLQ);
            this.schedule(this.countdownFUN,this,1,this.dxLQ);
        }


    },

    countdownFUN:function() {
        this.dxLQ = this.dxLQ - 1;
        this.setTimeToLabel(this.dxLQ,this.countdownLQ);
        if(this.dxLQ<=0) {
            this.lqBtn.getComponent(cc.Button).enabled = true;
            this.countdownLQ.active = false;
        }
    },

    setTimeToLabel:function(dx,labelNode) {
        let label = labelNode.getComponent(cc.Label);
        //dx-->3:50:49 
        //小时
        let h = parseInt(dx/3600);
        let m = parseInt((dx - (3600*h))/60);
        let s = parseInt(dx - h*3600 - m*60);
        //转为两位数
        //小时必然是，m<10,
        let sh = "0" + h;
        let sm = m;
        if(m<10) {
            sm = "0" + m;
        }
        let ss = s;
        if(s<10) {
            ss = "0" + s;
        }

        label.string = sh+ ":" +sm +":" +ss;
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





    onCertainClick: function () {
        cc.log("onCancelClick");
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.eventManager.pauseTarget(this.node, true);
        let cbFadeOut = cc.callFunc(this.onFadeOutFinish, this);
        let actionFadeOut = cc.sequence(cc.spawn(cc.fadeTo(0.3, 0), cc.scaleTo(0.3, 2.0)), cbFadeOut);
        this.node.runAction(actionFadeOut);

        //添加 金币 护盾 必杀 生命
        //1 读取 2 添加 3 写入

       

        let jbC = cc.sys.localStorage.getItem('jinBiCount');
        let dzC = cc.sys.localStorage.getItem('dazhaoCount');
        let hdC = cc.sys.localStorage.getItem('hudunCount');
        let plC = cc.sys.localStorage.getItem('planeLifeCount');
        cc.log("!!plc " + plC);

        let ajbC = parseInt(jbC) + 100;
        let adzC = parseInt(dzC) + 1;
        let ahdC = parseInt(hdC) + 1;
        let aplC = parseInt(plC) + 1;
        cc.log("!!aplc " + aplC);

        cc.sys.localStorage.setItem('jinBiCount', ajbC);
        cc.sys.localStorage.setItem('dazhaoCount', adzC);
        cc.sys.localStorage.setItem('hudunCount', ahdC);
        cc.sys.localStorage.setItem('planeLifeCount', aplC);
        cc.log("!!!!---  " + cc.sys.localStorage.getItem('planeLifeCount'));
        //通知调取的页面 数据更新
        this.onWho.getComponent("begin").refreshPrize();

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



