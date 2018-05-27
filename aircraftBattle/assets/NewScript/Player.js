

var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var globalJiSuTiSu = require("enemyPlaneDatas").jiSuTiSu;

var globalWuDiTime = require("enemyPlaneDatas").wuDiTime;

var globalHeroBulletType = require("heroPlaneDatas").heroBulletType;
var globalWingmanBulletType = require("heroPlaneDatas").wingmanBulletType;

var globalMaxShootingSpeed = require("heroPlaneDatas").maxShootingSpeed;
var globalOnceAddSpeed = require("heroPlaneDatas").onceAddSpeed;
cc.Class({
    extends: cc.Component,

    properties: {

        prizeTeXiao: {
            default: null,
            type: cc.Prefab,
        },
        // //子弹预制体
        // bullet0: cc.Prefab,
        // bullet1: cc.Prefab,
        // bullet2: cc.Prefab,

        //bulletIsOpen: false,
        // bulletIntelval: 0.75,
        shootingSpeed: 1,//一秒钟发射子弹数
        //flyingSpeed:0,
        blood: 1,
        bulletType: 0,//0普通 1 光束
        //Radius: 50,
        damage: 0,

        bloodBar: {//并不是单纯的label 
            default: null,
            type: cc.Prefab,
        },
        bBar: null,//label
        wudi:false,
        _wuditexiao:null,
        _wudiTime:0,

        guandaoCount:0, //管道1~5决定了5个弹道，
        guandaoArrays:null,

        wingmanCount:0,
        wingmanArrays:null,

        onceBulletCount:1,

        trackGuandaoCount:0,
        trackGuandaoArrays:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        

        cc.log('player heroPlaneID  ' + D.globalHeroPlaneID);
      
        this.shootingSpeed = globalHeroPlaneData[D.globalHeroPlaneID].shootingSpeed;
        this.blood = globalHeroPlaneData[D.globalHeroPlaneID].blood;
        this.bulletType = globalHeroPlaneData[D.globalHeroPlaneID].bulletType;
        this.damage = globalHeroPlaneData[D.globalHeroPlaneID].damage;

        this.onceBulletCount = globalHeroPlaneData[D.globalHeroPlaneID].onceBulletCount;
        cc.log("this.shootingSpeed = " + this.shootingSpeed);
        cc.log("this.blood = " + this.blood);
        cc.log("this.bulletType = " + this.bulletType);

        this.guandaoArrays = new Array();
        // let childcount = this.nodechildrenCount;
        // for(let i = 0; i<childcount;i++) {
        //     if(this.node.children[i].name == "guandao0" ||
        //     this.node.children[i].name == "guandao1" ||
        //     this.node.children[i].name == "guandao2" ||
        //     this.node.children[i].name == "guandao3" ||
        //     this.node.children[i].name == "guandao4" ||
        //     this.node.children[i].name == "guandao5" ||
        //     this.node.children[i].name == "guandao6" ) {

        //     }
        // }
        
//初始化管道数据
        for(let i = 0; i<5; i++) {
            // this.node.children[i].getComponent("guandao").damage = this.damage;
            // this.node.children[i].getComponent("guandao").shootingSpeed = this.shootingSpeed;
            //管道控制集合
            
            // cc.log("~~~~~---> " + ("guandao"+i));
            // cc.log(this.guandaoArrays[i]);
            if( this.node.getChildByName("guandao"+i) == null){
                break;
            }
            this.guandaoArrays[i] = this.node.getChildByName("guandao"+i);
            
            this.guandaoArrays[i].getComponent("guandao").damage = this.damage;
            this.guandaoArrays[i].getComponent("guandao").shootingSpeed = this.shootingSpeed;
            this.guandaoArrays[i].getComponent("guandao").setEnableGuanDao(false);
            this.guandaoArrays[i].getComponent("guandao").bulletType = this.bulletType;

            this.guandaoArrays[i].getComponent("guandao").onceBulletCount = this.onceBulletCount;
        }
        this.wingmanArrays = new Array();
//初始化僚机数据 现在用的都是 飞机数据//以后可能要做一个僚机表 根据当前飞机的ID 来从表中取数据
        for(let i = 0; i<6; i++) {
            // this.node.children[i].getComponent("guandao").damage = this.damage;
            // this.node.children[i].getComponent("guandao").shootingSpeed = this.shootingSpeed;
            //管道控制集合
            
            if(this.node.getChildByName("wingman"+i) == null){
                break;
            }
            this.wingmanArrays[i] = this.node.getChildByName("wingman"+i);

            this.wingmanArrays[i].getComponent("wingman").damage = this.damage;
            this.wingmanArrays[i].getComponent("wingman").shootingSpeed = this.shootingSpeed;
            this.wingmanArrays[i].getComponent("wingman").setEnableGuanDao(false);
            this.wingmanArrays[i].getComponent("wingman").bulletType = this.bulletType;
            this.wingmanArrays[i].active = false;
        }
        //启动僚机
        cc.log("llll---> " +this.wingmanArrays.length);
        if(this.wingmanArrays.length>0) {
            this.runWingman();
        }



        this.trackGuandaoArrays = new Array();
     //这里先都用飞机那套数据，以后再重构  算了 这里自己定义的数据
        for(let i = 0; i<4; i++) {
           
           // cc.log(this.trackGuandaoArrays[i]);
            if( this.node.getChildByName("guandaoTrack"+i) == null){
                break;
            }
            this.trackGuandaoArrays[i] = this.node.getChildByName("guandaoTrack"+i);
            
            this.trackGuandaoArrays[i].getComponent("guandaoTrack").damage = 1;
            this.trackGuandaoArrays[i].getComponent("guandaoTrack").shootingSpeed = 2;
            this.trackGuandaoArrays[i].getComponent("guandaoTrack").flyingSpeed = 8;
            this.trackGuandaoArrays[i].getComponent("guandaoTrack").setEnableGuanDao(false);
            //this.trackGuandaoArrays[i].getComponent("guandaoTrack").setEnableGuanDao(true);
           // this.trackGuandaoArrays[i].getComponent("guandaoTrack").bulletType = 0;

            this.trackGuandaoArrays[i].getComponent("guandaoTrack").onceBulletCount = 1;
        }
      
        

        //血条 以后要改成进度条
        var nodeBar = cc.instantiate(this.bloodBar);
        this.bBar = nodeBar.getComponent(cc.Label);
        cc.log(this.bBar);
        this.bBar.string = this.blood;
        //bBar.string = "lh";
        // cc.log("bBar =   "+bBar.string);
        cc.log("bbblood   " + this.blood);
        this.node.addChild(nodeBar);
        nodeBar.setPosition(0, 0);
        // nodeBar.rotation = 180;

     
        //初始管道设置为0
        this.guandaoCount = 0;
        //跟踪导弹管道设置为0
        this.trackGuandaoCount = 0;

        this.upgradePlane();
    },


    upgradePlane:function() {

        
        if(this.guandaoCount<5) {
            this.guandaoCount++;
            //先全部关闭，然后根据个数来设置相应的管道
            for(let i = 0; i<5; i++) {
                this.guandaoArrays[i].getComponent("guandao").setEnableGuanDao(false);
            }

            switch(this.guandaoCount) {
                case 1:
                this.guandaoArrays[0].getComponent("guandao").setEnableGuanDao(true);
                break;
                case 2:
                this.guandaoArrays[1].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[2].getComponent("guandao").setEnableGuanDao(true);
                break;

                case 3:
                this.guandaoArrays[0].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[1].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[2].getComponent("guandao").setEnableGuanDao(true);
                break;

                case 4:
                this.guandaoArrays[1].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[2].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[3].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[4].getComponent("guandao").setEnableGuanDao(true);
                break;

                case 5:
                this.guandaoArrays[0].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[1].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[2].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[3].getComponent("guandao").setEnableGuanDao(true);
                this.guandaoArrays[4].getComponent("guandao").setEnableGuanDao(true);
                break;
            }

        } else if((this.guandaoArrays[0].getComponent("guandao").shootingSpeed+globalOnceAddSpeed) < globalMaxShootingSpeed){
            for(let i = 0; i<this.guandaoCount; i++) {
                //以前是更改发射子弹图片，已废除！
                // if(this.guandaoArrays[i].getComponent("guandao").bulletType == globalHeroBulletType.ordinary) {
                //     this.guandaoArrays[i].getComponent("guandao").bulletType = globalHeroBulletType.upgrade;
                //     return;
                // }
               //  cc.log("this.guandaoArrays[i].getComponent(guandao).shootingSpeed!--> " +this.guandaoArrays[i].getComponent("guandao").shootingSpeed);
               // if((this.guandaoArrays[i].getComponent("guandao").shootingSpeed+globalOnceAddSpeed) < globalMaxShootingSpeed) {
                   // this.guandaoArrays[i].getComponent("guandao").shootingSpeed += globalOnceAddSpeed;
                   this.guandaoArrays[i].getComponent("guandao").addSpeed(globalOnceAddSpeed);
              //  }
            }
        } else if(this.trackGuandaoCount<4) {
            this.trackGuandaoCount++;
            for(let i =0; i<this.trackGuandaoCount;i++) {
                this.trackGuandaoArrays[i].getComponent("guandaoTrack").setEnableGuanDao(true);
            }
        }

    },

    runWingman:function() {
        let wmCount = cc.sys.localStorage.getItem('heroPlaneWingmanCount'+D.globalHeroPlaneID);
        
        
        // cc.log("僚机数量----->  " +wmCount);
        // cc.log("~僚机数量----->  " +cc.sys.localStorage.getItem('heroPlaneWingmanCount0'));
        for(let i= 0;i<wmCount;i++) {
            this.wingmanArrays[i].active = true;
            this.wingmanArrays[i].getComponent("wingman").setEnableGuanDao(true);
        }
    },


    
    wudichongci:function() {
        if(this.wudi == false) {
            this._wuditexiao = cc.instantiate(this.prizeTeXiao);//!!!
            let armatureDisplay =  this._wuditexiao.getComponent(dragonBones.ArmatureDisplay);
           // let wudiTX = armatureDisplay.buildArmature("TXwudi");
            armatureDisplay.playAnimation("wudi");
            this.node.addChild(this._wuditexiao);
            
            this.wudi = true;
           this._wudiTime = globalWuDiTime;
        } else {
            this._wudiTime = globalWuDiTime;
        }
       
    },

    addBlood: function () {
         this.blood = globalHeroPlaneData[D.globalHeroPlaneID].blood;
         this.bBar.string = this.blood;
        
            
    },

    // raiseTheSpeedOfFire:function() {
    //     this.shootingSpeed = this.shootingSpeed + globalJiSuTiSu;
    //     //如何把现有的定时器属性修改呢？
    //     this.schedule(this.bICallback, 1 / this.shootingSpeed);
    // },

    // susheCallback:function() {
        
    //     //TODO：！！这里应该以后应该加入子弹池来优化


    //     //根据子弹类型来生成子弹，类型决定加载什么预制体。
        
    //     var bl = null;
    //     if (this.bulletType === 0) {
    //         bl = cc.instantiate(this.bullet0);
    //     } else if (this.bulletType === 1) {
    //         bl = cc.instantiate(this.bullet1);
    //     } else if(this.bulletType === 2) {
    //         bl = cc.instantiate(this.bullet2);
    //     }
    //     // bl.getComponent('heroBullet').enemys = this.node.parent.enemys;//脚本未做 未加入
    //     // this.node.parent.addChild(bl);

        

    //     let canvas = cc.director.getScene().getChildByName("Canvas");
    //     canvas.addChild(bl);

    //     bl.getComponent("heroBullet").flyingSpeed = globalHeroPlaneData[D.globalHeroPlaneID].flyingSpeed;
    //     bl.getComponent("heroBullet").damage = this.damage;
    //     bl.setPosition(this.node.position.x, this.node.position.y + this.node.height / 2);
    // },

    // bICallback: function () {
    //     //连射三发 0.6时长
        
    //     for(let i = 0; i<7;i++) {
    //         // this.scheduleOnce(this.susheCallback,0.2);
    //         this.node.runAction(cc.sequence(cc.delayTime(0.1*(i)), cc.callFunc(this.susheCallback,this)));
    //     }
       
    // },

    onCollisionEnter: function (other, self) {

        //先要判断other是什么 比如 子弹，敌机，奖品。  other.node.group属性可以看到是什么组的，other那边设置一下group便于区分，
        //子弹eBullet, 敌机enemy，奖品 prize由于类型较多做在自己的脚本中，prefab,碰撞配置，分组，js脚本等
        //cc.log("other node    ");
        //cc.log(other.node);
        if (other.node.group === "eBullet") {
            var bDamage = other.node.getComponent("enemyBullet").damage;

            if ((this.blood - bDamage) <= 0) {//游戏结束



                cc.log("游戏结束");

                this.node.parent.getComponent('Game').gameOver();
            } else {
                if(!this.wudi) {
                    this.blood -= bDamage; //屏蔽后无敌 方便调试
                    this.bBar.string = this.blood;
                }
               
            }
        } else if (other.node.group === "enemy") {
           
            if(!this.wudi) {
                cc.log("游戏结束");
                this.node.parent.getComponent('Game').gameOver();
            }
            
        }


    },

   

     update(dt) {

        if(this.wudi && this._wudiTime <=0) {
            this.wudi =false;
            if(this._wuditexiao) {
                this._wuditexiao.destroy();
                this._wuditexiao = null;
            }
        }

        if(this.wudi) {
            this._wudiTime -= dt;
        } 

       // this._wudiTime(this.wuDiTime);

      
    },

    getEnemyDistance: function (enemy) {

        var enemy = enemy.getPosition();

        var dist = cc.pDistance(this.node.position, enemy);
        return dist;
    }

    // update(dt) {



    //     for(var i = 0; i<D.enemys.length;i++) {

    //         if(this.getEnemyDistance(D.enemys[i]) < this.Radius) {
    //             cc.log("游戏结束");

    //             this.node.parent.getComponent('Game').gameOver();
    //         }
    //     }
    // },

    // getEnemyDistance: function (enemy) {

    //     var enemy = enemy.getPosition();

    //     var dist = cc.pDistance(this.node.position, enemy);
    //     return dist;
    // },

});