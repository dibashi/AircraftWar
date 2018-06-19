// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var globalHeroBulletType = require("heroPlaneDatas").heroBulletType;
cc.Class({
    extends: cc.Component,

    properties: {

        //子弹预制体
        coin0: cc.Prefab,
      
       
        enableGuanDao: false,
        shootingSpeed: 2,
        damage: 0,

        onceBulletCount: 1,

        bullet2Audio: {
            default: null,
            url: cc.AudioClip
        },

        bulletPool:null,
        bulletPoolSize:20,

        isCu:false,//子弹是否加粗
    },


    onLoad() {
    //    this.bulletPool = new cc.NodePool();
    //    for(let i = 0;i<this.bulletPoolSize;i++) {
    //        let bl = cc.instantiate(this.bullet0);
    //        this.bulletPool.put(bl);
    //        bl.getComponent("heroBullet").isPoolBullet = true;
    //    }

        this.shootingSpeed = 6;
    },

    setEnableGuanDao(ena) {
        
        
        if (this.enableGuanDao == ena) {
            return;
        }
        cc.log("1~~~开始发射金币");
        this.enableGuanDao = ena;
        if (ena) {
            this.startFire();
        }
        else {
            this.unschedule(this.bICallback);
        }
    },

    startFire() {
        if(this!=undefined) {
            this.bICallback();
            this.schedule(this.bICallback, 1 / this.shootingSpeed);
        }
     
    },


 

    susheCallback: function () {
        cc.log("~! gogo dropcoin");
        var bl = null;
        bl = cc.instantiate(this.coin0);

        bl.getComponent("prize").prizeType = 10;//掉落金币阶段！

        let canvas = cc.director.getScene().getChildByName("Canvas");
        canvas.addChild(bl);
        let pos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        let p = cc.v2(pos.x - cc.director.getVisibleSize().width * 0.5, pos.y - cc.director.getVisibleSize().height * 0.5);
        bl.setPosition(p);
    },


    bICallback: function () {
        //连射三发 0.6时长
        if (!this.enableGuanDao) {
            return;
        }
        for (let i = 0; i < this.onceBulletCount; i++) {
            this.node.runAction(cc.sequence(cc.delayTime(0.1 * (i)), cc.callFunc(this.susheCallback, this)));
        }

    },


});
