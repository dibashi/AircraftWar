// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var heroPlaneID = require("heroPlaneID").heroPlaneID;

//var aaa = require("heroPlaneDatas").heroPlaneData;
var globalEnemyPlaneData = require("enemyPlaneDatas").enemyPlaneData;
var globalStageData = require("enemyPlaneDatas").stageData;

var generateType = require("enemyPlaneDatas").generateType;

var globalDropJinBiCount = require("enemyPlaneDatas").dropJinBiCount;
var globalJinBiCount = require("enemyPlaneDatas").jinBiCount;


cc.Class({
    extends: cc.Component,

    properties: {
        
        enemyPlane0: {
            default: null,
            type: cc.Prefab,
        },
        enemyPlane1: {
            default: null,
            type: cc.Prefab,
        },
        enemyPlane2: {
            default: null,
            type: cc.Prefab,
        },
        enemyPlane3: {
            default: null,
            type: cc.Prefab,
        },
        enemyPlane4: {
            default: null,
            type: cc.Prefab,
        },


        heroPlane0: {
            default: null,
            type: cc.Prefab,
        },
        heroPlane1: {
            default: null,
            type: cc.Prefab,
        },
        heroPlane2: {
            default: null,
            type: cc.Prefab,
        },
        heroPlane3: {
            default: null,
            type: cc.Prefab,
        },
        heroPlane4: {
            default: null,
            type: cc.Prefab,
        },
        heroPlane5: {
            default: null,
            type: cc.Prefab,
        },

        bloodBar: {
            default: null,
            type:cc.Prefab,
        },


        prizeJinBi: {
            default: null,
            type: cc.Prefab,
        },
        prizeWuDiChongCi: {
            default: null,
            type: cc.Prefab,
        },
        prizeXinJiaXue: {
            default: null,
            type: cc.Prefab,
        },
        prizeJiSuSheSu: {
            default: null,
            type: cc.Prefab,
        },
        prizeHuoJianPao: {
            default: null,
            type: cc.Prefab,
        },


        enemyBullet1: cc.Prefab,
        enemyBullet2: cc.Prefab,
        enemyBullet3: cc.Prefab,

        bulletIntelval: 2000,
        //enemys : [],

        stage: 0,
        checkStageCount: 0,
        
        //beginY: 400,
        enemyMoveTime: 1,
        enemyBulletMoveTime: 4,

        enemyCount:-1,//存储当前游戏的敌机个数，来实现stage切换。
        player:null,
    },




    onLoad() {
        var isloaded = cc.sys.localStorage.getItem("isLoaded");
        
        if(!isloaded) {
            cc.sys.localStorage.setItem('isLoaded', 1);
            cc.sys.localStorage.setItem('jinBiCount', globalJinBiCount);
            //分数一般是从服务器读取，这里先用本地存储。
            cc.sys.localStorage.setItem('bestScore', 0);

        } else {
            var countLoaded = parseInt(cc.sys.localStorage.getItem('isLoaded')) +1;
            cc.sys.localStorage.setItem('isLoaded', countLoaded);
            //cc.log("第" + countLoaded +"次登陆");
        }

        cc.log("isloaded " + cc.sys.localStorage.getItem('isLoaded') );
        cc.log("jinBiCount " + cc.sys.localStorage.getItem('jinBiCount') );
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //debug绘制
        //manager.enabledDebugDraw = true;

        cc._initDebugSetting(cc.DebugMode.INFO);
        cc.log('globalHeroPlaneID  ' + D.globalHeroPlaneID);
        //留个接口，以后根据用户选择来决定HeroPlaneID
        //D.globalHeroPlaneID = heroPlaneID.heroPlane2;
        cc.log('globalHeroPlaneID  ' + D.globalHeroPlaneID);

        //根据globalHeroPlaneID来加载不同的预制体
        //var player = null;
        if (D.globalHeroPlaneID === heroPlaneID.heroPlane0) {
            this.player = cc.instantiate(this.heroPlane0);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane1) {
            this.player = cc.instantiate(this.heroPlane1);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane2) {
            this.player = cc.instantiate(this.heroPlane2);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane3) {
            this.player = cc.instantiate(this.heroPlane3);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane4) {
            //cc.log('zhixing111111');
            this.player = cc.instantiate(this.heroPlane4);
            //cc.log(player);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane5) {
            this.player = cc.instantiate(this.heroPlane5);
        }

        this.node.addChild(this.player);
        this.player.setPosition(0, this.player.getContentSize().height - this.node.getContentSize().height / 2);//(0, -241)

        this.stage = 0;
        this.runStage();

    },
    
//一个敌人被消除就会调用这个函数，所以 enemyCount要先缩减。
    checkNextStage:function() {
        
        this.enemyCount--;
        cc.log("enemyCount  " +  this.enemyCount);

        if(this.enemyCount === 0) {//没有敌机，进入下一stage
            if(this.stage<globalStageData.length-1){//范围内 下一stage 若超出 重复最后的数据
                this.stage++;
            }
            cc.log("stage  " +  this.stage);
            this.runStage();
        }
    },

    runStage() {
        //从全局多维Stage详参中取出当前Stage的数据
        //cc.log(globalStageData);
        // globalStageData[stage],
        //var zzz = [50, 100, 150, 200, 250, 300],
        var zzz = new Array();    
        zzz[0] = 0 ;   
        zzz[1] = 70 ;    
        zzz[2] = -70 ; 
        zzz[3] = 140 ; 
        zzz[4] = -140 ; 
        var yzzz = new Array();
        yzzz[0] = 180 ;   
        yzzz[1] = 220 ;    
        yzzz[2] = 260 ; 
        yzzz[3] = 140 ; 
        yzzz[4] = 140 ; 
       // zzz[5] = 300 ; 
        this.enemyCount = globalStageData[this.stage].length;
   
        var enemy;
       // cc.log(" globalStageData[this.stage].length  " +  globalStageData[this.stage].length);
        for (var i = 0; i < globalStageData[this.stage].length; i++) {
            var enemyID = globalStageData[this.stage][i].enemyID;
          //  cc.log(" enemyID  " + enemyID);
            if (enemyID === 0) {
                enemy = cc.instantiate(this.enemyPlane0);
            } else if (enemyID === 1) {
                enemy = cc.instantiate(this.enemyPlane1);
            }
            else if (enemyID === 2) {
                enemy = cc.instantiate(this.enemyPlane2);
            }
            else if (enemyID === 3) {
                enemy = cc.instantiate(this.enemyPlane3);
            }
            else if (enemyID === 4) {
                enemy = cc.instantiate(this.enemyPlane4);
            }

            enemy.getComponent("enemy").enemyID = enemyID;
            enemy.getComponent("enemy").blood = globalEnemyPlaneData[enemyID].blood;
            enemy.getComponent("enemy").shootingSpeed = globalEnemyPlaneData[enemyID].shootingSpeed;
            enemy.getComponent("enemy").flyingSpeed = globalEnemyPlaneData[enemyID].flyingSpeed;
            enemy.getComponent("enemy").bulletType = globalEnemyPlaneData[enemyID].bulletType;
            enemy.getComponent("enemy").damage = globalEnemyPlaneData[enemyID].damage;
            enemy.getComponent("enemy").dropProbability = globalEnemyPlaneData[enemyID].dropProbability;
            enemy.getComponent("enemy").fallingObject = globalEnemyPlaneData[enemyID].fallingObject;
            enemy.getComponent("enemy").enemyID = globalEnemyPlaneData[enemyID].enemyID;
            this.node.addChild(enemy);
        

          enemy.setPosition(0, 380);
        //enemy.setPosition(0, 320);
         
           
           var pos = enemy.getPosition();
           pos.x = zzz[i];
           pos.y = yzzz[i];
           var callback = cc.callFunc(enemy.getComponent("enemy").enterCallback, enemy.getComponent("enemy"));
           //var seq = cc.sequence(cc.moveTo(10, cc.Vec2(zzz[i],200)), callback);//代码有问题 不知道为什么 cc.Vec2用法不对？
           //var seq = cc.sequence(cc.moveTo(this.enemyMoveTime, pos), callback);
           var seq = cc.sequence(cc.moveTo(1, pos).easing(cc.easeIn(3.0)), callback);
           enemy.runAction(seq);
    
            
        }

    },
    generatePrize:function(enemyID,prizePosition) {
        var r = Math.random();
        cc.log("random dropProbability  " + r);
        if (r <= globalEnemyPlaneData[enemyID].dropProbability) {
            let pf = null;
            switch (globalEnemyPlaneData[enemyID].fallingObject) {
                case generateType.jinbi:
                    cc.log("jinbi!");
                     pf = cc.instantiate(this.prizeJinBi);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.jinbi;
                    break;
                case generateType.wudichongci:
                    cc.log("wudichongci!");
                     pf = cc.instantiate(this.prizeWuDiChongCi);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.wudichongci;
                    break;
                case generateType.xinjiaxue:
                    cc.log("xinjiaxue!");
                     pf = cc.instantiate(this.prizeXinJiaXue);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.xinjiaxue;
                    break;
                case generateType.jisushesu:
                    cc.log("jisushesu!");
                     pf = cc.instantiate(this.prizeJiSuSheSu);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.jisushesu;
                    break;
                case generateType.huojianpao:
                    cc.log("huojianpao!");
                     pf = cc.instantiate(this.prizeHuoJianPao);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.huojianpao;
                    break;
            }
            //写在这里则所有奖品的动画都是一样的，将来可能要分别实现
            pf.runAction(cc.moveTo(5,this.player.getPosition()));

        //     let jumpDuration = 5;
        //     //let jumpHeight = 50;
        //     let down = -50;

            
        //    // let jumpUp = cc.moveTo(jumpDuration, cc.p(0, pf.getPosition().y+jumpHeight));
        //     let jumpDown = cc.moveBy(jumpDuration, cc.p(0, down));
        //     //let seq1 = cc.sequence(jumpUp, jumpDown);
    
        //     let moveRight = cc.moveTo(jumpDuration/2, cc.p(-this.node.width/2+pf.width/2, pf.getPosition().y));
        //     let moveLeft = cc.moveTo(jumpDuration/2, cc.p(this.node.width/2-pf.width/2    , pf.getPosition().y));
        //     let seq2 = cc.sequence(moveRight, moveLeft);
    
        //     let sp1 = cc.spawn(jumpDown,seq2);
    
        //     pf.runAction(cc.repeatForever(sp1));
           
        }
    },

    getJinBi:function() {
        //cc.log("getJinBi");
        var c = cc.sys.localStorage.getItem('jinBiCount');
       // cc.log("getJinBi --------->"+c);
        var newC = parseInt(c) + globalDropJinBiCount;
       // cc.log("getJinBi --------->"+newC);
        cc.sys.localStorage.setItem('jinBiCount', newC);

    },
    getWuDiChongCi:function() {
        cc.log("getWuDiChongCi");
    },
    getXinJiaXue:function() {
        cc.log("xinjiaxue");
        this.player.getComponent("Player").addBlood();
    },
    getJiSuSheSu:function() {
        cc.log("jisushesu");
        this.player.getComponent("Player").raiseTheSpeedOfFire();
    },
    getHuoJianPao:function() {
        cc.log("huojianpao");
    },

    gameOver() {
        var currentScore = parseInt(this.node.getChildByName("score").getComponent(cc.Label).string);
        var bestScore = cc.sys.localStorage.getItem('bestScore');
        if(currentScore > bestScore) {
            cc.sys.localStorage.setItem('bestScore',currentScore);
        }
        cc.log("best score--> " + cc.sys.localStorage.getItem('bestScore'));
        cc.director.loadScene('end');
    },


    // update (dt) {},
});
