

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
     
        shootingSpeed: 0.5,//一秒钟发射子弹数
        flyingSpeed: 10,

     
        damage: 100,



    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.emitDaoDan(shootingSpeed);
      
    },



   

    emitDaoDan: function (shootingSpeed) {

      
        this.schedule(this.zhixianxiangxia, 1 / this.shootingSpeed);


    },

   

    susheCallback: function () {

        //TODO：！！这里应该以后应该加入子弹池来优化


        //根据子弹类型来生成子弹，类型决定加载什么预制体。

        this.zhixianxiangxia();



    },


    

   

    generateBullet: function () {
        let bl = null;

        bl = cc.instantiate(this.bullet0);


        bl.getComponent("enemyBullet").flyingSpeed = globalEnemyPlaneData[this.enemyID].flyingSpeed;
        bl.getComponent("enemyBullet").damage = this.damage;

        let playerX = this.node.parent.getComponent("Game").player.position.x;
        bl.setPosition(playerX,this.node.position.y);//把这个飞机 设在一个看不见的位置 往玩家飞机上发射导弹 ，位置不用设置的那么精细
       
        return bl;
    },


    //直线与斜线其实是一个概念，给敌机子弹传递一个目标位置,让其运行到那个位置即可
    zhixianxiangxia: function () {

        let bl = this.generateBullet();


        //极其重要的分类化,简单的代码保证了 不同的运动轨迹显示.
        bl.getComponent("enemyBullet").targetPositionX = this.node.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = -this.node.parent.getContentSize().height / 2 - 100;

       

        this.node.parent.addChild(bl);
    },


       
});
