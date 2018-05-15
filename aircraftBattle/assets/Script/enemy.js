

//var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var generateType = require("enemyPlaneDatas").generateType;
var globalEnemyPlaneData = require("enemyPlaneDatas").enemyPlaneData;
cc.Class({
    extends: cc.Component,

    properties: {


        //子弹预制体
        bullet0: cc.Prefab,
        bullet1: cc.Prefab,

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
        cc.log("bbblood   " + this.blood);
        this.node.addChild(nodeBar);
        nodeBar.setPosition(0, 0);
        nodeBar.rotation = 180;
        //cc.log(bBar.getPosition());
    },

  

    startFire: function () {

        // if(this.bulletIsOpen == false) {
        //     this.schedule(this.bICallback, this.bulletIntelval,10000,0.01);
        //    // this.schedule(bICallback,this,bulletIntelval);

        //     this.bulletIsOpen = true;
        // }

        this.schedule(this.bICallback, 1 / this.shootingSpeed);


    },

    enterCallback:function() {

        cc.log("enemy enterCallback  enemyID"+ this.enemyID);

        // this.schedule(this.bICallback1, this.bulletIntelval, 10000, 0.01);
        // //this.scheduleOnce(this.bICallback1, 2);
        // var moveRight1 = cc.moveBy(1, cc.p(40, 0));
        // var moveLeft1 = cc.moveBy(1, cc.p(-40, 0));
        // var moveLeft2 = cc.moveBy(1, cc.p(-40, 0));
        // var moveRight2 = cc.moveBy(1, cc.p(40, 0));

        // var seq = cc.sequence(moveRight1, moveLeft1, moveLeft2, moveRight2);
        // var act = cc.repeatForever(seq);
        // D.enemys[0].runAction(act);
    },

    bICallback: function () {


        // var bl = cc.instantiate(this.bullet);
        // bl.getComponent('bullet1').enemys = this.node.parent.enemys;
        // this.node.parent.addChild(bl);
        // bl.setPosition(this.node.position.x, this.node.position.y+this.node.height/2);

        // var pos = bl.getPosition();
        // pos.y = 400;
        // bl.runAction(cc.moveTo(5, pos));
        //TODO：！！这里应该以后应该加入子弹池来优化


        //根据子弹类型来生成子弹，类型决定加载什么预制体。
        var bl = null;
        if (this.bulletType === 0) {
            bl = cc.instantiate(this.bullet0); //预制体未做 未加入
        } else if (this.bulletType === 1) {
            bl = cc.instantiate(this.bullet1);//预制体未做 未加入
        }
        // bl.getComponent('heroBullet').enemys = this.node.parent.enemys;//脚本未做 未加入
        this.node.parent.addChild(bl);

        bl.getComponent("heroBullet").flyingSpeed = globalHeroPlaneData[D.globalHeroPlaneID].flyingSpeed;
        bl.setPosition(this.node.position.x, this.node.position.y + this.node.height / 2 + bl.height / 2);
    },

    start() {

    },

    update(dt) {



        for (var i = 0; i < D.enemys.length; i++) {

            if (this.getEnemyDistance(D.enemys[i]) < this.Radius) {
                cc.log("游戏结束");

                this.node.parent.getComponent('Game').gameOver();
            }
        }
    },

    getEnemyDistance: function (enemy) {

        var enemy = enemy.getPosition();

        var dist = cc.pDistance(this.node.position, enemy);
        return dist;
    },

    onCollisionEnter: function (other, self) {
        //    console.log('on collision enter');
        //   cc.log("other");
        //     cc.log(other.node);

        //     cc.log("self");
        //     cc.log(self.node);

        var bDamage = other.node.getComponent("heroBullet").damage;
        // cc.log("Damage!!  "+ bDamage);
        if ((this.blood - bDamage) <= 0) {//销毁 掉落物品逻辑
           
            //根据enemyID来生成掉落物品
            //globalEnemyPlaneData[enemyID].fallingObject
            var r = Math.random();
            cc.log("random dropProbability  " + r);
            if (r <= globalEnemyPlaneData[this.enemyID].dropProbability) {
                switch (globalEnemyPlaneData[this.enemyID].fallingObject) {
                    case generateType.jinbi:
                        cc.log("jinbi!");
                        break;
                    case generateType.wudichongci:
                        cc.log("wudichongci!");
                        break;
                    case generateType.xinjiaxue:
                        cc.log("xinjiaxue!");
                        break;
                    case generateType.jisushesu:
                        cc.log("jisushesu!");
                        break;
                    case generateType.huojianpao:
                        cc.log("huojianpao!");
                        break;
                }
            }
            
            this.node.parent.getComponent('Game').checkNextStage();
            this.node.destroy();
        } else {
            this.blood -= bDamage;
            this.bBar.string = this.blood;
        }


    },
});
