

//var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var generateType = require("enemyPlaneDatas").generateType;
var bulletType = require("enemyPlaneDatas").bulletType;
var globalEnemyPlaneData = require("enemyPlaneDatas").enemyPlaneData;
cc.Class({
    extends: cc.Component,

    properties: {


        //子弹预制体
        bullet0: cc.Prefab,
        bullet1: cc.Prefab,
        prizeTeXiao:{
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

        bulletType: 0,//0普通 1 光束
        damage: 1,
        dropProbability: 65,
        fallingObject: generateType.jinbi,
        //Radius: 50,

        //bloodBar:cc.Node,//从game里传过来的显示血条
        bloodBar: {//并不是单纯的label 
            default: null,
            type: cc.Prefab,
        },
        bBar: null,//label
        _baoZhaTeXiao:null,
        

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        //this.bloodBar.string = this.blood;
        var nodeBar = cc.instantiate(this.bloodBar);
        this.bBar = nodeBar.getComponent(cc.Label);
        cc.log(this.bBar);
        this.bBar.string = this.blood;
        //bBar.string = "lh";
        // cc.log("bBar =   "+bBar.string);
        //cc.log("bbblood   " + this.blood);
        this.node.addChild(nodeBar);
        nodeBar.setPosition(0, 0);
        nodeBar.rotation = 180;
        //cc.log(bBar.getPosition());
    },



    startFire: function () {

        this.schedule(this.bICallback, 1 / this.shootingSpeed);


    },

    enterCallback: function () {

        //cc.log("enemy enterCallback  enemyID"+ this.enemyID);

        this.schedule(this.bICallback, 1 / this.shootingSpeed);
        let jumpDuration = 3;
        let jumpHeight = Math.random()*100;
        let moveDis = Math.random()*100;
       // let jumpUp = cc.moveBy(jumpDuration, cc.p(0, jumpHeight)).easing(cc.easeCubicActionOut());
       // let jumpDown = cc.moveBy(jumpDuration, cc.p(0, -jumpHeight)).easing(cc.easeCubicActionIn());
        let jumpUp = cc.moveBy(jumpDuration, cc.p(0, jumpHeight));
        let jumpDown = cc.moveBy(jumpDuration, cc.p(0, -jumpHeight));
        let seq1 = cc.sequence(jumpUp, jumpDown);

        let moveRight = cc.moveBy(jumpDuration, cc.p(moveDis, 0));
        let moveLeft = cc.moveBy(jumpDuration, cc.p(-moveDis, 0));
        let seq2 = cc.sequence(moveRight, moveLeft);

        let sp1 = cc.spawn(seq1,seq2);

        this.node.runAction(cc.repeatForever(sp1));
    },

    bICallback: function () {

        //TODO：！！这里应该以后应该加入子弹池来优化

        //根据子弹类型来生成子弹，类型决定加载什么预制体。
        var bl = null;
        if (this.bulletType === bulletType.jipao) {
            bl = cc.instantiate(this.bullet0); //预制体未做 未加入
        } else if (this.bulletType === bulletType.huopao) {
            bl = cc.instantiate(this.bullet1);//预制体未做 未加入
        }
        // bl.getComponent('heroBullet').enemys = this.node.parent.enemys;//脚本未做 未加入
        this.node.parent.addChild(bl);

        bl.getComponent("enemyBullet").flyingSpeed = globalEnemyPlaneData[this.enemyID].flyingSpeed;
        bl.getComponent("enemyBullet").damage = this.damage;
        bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法
    },

    enemyBoomAni:function() {
        
        // this.baoZhaTeXiao = cc.instantiate(this.prizeTeXiao);//!!!
        //     let armatureDisplay =  this.baoZhaTeXiao.getComponent(dragonBones.ArmatureDisplay);
        //     let wudiTX = armatureDisplay.buildArmature("TXbaozha");
        //     armatureDisplay.playAnimation("baozha");
        //    // armatureDisplay.
        //     this.node.parent.addChild(this.baoZhaTeXiao);
        //     baoZhaTeXiao.setPosition(this.node.getPosition());
    },


    onCollisionEnter: function (other, self) {

        if (other.node.group === "hBullet") {
           
            var bDamage = other.node.getComponent("heroBullet").damage;
            // cc.log("Damage!!  "+ bDamage);
            if ((this.blood - bDamage) <= 0) {//销毁 掉落物品逻辑

                //根据enemyID来生成掉落物品 //传入game 让game来生成预制体
                this.node.parent.getComponent('Game').generatePrize(this.enemyID,this.node.getPosition());
                this.node.parent.getComponent('Game').checkNextStage();

                this.node.parent.getChildByName("score").getComponent(cc.Label).string = parseInt(this.node.parent.getChildByName("score").getComponent(cc.Label).string)  + this.blood;
               
                //this.enemyBoomAni();
                this.node.destroy();
            } else {
                this.blood -= bDamage;
                this.bBar.string = this.blood;
                //根据掉血量来加分吧
                this.node.parent.getChildByName("score").getComponent(cc.Label).string = parseInt(this.node.parent.getChildByName("score").getComponent(cc.Label).string)  + bDamage;
                //cc.log(this.node.parent);
                //cc.log(this.node.parent.getChildByName("score"));
                //cc.log(this.node.parent.getChildByName("score").string);
            }
        }

    },
});
