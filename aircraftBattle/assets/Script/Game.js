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
        PrizeHuoJianPao: {
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
    },




    onLoad() {
        var isloaded = cc.sys.localStorage.getItem("isLoaded");
        cc.log("isloaded " + isloaded );
        if(!isloaded) {
            cc.sys.localStorage.setItem('isLoaded', 1);
        } else {
            var countLoaded = parseInt(cc.sys.localStorage.getItem('isLoaded')) +1;
            cc.sys.localStorage.setItem('isLoaded', countLoaded);
            cc.log("第" + countLoaded +"次登陆");
        }

        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //debug绘制
        manager.enabledDebugDraw = true;

        cc._initDebugSetting(cc.DebugMode.INFO);
        cc.log('globalHeroPlaneID  ' + D.globalHeroPlaneID);
        //留个接口，以后根据用户选择来决定HeroPlaneID
        D.globalHeroPlaneID = heroPlaneID.heroPlane2;
        cc.log('globalHeroPlaneID  ' + D.globalHeroPlaneID);

        //根据globalHeroPlaneID来加载不同的预制体
        var player = null;
        if (D.globalHeroPlaneID === heroPlaneID.heroPlane0) {
            player = cc.instantiate(this.heroPlane0);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane1) {
            player = cc.instantiate(this.heroPlane1);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane2) {
            player = cc.instantiate(this.heroPlane2);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane3) {
            player = cc.instantiate(this.heroPlane3);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane4) {
            //cc.log('zhixing111111');
            player = cc.instantiate(this.heroPlane4);
            //cc.log(player);
        }
        else if (D.globalHeroPlaneID === heroPlaneID.heroPlane5) {
            player = cc.instantiate(this.heroPlane5);
        }

        this.node.addChild(player);
        player.setPosition(0, player.getContentSize().height - this.node.getContentSize().height / 2);//(0, -241)

        this.stage = 0;
        this.runStage();

        // this.stage = 1;
        // this.checkStageCount = 0;
        // this.stage1();

        //    this.onDrag();

        // cc.log(this.enemyGroup);
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
           // var tempBloodBar = cc.instantiate(this.bloodBar);
            //cc.log(tempBloodBar);
           // bloodBar.getComponents[0].string = "1222";
           // enemy.getComponent("enemy").bloodBar = tempBloodBar;
           enemy.setPosition(0, 380);
           // enemy.setPosition(100, zzz[i]);
           
           var pos = enemy.getPosition();
           pos.x = zzz[i];
           pos.y = 180;
           var callback = cc.callFunc(enemy.getComponent("enemy").enterCallback, enemy.getComponent("enemy"));
           //var seq = cc.sequence(cc.moveTo(10, cc.Vec2(zzz[i],200)), callback);//代码有问题 不知道为什么 cc.Vec2用法不对？
           var seq = cc.sequence(cc.moveTo(this.enemyMoveTime, pos), callback);
           enemy.runAction(seq);
    
            
        }

//cc.log(enemy);

        //this.node.addChild(enemy);
       // enemy.setPosition(200, zzz[i]);



    },
    generatePrize:function(enemyID,prizePosition) {
        var r = Math.random();
        cc.log("random dropProbability  " + r);
        if (r <= globalEnemyPlaneData[enemyID].dropProbability) {
            switch (globalEnemyPlaneData[enemyID].fallingObject) {
                case generateType.jinbi:
                    cc.log("jinbi!");
                    var jinbiPrefab = cc.instantiate(this.prizeJinBi);
                    this.node.addChild(jinbiPrefab);
                    jinbiPrefab.setPosition(prizePosition);
                    jinbiPrefab.getComponent("prize").prizeType = generateType.jinbi;
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
    },

    getJinBi:function() {
        cc.log("getJinBi")
    },
    getWuDiChongCi:function() {
        cc.log("getWuDiChongCi")
    },
    xinjiaxue:function() {
        cc.log("xinjiaxue")
    },
    jisushesu:function() {
        cc.log("jisushesu")
    },
    huojianpao:function() {
        cc.log("huojianpao")
    },


    stage1() {
        D.enemys.length = 1;
        D.enemys[0] = this.addEnemy1();
        //this.enemys[0] = enemy11;
        //D.enemys[0] = enemy11;
    },

    stage2() {
        D.enemys.splice(0, D.enemys.length);
        D.enemys.length = 2;
        D.enemys[0] = this.addEnemy1();
        D.enemys[1] = this.addEnemy2();


    },

    stage3() {
        cc.log("stage3");
        D.enemys.splice(0, D.enemys.length);
        D.enemys.length = 3;
        D.enemys[0] = this.addEnemy1();
        D.enemys[1] = this.addEnemy2();
        D.enemys[2] = this.addEnemy3();
        //this.enemys[0] = enemy11;
    },

    addEnemy1() {
        var enemy11 = cc.instantiate(this.enemy1);
        this.node.addChild(enemy11);
        enemy11.setPosition(0, 400);
        var pos = enemy11.getPosition();
        pos.x = 0;
        pos.y = 180;

        var callback = cc.callFunc(this.callback1, this);
        var seq = cc.sequence(cc.moveTo(this.enemyMoveTime, pos), callback);

        enemy11.runAction(seq);
        return enemy11;
    },

    callback1() {
        this.schedule(this.bICallback1, this.bulletIntelval, 10000, 0.01);
        //this.scheduleOnce(this.bICallback1, 2);
        var moveRight1 = cc.moveBy(1, cc.p(40, 0));
        var moveLeft1 = cc.moveBy(1, cc.p(-40, 0));
        var moveLeft2 = cc.moveBy(1, cc.p(-40, 0));
        var moveRight2 = cc.moveBy(1, cc.p(40, 0));

        var seq = cc.sequence(moveRight1, moveLeft1, moveLeft2, moveRight2);
        var act = cc.repeatForever(seq);
        D.enemys[0].runAction(act);
    },

    bICallback1: function () {
        // cc.log('在运行');
        var bl = cc.instantiate(this.enemyBullet1);
        //bl.getComponent('bullet1').enemys = this.node.parent.enemys;
        this.node.addChild(bl);
        bl.setPosition(D.enemys[0].getPosition().x, D.enemys[0].getPosition().y - this.player.height / 2);

        var pos = bl.getPosition();
        pos.y = -700;
        bl.runAction(cc.moveTo(this.enemyBulletMoveTime, pos));
    },


    addEnemy2() {
        var enemy22 = cc.instantiate(this.enemy2);
        this.node.addChild(enemy22);
        enemy22.setPosition(-100, 400);
        var pos = enemy22.getPosition();
        pos.x = -100;
        pos.y = 220;

        var callback = cc.callFunc(this.callback2, this);
        var seq = cc.sequence(cc.moveTo(this.enemyMoveTime, pos), callback);
        enemy22.runAction(seq);
        return enemy22;
    },

    callback2() {
        this.schedule(this.bICallback2, this.bulletIntelval, 10000, 0.01);

        var moveRight1 = cc.moveBy(1, cc.p(40, 0));
        var moveLeft1 = cc.moveBy(1, cc.p(-40, 0));
        var moveLeft2 = cc.moveBy(1, cc.p(-40, 0));
        var moveRight2 = cc.moveBy(1, cc.p(40, 0));

        var seq = cc.sequence(moveRight1, moveLeft1, moveLeft2, moveRight2);
        var act = cc.repeatForever(seq);
        D.enemys[1].runAction(act);
    },

    bICallback2: function () {

        var bl = cc.instantiate(this.enemyBullet2);

        this.node.addChild(bl);
        bl.setPosition(D.enemys[1].getPosition().x, D.enemys[1].getPosition().y - this.player.height / 2);

        //var pos = this.player.getPosition();

        //bl.runAction(cc.moveTo(this.enemyBulletMoveTime, pos));
    },

    addEnemy3() {
        var enemy33 = cc.instantiate(this.enemy3);
        this.node.addChild(enemy33);
        enemy33.setPosition(100, 400);
        var pos = enemy33.getPosition();
        pos.x = 100;
        pos.y = 140;

        var callback = cc.callFunc(this.callback3, this);
        var seq = cc.sequence(cc.moveTo(this.enemyMoveTime, pos), callback);
        enemy33.runAction(seq);
        return enemy33;
    },

    callback3() {
        this.schedule(this.bICallback3, this.bulletIntelval, 10000, 0.01);


        // var moveRight1 = cc.moveBy(1,cc.p(40,0));
        // var moveLeft1  = cc.moveBy(1,cc.p(-40,0));
        // var moveLeft2  = cc.moveBy(1,cc.p(-40,0));
        // var moveRight2  = cc.moveBy(1,cc.p(40,0));

        // var seq = cc.sequence(moveRight1, moveLeft1,moveLeft2,moveRight2);
        // var act = cc.repeatForever(seq);
        // D.enemys[2].runAction(act);
    },

    bICallback3: function () {



        var bl = cc.instantiate(this.enemyBullet3);


        this.node.addChild(bl);
        bl.setPosition(D.enemys[2].getPosition().x, D.enemys[2].getPosition().y - this.player.height / 2);

        var positionX = bl.getPosition().x;
        var positionY = bl.getPosition().y;
        var playerPosition = this.player.getPosition();
        var vecX = playerPosition.x - positionX;
        var vecY = playerPosition.y - positionY;
        var s = Math.sqrt(vecX * vecX + vecY * vecY);
        var t = s / bl.getComponent('enemyBullet3').speed;
        bl.getComponent('enemyBullet3').aX = vecX / t;
        bl.getComponent('enemyBullet3').bY = vecY / t;
    },


    test() {
        cc.log("ttttt");
    },
    start() {

    },
    checkStage: function () {
        this.checkStageCount++;
        switch (this.stage) {
            case 1:
                if (this.checkStageCount >= 1) {

                    this.stage = 2;
                    this.checkStageCount = 0;
                    this.stage2();
                }
                break;
            case 2:
                if (this.checkStageCount >= 2) {

                    this.stage = 3;
                    this.checkStageCount = 0;
                    this.stage3();
                }
                break;
            case 3:
                if (this.checkStageCount >= 3) {

                    this.stage = 3;
                    this.checkStageCount = 0;
                    this.stage3();
                }
                break;
        }
    },

    gameOver() {

        cc.director.loadScene('end');
    },


    // update (dt) {},
});
