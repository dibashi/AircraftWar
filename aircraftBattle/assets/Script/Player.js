

var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var globalJiSuTiSu = require("enemyPlaneDatas").jiSuTiSu;

var globalWuDiTime = require("enemyPlaneDatas").wuDiTime;
cc.Class({
    extends: cc.Component,

    properties: {

        prizeTeXiao: {
            default: null,
            type: cc.Prefab,
        },
        //子弹预制体
        bullet0: cc.Prefab,
        bullet1: cc.Prefab,
        bullet2: cc.Prefab,

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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        cc.log('player heroPlaneID  ' + D.globalHeroPlaneID);
      
        this.shootingSpeed = globalHeroPlaneData[D.globalHeroPlaneID].shootingSpeed;
        this.blood = globalHeroPlaneData[D.globalHeroPlaneID].blood;
        this.bulletType = globalHeroPlaneData[D.globalHeroPlaneID].bulletType;
        this.damage = globalHeroPlaneData[D.globalHeroPlaneID].damage;
        cc.log("this.shootingSpeed = " + this.shootingSpeed);
        cc.log("this.blood = " + this.blood);
        cc.log("this.bulletType = " + this.bulletType);



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



        this.startFire();

     //   this.onDrag();
    },

    // onDrag: function () {
    //     this.node.on('touchmove', this.dragMove, this);
    //     this.node.on('touchstart', this.dragStart, this);
    //     this.node.on('touchend', this.dragEnd, this);
    // },

    // offDrag: function () {
    //     this.node.off('touchmove', this.dragMove, this);
    //     this.node.off('touchstart', this.dragStart, this);
    //     this.node.off('touchend', this.dragEnd, this);
    // },

    //拖动
    // dragMove: function (event) {
    //     var locationv = event.getLocation();
    //     var location = this.node.parent.convertToNodeSpaceAR(locationv);
    //     //飞机不移出屏幕 
    //     var minX = -this.node.parent.width / 2 + this.node.width / 2;
    //     var maxX = -minX;
    //     var minY = -this.node.parent.height / 2 + this.node.height / 2;
    //     var maxY = -minY;
    //     if (location.x < minX) {
    //         location.x = minX;
    //     }
    //     if (location.x > maxX) {
    //         location.x = maxX;
    //     }
    //     if (location.y < minY) {
    //         location.y = minY;
    //     }
    //     if (location.y > maxY) {
    //         location.y = maxY;
    //     }
    //     this.node.setPosition(location);

    // },

    dragStart: function (event) {
        
    },
    dragEnd: function (event) {
      
    },

    startFire: function () {

        
        this.bICallback();
        this.schedule(this.bICallback, 1 / this.shootingSpeed);

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

    raiseTheSpeedOfFire:function() {
        this.shootingSpeed = this.shootingSpeed + globalJiSuTiSu;
        //如何把现有的定时器属性修改呢？
        this.schedule(this.bICallback, 1 / this.shootingSpeed);
    },

    susheCallback:function() {
        
        //TODO：！！这里应该以后应该加入子弹池来优化


        //根据子弹类型来生成子弹，类型决定加载什么预制体。
        
        var bl = null;
        if (this.bulletType === 0) {
            bl = cc.instantiate(this.bullet0);
        } else if (this.bulletType === 1) {
            bl = cc.instantiate(this.bullet1);
        } else if(this.bulletType === 2) {
            bl = cc.instantiate(this.bullet2);
        }
        // bl.getComponent('heroBullet').enemys = this.node.parent.enemys;//脚本未做 未加入
        this.node.parent.addChild(bl);

        bl.getComponent("heroBullet").flyingSpeed = globalHeroPlaneData[D.globalHeroPlaneID].flyingSpeed;
        bl.getComponent("heroBullet").damage = this.damage;
        bl.setPosition(this.node.position.x, this.node.position.y + this.node.height / 2 + bl.height / 2);
    },

    bICallback: function () {
        //连射三发 0.6时长
        
        for(let i = 0; i<3;i++) {
            // this.scheduleOnce(this.susheCallback,0.2);
            this.node.runAction(cc.sequence(cc.delayTime(0.2*(i)), cc.callFunc(this.susheCallback,this)));
        }
       
    },

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
