

//var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var generateType = require("enemyPlaneDatas").generateType;
var bulletType = require("enemyPlaneDatas").bulletType;
var globalEnemyPlaneData = require("enemyPlaneDatas").enemyPlaneData;

var bulletTrack = require("enemyPlaneDatas").bulletTrack;
var enemyTrack = require("enemyPlaneDatas").enemyTrack;
cc.Class({
    extends: cc.Component,

    properties: {


        //子弹预制体
        bullet0: cc.Prefab,
        //  bullet1: cc.Prefab,
        prizeTeXiao: {
            default: null,
            type: cc.Prefab,
        },

        //bulletIsOpen: false,
        // bulletIntelval: 0.75,
        //在_enemyPlaneData表中的索引
        enemyID: -1,//标识！是在enemyPlaneDatas中的索引，保证能取到正确的数据
        blood: -1111,
        shootingSpeed: 1,//一秒钟发射子弹数
        flyingSpeed: 0,

        bulletType: 0,//0普通 1 光束  已经失效的数据
        damage: 1,
        dropProbability: 65,
        fallingObject: generateType.jinbi,
        //Radius: 50,

        //bloodBar:cc.Node,//从game里传过来的显示血条
        bloodBar: {//并不是单纯的label 
            default: null,
            type: cc.Prefab,
        },
        nodeBar: null,//label的node
        bBar: null,//label
        baoZhaTeXiao: null,
        damagedTeXiao: null,

        bulletTrack: 0,

        enemyTrack: 0,

        particleSys: {
            default: null,
            type: cc.Prefab,
        },
        partice: null,


        boomAudio: {
            default: null,
            url: cc.AudioClip
        },

        shoujiAni: null,

        shoujiAniPre: {
            default: null,
            type: cc.Prefab,
        },

        node0: {
            default: null,
            type: cc.Node,
        },
        node1: {
            default: null,
            type: cc.Node,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.shoujiAniPool = new cc.NodePool();
        for (let i = 0; i < 8; i++) {
            let sjA = cc.instantiate(this.shoujiAniPre);
            this.shoujiAniPool.put(sjA);
        }

    },



    zuoyoushangxia: function () {
        let jumpDuration = 3;
        let jumpHeight = Math.random() * 200;
        let moveDis = Math.random() * 200;
        // let jumpUp = cc.moveBy(jumpDuration, cc.p(0, jumpHeight)).easing(cc.easeCubicActionOut());
        // let jumpDown = cc.moveBy(jumpDuration, cc.p(0, -jumpHeight)).easing(cc.easeCubicActionIn());
        let jumpUp = cc.moveBy(jumpDuration, cc.p(0, jumpHeight));
        let jumpDown = cc.moveBy(jumpDuration, cc.p(0, -jumpHeight));
        let seq1 = cc.sequence(jumpUp, jumpDown);

        let moveRight = cc.moveBy(jumpDuration, cc.p(moveDis, 0));
        let moveLeft = cc.moveBy(jumpDuration, cc.p(-moveDis, 0));
        let seq2 = cc.sequence(moveRight, moveLeft);

        let sp1 = cc.spawn(seq1, seq2);

        this.node.runAction(cc.repeatForever(sp1));

    },

    enterScene: function () {
        var callback = cc.callFunc(this.enterCallback, this);
        var seq = cc.sequence(cc.moveTo(1, cc.v2(this.endX, this.endY)), callback);
        this.node.runAction(seq);
    },


    enterCallback: function () {

        this.zuoyoushangxia();
         this.schedule(this.newBanquan, 1 / this.shootingSpeed);

    },

    newBanquan:function() {
        for (let i = 0; i < 2; i++) {
            this.node.runAction(cc.sequence(cc.delayTime(0.2 * (i)), cc.callFunc(this.banquan0, this)));

            this.node.runAction(cc.sequence(cc.delayTime(0.2 * (i)), cc.callFunc(this.banquan1, this)));

           
        }
    },


    banquan0: function () {
        for (let jiaodu = -45; jiaodu > -136; jiaodu -= 30) {
            this.xiexianByjiaodu(jiaodu,this.node0);
        }
    },

    banquan1: function () {
        for (let jiaodu = -45; jiaodu > -136; jiaodu -= 30) {
            this.xiexianByjiaodu(jiaodu,this.node1);
        }
    },

    xiexianByjiaodu: function (jiaodu,node) {
        if (-90 < jiaodu && jiaodu < 90) {
            this.xiexianRight(jiaodu,node);
        } else if (jiaodu > 90 || jiaodu < -90) {
            this.xiexianLeft(jiaodu,node);
        } else if (jiaodu == -90) {
            this.zhixianxiangxia(node);
        } else if (jiaodu == 90) {
            this.zhixianxiangshang(node);
        }
    },
    //往右边倾斜
    xiexianRight: function (jiaodu,node) {

        let bl = this.generateBullet();


        bl.getComponent("enemyBullet").targetPositionX = bl.position.x + 100;
        bl.getComponent("enemyBullet").targetPositionY = bl.position.y + (100 * Math.tan(jiaodu * 0.017453293));//2pi/360 = 0.017453293


        this.node.parent.addChild(bl);

        let pos =  this.node.convertToWorldSpaceAR(node.getPosition());
        let p = cc.v2(pos.x - cc.director.getVisibleSize().width * 0.5, pos.y - cc.director.getVisibleSize().height * 0.5);
         bl.setPosition(p);
    },

    xiexianLeft: function (jiaodu,node) {

        let bl = this.generateBullet();


        bl.getComponent("enemyBullet").targetPositionX = bl.position.x - 100;
        bl.getComponent("enemyBullet").targetPositionY = bl.position.y - (100 * Math.tan(jiaodu * 0.017453293));

        this.node.parent.addChild(bl);

        let pos =  this.node.convertToWorldSpaceAR(node.getPosition());
        let p = cc.v2(pos.x - cc.director.getVisibleSize().width * 0.5, pos.y - cc.director.getVisibleSize().height * 0.5);
         bl.setPosition(p);
    },



   

    generateBullet: function () {
        let bl = null;
        bl = cc.instantiate(this.bullet0);

        bl.getComponent("enemyBullet").flyingSpeed = globalEnemyPlaneData[this.enemyID].flyingSpeed;
        bl.getComponent("enemyBullet").damage = this.damage;

        bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2);
        return bl;
    },

    zhixianxiangxia: function (node) {
        let bl = this.generateBullet();
        bl.getComponent("enemyBullet").targetPositionX = this.node.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = -this.node.parent.getContentSize().height / 2 - 50;
        this.node.parent.addChild(bl);

        let pos =  this.node.convertToWorldSpaceAR(node.getPosition());
        let p = cc.v2(pos.x - cc.director.getVisibleSize().width * 0.5, pos.y - cc.director.getVisibleSize().height * 0.5);
         bl.setPosition(p);
    },


    zhixianxiangshang: function (node) {
        let bl = this.generateBullet();
        bl.getComponent("enemyBullet").targetPositionX = this.node.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = this.node.parent.getContentSize().height / 2 + 50;

        this.node.parent.addChild(bl);

        let pos =  this.node.convertToWorldSpaceAR(node.getPosition());
        let p = cc.v2(pos.x - cc.director.getVisibleSize().width * 0.5, pos.y - cc.director.getVisibleSize().height * 0.5);
         bl.setPosition(p);
    },

    enemyBoomAni: function () {
        //在这里加分，因为在Player碰撞检测中调用了这个函数，所以在这里加分 防止bug
        // this.node.parent.getComponent('Game').addScore(this.blood);
        //需求改为 一架飞机一分
        this.node.parent.getComponent('Game').addScore(1);
        //这里有一个问题 敌机在爆炸后消失 所以在爆炸的动画过程中 如果被击中，还是会触发 要关闭该敌机的碰撞
        this.node.group = "NOOOOOOO";

        var anim = this.node.getComponent(cc.Animation);
        // anim.play("baozhaAni");
        anim.play();
        this.node.parent.getComponent('Game').generatePrize(this.enemyID, this.node.getPosition());

        //  anim.scale = 10;
        //   this.nodeBar.destroy();
        this.unscheduleAllCallbacks();
        cc.audioEngine.playEffect(this.boomAudio, false);

    },

  
    baozhaOver: function () {

        //这个有问题 要放动画回调 TODO!


        this.node.parent.getComponent('Game').checkNextStage();
        this.node.destroy();
    },



    enemyDamagedAni: function () {
        this.shoujiAni = null;
        if (this.shoujiAniPool.size() > 0) {
            this.shoujiAni = this.shoujiAniPool.get();
        } else {
            this.shoujiAni = cc.instantiate(this.shoujiAniPre);
        }

        this.node.addChild(this.shoujiAni);
        var anim = this.shoujiAni.getComponent(cc.Animation);

        anim.play();

    },

    damagedOver: function (event) {

        //这个有问题 要放动画回调 TODO!


        // this.damagedTeXiao.destroy();
       
        this.shoujiAni.removeFromParent();
        this.shoujiAniPool.put(this.shoujiAni);

    },

    resumeAction: function () {
        console.log("enemy resume!");
        this.isPause = true;

        this.node.resumeAllActions();

        cc.director.getScheduler().resumeTarget(this);
    },

    pauseAction: function () {
        console.log("enemy pause!");
        this.isPause = false;

        this.node.pauseAllActions();

        cc.director.getScheduler().pauseTarget(this);
    },

    update(dt) {
        if(this.isPause) {
            return;
        }

    },

    onCollisionEnter: function (other, self) {

        if (other.node.group === "hBullet") {

            var bDamage = other.node.getComponent("heroBullet").damage;

            if ((this.blood - bDamage) <= 0) {//销毁 掉落物品逻辑

                //根据enemyID来生成掉落物品 //传入game 让game来生成预制体


                this.enemyBoomAni();



                // this.node.destroy();
            } else {

                this.blood -= bDamage;
                //  this.bBar.string = this.blood;
                this.enemyDamagedAni();
                //根据掉血量来加分吧
                //this.node.parent.getComponent('Game').addScore(bDamage);
                //this.node.parent.getChildByName("score").getComponent(cc.Label).string = parseInt(this.node.parent.getChildByName("score").getComponent(cc.Label).string)  + bDamage;

            }
        }

    },
});
