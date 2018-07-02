

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

        beginX:0,
        beginY:0,
        endX:0,//在场景中的位置
        endY:0,//在场景中的位置

        originBlood:0,//记录下原始的血量 用于当血量小于50%时 召唤小飞机

        tintFlag:false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.shoujiAniPool = new cc.NodePool();
        for (let i = 0; i < 8; i++) {
            let sjA = cc.instantiate(this.shoujiAniPre);
            this.shoujiAniPool.put(sjA);
        }

    },

    enterScene:function() {
        //var callback = cc.callFunc(this.enterCallback,this);
        //var seq = cc.sequence(cc.moveTo(1, cc.v2(this.endX,this.endY)), callback);
        //this.node.runAction(seq);

        this.enterCallback();
    },



    zuoyoushangxia: function () {
        let jumpDuration = 3;
        let jumpHeight = Math.random() * 200;
        let moveDis = Math.random() * 230;
        let jumpUp = cc.moveBy(jumpDuration, cc.p(0, jumpHeight));
        let jumpDown = cc.moveBy(jumpDuration, cc.p(0, -jumpHeight));
        let seq1 = cc.sequence(jumpUp, jumpDown);

        let moveRight = cc.moveBy(jumpDuration, cc.p(moveDis, 0));
        let moveLeft = cc.moveBy(jumpDuration, cc.p(-moveDis, 0));
        let seq2 = cc.sequence(moveRight, moveLeft);

        let sp1 = cc.spawn(seq1, seq2);

        this.node.runAction(cc.repeatForever(sp1));



    },

    bazixing:function() {
        let mt1 = cc.moveTo(3,cc.v2(this.endX,this.endY));
        let mt2 = cc.moveTo(1,cc.v2(this.endX,this.beginY));
        let mt3 = cc.moveTo(3,cc.v2(this.beginX,this.endY));
        let mt4 = cc.moveTo(1,cc.v2(this.beginX,this.beginY));
        let seq = cc.sequence(mt1,mt2,mt3,mt4);
        let fe = cc.repeatForever(seq);
        this.node.runAction(fe);
    },

    enterCallback: function () {

       
       this.bazixing();
        


        let cal1 = cc.callFunc(this.sanfazhixian,this);
        let cal2= cc.callFunc(this.wunai,this);
        let seq = cc.sequence(cal1,cal2);
        this.node.runAction(seq)
       
    },

    wunai:function() {
        this.schedule(this.sanfazhixian, 1 / this.shootingSpeed);
    },

    sanfazhixian: function () {
        for (let i = 0; i < 3; i++) {
            this.node.runAction(cc.sequence(cc.delayTime(0.3 * (i)), cc.callFunc(this.zhixianxiangxia, this)));
        }
    },  

    generateBullet: function () {
        let bl = null;

        bl = cc.instantiate(this.bullet0);


        bl.getComponent("enemyBullet").flyingSpeed = globalEnemyPlaneData[this.enemyID].flyingSpeed;
        bl.getComponent("enemyBullet").damage = this.damage;

        bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2);
        return bl;
    },


    zhixianxiangxia: function () {
        let bl = this.generateBullet();
        bl.getComponent("enemyBullet").targetPositionX = this.node.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = -this.node.parent.getContentSize().height / 2 - 50;
        this.node.parent.addChild(bl);
    },


    enemyBoomAni: function () {
      
        this.node.parent.getComponent('Game').addScore(2);
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
        this.node.parent.getComponent('Game').checkNextStage();
        this.node.destroy();
    },


    enemyDamagedAni: function () {
        

        this.tintFlag = true;

        let tintOver = cc.callFunc(this.tintOver, this);
        let actionFadeInOut = cc.sequence(cc.tintTo(0.1,255,87,102), cc.tintTo(0.1, 255,255,255), tintOver);
        this.node.runAction(actionFadeInOut);

    },

    tintOver:function() {
        this.tintFlag = false;
    },

    resumeAction: function () {
        console.log("enemy resume!");
        this.isPause = true;

        this.node.resumeAllActions();

        cc.director.getScheduler().resumeTarget(this);
    },

    pauseAction: function () {
        console.log("enemy pause!");
        this.isPause =false;

        this.node.pauseAllActions();

        cc.director.getScheduler().pauseTarget(this);
    },

    update(dt) {
        if (this.isPause) {
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
                
                if(!this.tintFlag) {
                    this.enemyDamagedAni();
                }
            }
        }

    },
});