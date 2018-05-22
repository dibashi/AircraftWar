

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
        nodeBar:null,//label的node
        bBar: null,//label
        baoZhaTeXiao:null,
        damagedTeXiao:null,

        bulletTrack:0,

        enemyTrack:0,

        particleSys: {//并不是单纯的label 
            default: null,
            type: cc.Prefab,
        },
        partice:null,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        // let particle = this.node.getChildByName("particlesystem").getComponent(cc.ParticleSystem);
        // if (particle.particleCount > 0) { // check if particle has fully plaed
        //     particle.stopSystem(); // stop particle system
        // }
       

        //cc.log("particle--->  " );
       // cc.log(particle);


        //this.bloodBar.string = this.blood;
        this.nodeBar = cc.instantiate(this.bloodBar);
        this.bBar = this.nodeBar.getComponent(cc.Label);
        cc.log(this.bBar);
        this.bBar.string = this.blood;
        //bBar.string = "lh";
        // cc.log("bBar =   "+bBar.string);
        //cc.log("bbblood   " + this.blood);
        this.node.addChild(this.nodeBar);
        this.nodeBar.setPosition(0, 0);
        this.nodeBar.rotation = 180;
        //cc.log(bBar.getPosition());
    },



    zuoyoushangxia:function() {
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

    enterCallback: function () {

        //cc.log("enemy enterCallback  enemyID"+ this.enemyID);
        //TODO!!!这里是敌机飞行轨迹！！！ 以后可以改为动态的！  
        //这里的射击速度是 单次射击  将来 像三连发 然后停顿的 如何设计 ？
        //其实应该在这里根据子弹射击方式来定义
        //1 根据 敌机的 运动轨迹数据 来调用相关轨迹动画函数
        //2 根据 敌机的 子弹发射方式 来 调用相关的 发射动画函数
        if(this.enemyTrack == enemyTrack.guding) {
            //固定不动就不需要实现什么了
        } else if( this.enemyTrack == enemyTrack.zuoyoushangxia) {
            this.zuoyoushangxia();
        }


        if(this.bulletTrack == bulletTrack.zhixianxiangxia) {
            this.schedule(this.zhixianxiangxia, 1 / this.shootingSpeed);
        } else if( this.bulletTrack == bulletTrack.dingwei) {
            this.schedule(this.dingwei, 1 / this.shootingSpeed);
        }else if( this.bulletTrack == bulletTrack.banquan) {
           // this.schedule(this.xiexian, 1 / this.shootingSpeed);
           this.schedule(this.banquan, 1 / this.shootingSpeed);
        } else if( this.bulletTrack == bulletTrack.yiquan) {
            // this.schedule(this.xiexian, 1 / this.shootingSpeed);
            this.schedule(this.yiquan, 1 / this.shootingSpeed);
        } else if(this.bulletTrack == bulletTrack.sanfazhixian) {
            this.schedule(this.sanfazhixian, 1 / this.shootingSpeed);
        }
         else if( this.bulletTrack == bulletTrack.sanfasanshe) {
            this.schedule(this.sanfasanshe, 1 / this.shootingSpeed);
        }

       
        
        
    },

    sanfazhixian:function() {
      
        for(let i = 0; i<3;i++) {
            // this.scheduleOnce(this.susheCallback,0.2);
            this.node.runAction(cc.sequence(cc.delayTime(0.2*(i)), cc.callFunc(this.susheCallback,this)));
        }

    },

    susheCallback:function() {
        
        //TODO：！！这里应该以后应该加入子弹池来优化


        //根据子弹类型来生成子弹，类型决定加载什么预制体。
        
       this.zhixianxiangxia();

  
         
    },

    yiquan:function() {
      
        for(let jiaodu =-180; jiaodu<180;jiaodu+=30) {
            this.xiexianByjiaodu(jiaodu);
            //this.xiexian(jiaodu);
        }
        
        //this.xiexianByjiaodu(30);

    },

     yiquan:function() {
      
        for(let jiaodu =-180; jiaodu<180;jiaodu+=30) {
            this.xiexianByjiaodu(jiaodu);
            //this.xiexian(jiaodu);
        }
        
        //this.xiexianByjiaodu(30);

    },

    banquan:function() {
      
        for(let jiaodu =-45; jiaodu>-136;jiaodu-=30) {
            this.xiexianByjiaodu(jiaodu);
            //this.xiexian(jiaodu);
        }
        //this.xiexianByjiaodu(30);

    },

    xiexianByjiaodu:function(jiaodu) {
        if(-90<jiaodu && jiaodu<90) {
            this.xiexianRight(jiaodu);
        } else if(jiaodu>90 || jiaodu<-90) {
            this.xiexianLeft(jiaodu);
        } else if( jiaodu == -90) {
            this.zhixianxiangxia();
        }else if( jiaodu == 90) {
            this.zhixianxiangshang();
        }
    },
    //往右边倾斜
    xiexianRight:function(jiaodu) {
        //cc.log("jiaodu---> " + jiaodu);
        let bl = this.generateBullet();
      //  bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法

        bl.getComponent("enemyBullet").targetPositionX = bl.position.x + 100;
        bl.getComponent("enemyBullet").targetPositionY = bl.position.y + (100*Math.tan(jiaodu*0.017453293));//2pi/360 = 0.017453293
        
        //  cc.log("bl.position.x---> " + bl.position.x);
        //  cc.log("bl.position.y---> " + bl.position.y);
        
        
        //  cc.log("targetPositionX---> " + bl.getComponent("enemyBullet").targetPositionX);
        //  cc.log("targetPositionY---> " + bl.getComponent("enemyBullet").targetPositionY);

        //  cc.log("100*Math.tan(jiaodu)---> " + 100*Math.tan(jiaodu*0.017453293));
        this.node.parent.addChild(bl);
    },

    xiexianLeft:function(jiaodu) {
      
        let bl = this.generateBullet();
       

        bl.getComponent("enemyBullet").targetPositionX = bl.position.x - 100;
        bl.getComponent("enemyBullet").targetPositionY = bl.position.y - (100*Math.tan(jiaodu*0.017453293));
        
        this.node.parent.addChild(bl);
    },

    sanfasanshe:function() {
        // let bl1 = this.generateBullet();
        // let bl2 = this.generateBullet();
        // let bl3 = this.generateBullet();
        // bl1.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法
        // bl2.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);
        // bl3.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);
        // //bl1定位
        // bl1.getComponent("enemyBullet").targetPositionX = this.node.parent.getComponent("Game").player.getPosition().x;
        // bl1.getComponent("enemyBullet").targetPositionY = this.node.parent.getComponent("Game").player.getPosition().y;
        // //bl2, bl3 斜线

        // this.node.parent.addChild(bl);
    },

    generateBullet:function() {
        let bl = null;
        if (this.bulletType === bulletType.jipao) {
            bl = cc.instantiate(this.bullet0); //预制体未做 未加入
        } else if (this.bulletType === bulletType.huopao) {
            bl = cc.instantiate(this.bullet1);//预制体未做 未加入
        }

        bl.getComponent("enemyBullet").flyingSpeed = globalEnemyPlaneData[this.enemyID].flyingSpeed;
        bl.getComponent("enemyBullet").damage = this.damage;

        //bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法
        bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 );
        return bl;
    },

    

   
   
    //直线与斜线其实是一个概念，给敌机子弹传递一个目标位置,让其运行到那个位置即可
    zhixianxiangxia: function () {

        //TODO：！！这里应该以后应该加入子弹池来优化

        //根据子弹类型来生成子弹，类型决定加载什么预制体。
        
        // bl.getComponent('heroBullet').enemys = this.node.parent.enemys;//脚本未做 未加入
        let bl = this.generateBullet();
        //分离出来是为了以后 如果有轨迹是发射很多子弹,可以遍历,然后每个子弹的位置单独设置,或者设置在飞机中心
       // bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法
        
        //极其重要的分类化,简单的代码保证了 不同的运动轨迹显示.
        bl.getComponent("enemyBullet").targetPositionX = this.node.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = -this.node.parent.getContentSize().height/2-50;

        //cc.log("bl positionX--> " + bl.getPosition().x + "  bl positionY---> " + bl.getPosition().y);
        //cc.log("bl vecX--> " + bl.getComponent("enemyBullet").targetPositionX + "  bl vecY---> " + bl.getComponent("enemyBullet").targetPositionY);

        this.node.parent.addChild(bl);
    },


    zhixianxiangshang: function () {

      
        let bl = this.generateBullet();
        
      //  bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法
        
        
        bl.getComponent("enemyBullet").targetPositionX = this.node.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = this.node.parent.getContentSize().height/2+50;

     

        this.node.parent.addChild(bl);
    },

    dingwei:function() {
        let bl = this.generateBullet();
      //  bl.setPosition(this.node.position.x, this.node.position.y - this.node.height / 2 - bl.height / 2);//向下 减法

        bl.getComponent("enemyBullet").targetPositionX = this.node.parent.getComponent("Game").player.getPosition().x;
        bl.getComponent("enemyBullet").targetPositionY = this.node.parent.getComponent("Game").player.getPosition().y;

        this.node.parent.addChild(bl);
    },

    enemyBoomAni:function() {
        //这里有一个问题 敌机在爆炸后消失 所以在爆炸的动画过程中 如果被击中，还是会触发 要关闭该敌机的碰撞
    //    this.node.group = "NOOOOOOO";
    //     cc.log(this.node.getComponent(cc.Animation));
    //    var anim = this.node.getComponent(cc.Animation);
    //    anim.play("baozhaAni");
    //    cc.log("--------------");
    //    cc.log(anim);
    //    anim.scale = 10;
//this.unscheduleAllCallbacks();
    this.node.group = "NOOOOOOO";

    this.partice = cc.instantiate(this.particleSys);
    this.node.parent.addChild(this.partice);
    this.partice.setPosition(this.node.getPosition());
  //  this.node.getChildByName("particlesystem").getComponent(cc.ParticleSystem);
        this.partice.getComponent(cc.ParticleSystem).resetSystem();
       
        //this.nodeBar.destroy();//删除血条
        this.node.opacity = 0;
        this.scheduleOnce(this.baozhaOver,0.7);
    },  

    baozhaOver:function() {
        this.unscheduleAllCallbacks();
        this.partice.destroy();
        cc.log("爆炸动画结束~~~~");
        //这个有问题 要放动画回调 TODO!
        this.node.parent.getComponent('Game').generatePrize(this.enemyID,this.node.getPosition());

        this.node.parent.getChildByName("score").getComponent(cc.Label).string = parseInt(this.node.parent.getChildByName("score").getComponent(cc.Label).string)  + this.blood;
        this.node.parent.getComponent('Game').checkNextStage();
        this.node.destroy();
    },
    //以前动画的
    // baozhaOver:function(event) {
    //     cc.log("爆炸动画结束~~~~");
    //     //这个有问题 要放动画回调 TODO!
    //     this.node.parent.getComponent('Game').generatePrize(this.enemyID,this.node.getPosition());

    //     this.node.parent.getChildByName("score").getComponent(cc.Label).string = parseInt(this.node.parent.getChildByName("score").getComponent(cc.Label).string)  + this.blood;
    //     this.node.parent.getComponent('Game').checkNextStage();
    //     this.node.destroy();
    // },



    enemyDamagedAni:function() {
        
        
        this.damagedTeXiao = cc.instantiate(this.prizeTeXiao);//!!!
            let armatureDisplay =  this.damagedTeXiao.getComponent(dragonBones.ArmatureDisplay);
         
            armatureDisplay.playAnimation("baozha");
         
            this.node.addChild(this.damagedTeXiao);
            armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE,this.damagedOver,this);
  

           // this.node.getChildByName("particlesystem")
    },

    damagedOver:function(event) {
    
        //这个有问题 要放动画回调 TODO!
      

        this.damagedTeXiao.destroy();
    },


    onCollisionEnter: function (other, self) {

        if (other.node.group === "hBullet") {
           
            var bDamage = other.node.getComponent("heroBullet").damage;
            // cc.log("Damage!!  "+ bDamage);
            if ((this.blood - bDamage) <= 0) {//销毁 掉落物品逻辑

                //根据enemyID来生成掉落物品 //传入game 让game来生成预制体
               
               
                this.enemyBoomAni();
                
               // this.node.destroy();
            } else {
                //cc.log
                this.blood -= bDamage;
                this.bBar.string = this.blood;
                this.enemyDamagedAni();
                //根据掉血量来加分吧
                this.node.parent.getComponent('Game').addScore(bDamage)
                //this.node.parent.getChildByName("score").getComponent(cc.Label).string = parseInt(this.node.parent.getChildByName("score").getComponent(cc.Label).string)  + bDamage;
                //cc.log(this.node.parent);
                //cc.log(this.node.parent.getChildByName("score"));
                //cc.log(this.node.parent.getChildByName("score").string);
            }
        }

    },
});
