

var globalHeroPlaneData = require("heroPlaneDatas").heroPlaneData;
var globalJiSuTiSu = require("enemyPlaneDatas").jiSuTiSu;

var globalWuDiTime = require("enemyPlaneDatas").wuDiTime;

var globalHeroBulletType = require("heroPlaneDatas").heroBulletType;
var globalWingmanBulletType = require("heroPlaneDatas").wingmanBulletType;
cc.Class({
    extends: cc.Component,

    properties: {

       
        // //子弹预制体
        // bullet0: cc.Prefab,
        // bullet1: cc.Prefab,
        // bullet2: cc.Prefab,

        //bulletIsOpen: false,
        // bulletIntelval: 0.75,
        shootingSpeed: 1,//一秒钟发射子弹数
        //flyingSpeed:0,
       
       // bulletType: 0,//0普通 1 光束
        //Radius: 50,
        damage: 1,

     
       

        guandaoCount:0, //管道1~5决定了5个弹道，
        guandaoArrays:null,

      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
     
        this.guandaoArrays = new Array();   
        
        //初始化管道数据
        for(let i = 0; i<5; i++) {
            //管道控制集合
            
            cc.log("~~~~~---> " + ("guandao"+i));
            cc.log(this.node.getChildByName("guandao"+i));
            if( this.node.getChildByName("guandao"+i) == null){
                break;
            }
            this.guandaoArrays[i] = this.node.getChildByName("guandao"+i);
            
            this.guandaoArrays[i].getComponent("guandao").damage = this.damage;
            this.guandaoArrays[i].getComponent("guandao").shootingSpeed = this.shootingSpeed;
            this.guandaoArrays[i].getComponent("guandao").setEnableGuanDao(false);
            this.guandaoArrays[i].getComponent("guandao").setEnableGuanDao(true);//这里写了两遍这行代码，是因为这个函数是伟伟写的，头太晕不想改了，以后重构
        }
 
    },


    onCollisionEnter: function (other, self) {

        //先要判断other是什么 比如 子弹，敌机，奖品。  other.node.group属性可以看到是什么组的，other那边设置一下group便于区分，
        //子弹eBullet, 敌机enemy，奖品 prize由于类型较多做在自己的脚本中，prefab,碰撞配置，分组，js脚本等
        //cc.log("other node    ");
        //cc.log(other.node);
       if (other.node.group === "enemy") {
           
          cc.log("dazhao plane coll!!");
              
                this.node.destory();
            
            
        }


    },

   





});
