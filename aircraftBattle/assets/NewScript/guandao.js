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
        bullet0: cc.Prefab,
        bullet1: cc.Prefab,
       // bullet2: cc.Prefab,
        bulletType:0,
        enableGuanDao:true,
        shootingSpeed:2,
        damage:0,

        onceBulletCount:1,
    },

    
    onLoad () {        
        //this.startFire();
    },

    setEnableGuanDao( ena ){
        if(this.enableGuanDao == ena) {
            return;
        }
        this.enableGuanDao = ena;
        if(ena)
        {
            this.startFire();
        }
        else{
            this.unschedule(this.bICallback);
        }
    },
    
    startFire(){
        this.bICallback();
        this.schedule(this.bICallback, 1 / this.shootingSpeed);
    },

    addSpeed:function(sp) {
        this.shootingSpeed+=sp;
        this.schedule(this.bICallback, 1 / this.shootingSpeed);
    },

    susheCallback:function() {
        
        //TODO：！！这里应该以后应该加入子弹池来优化


        //根据子弹类型来生成子弹，类型决定加载什么预制体。
        
        var bl = null;
        if (this.bulletType === globalHeroBulletType.ordinary) {
            bl = cc.instantiate(this.bullet0);
        } else if (this.bulletType === globalHeroBulletType.upgrade) {
            bl = cc.instantiate(this.bullet1);
        } 
        // bl.getComponent('heroBullet').enemys = this.node.parent.enemys;//脚本未做 未加入
        // this.node.parent.addChild(bl);

        

        let canvas = cc.director.getScene().getChildByName("Canvas");
        canvas.addChild(bl);

        bl.getComponent("heroBullet").flyingSpeed = globalHeroPlaneData[D.globalHeroPlaneID].flyingSpeed;
        //bl.getComponent("heroBullet").damage = this.damage;
        bl.getComponent("heroBullet").damage = this.damage;
        let pos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
        let p = cc.v2(pos.x - cc.director.getVisibleSize().width*0.5, pos.y - cc.director.getVisibleSize().height*0.5);
        bl.setPosition( p );
    },


    bICallback: function () {
        //连射三发 0.6时长
        if(!this.enableGuanDao)
        {
            return;
        }
        for(let i = 0; i<this.onceBulletCount;i++) {
            // this.scheduleOnce(this.susheCallback,0.2);
            this.node.runAction(cc.sequence(cc.delayTime(0.15*(i)), cc.callFunc(this.susheCallback,this)));
        }
       
    },



    // LIFE-CYCLE CALLBACKS:

    start () {

    },

    // update (dt) {},
});
