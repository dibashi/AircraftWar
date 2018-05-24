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


var globalJiSuTiSu = require("enemyPlaneDatas").jiSuTiSu;
var globalJiSuTime = require("enemyPlaneDatas").jiSuTime;


    
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
            type: cc.Prefab,
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


        prizeTeXiao: {
            default: null,
            type: cc.Prefab,
        },

        // teXiao:null,
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

        enemyCount: -1,//存储当前游戏的敌机个数，来实现stage切换。
        player: null,
        //无敌骨骼动画
        // wudiTeXiao:null,

        bombSprite: cc.Node,
        bombNo: 0,
        bombLabel: cc.Label,

        shieldSprite: cc.Node,
        shieldNo: 0,
        shieldLabel: cc.Label,

        touchBeginPoint: null,
        touchMovePoint: null,
        //players:null,

        dazhaoPlane: {
            default: null,
            type: cc.Prefab,
        },
        dazhaoPlanes: null,
    },




    onLoad() {

        cc.sys.localStorage.setItem('killedEnemyCount',0);

        let wx = cc.director.getVisibleSize().width * 0.5;
        let hy = cc.director.getVisibleSize().height * 0.5;

        let newRecordLabel = this.node.getChildByName("score").getChildByName("newRecord");
        newRecordLabel.active = false;
        this.node.getChildByName("score").setPosition(0, hy - 30 - newRecordLabel.getContentSize().height - this.node.getChildByName("score").getContentSize().height / 2);//锚点0.5  0.5
  

        let sjbw = this.node.getChildByName("kuangti_jinbi").getContentSize().width;
        let sjbh = this.node.getChildByName("kuangti_jinbi").getContentSize().height;
        
        this.node.getChildByName("kuangti_jinbi").setPosition(-wx + sjbw / 2, hy - sjbh / 2);

        this.node.getChildByName("score").setLocalZOrder(100);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //debug绘制
        // manager.enabledDebugDraw = true;

        cc._initDebugSetting(cc.DebugMode.INFO);


        //根据globalHeroPlaneID来加载不同的预制体
        //var player = null;
        let dddd = cc.sys.localStorage.getItem('globalHeroPlaneID');
        D.globalHeroPlaneID = dddd;
        if (dddd == heroPlaneID.heroPlane0) {
            this.player = cc.instantiate(this.heroPlane0);
        }
        else if (dddd == heroPlaneID.heroPlane1) {
            this.player = cc.instantiate(this.heroPlane1);
        }
        else if (dddd == heroPlaneID.heroPlane2) {
            this.player = cc.instantiate(this.heroPlane2);
        }
        else if (dddd == heroPlaneID.heroPlane3) {
            this.player = cc.instantiate(this.heroPlane3);
        }
        else if (dddd == heroPlaneID.heroPlane4) {
            //cc.log('zhixing111111');
            this.player = cc.instantiate(this.heroPlane4);
            //cc.log(player);
        }
        else if (dddd == heroPlaneID.heroPlane5) {
            this.player = cc.instantiate(this.heroPlane5);
        }



        this.node.addChild(this.player);
        this.player.setPosition(0, this.player.getContentSize().height - this.node.getContentSize().height / 2);//(0, -241)

        this.stage = 0;
        this.runStage();

        this.bombNo = 0;
        this.bombSprite.on('touchstart', this.bombOnclick, this);//这个精灵旋转过了，所以长宽不好说
        this.bombLabel.string = this.bombNo;
        this.bombSprite.setPosition(wx - this.bombSprite.getContentSize().width/2, -hy + this.bombSprite.getContentSize().height/2);

        this.shieldNo = 0;
        this.shieldSprite.on('touchstart', this.shieldOnclick, this);//这个精灵旋转过了，所以长宽不好说
        this.shieldLabel.string = this.shieldNo;
        this.shieldSprite.setPosition(-wx + this.shieldSprite.getContentSize().width/2, -hy + this.shieldSprite.getContentSize().height/2);



        // this.players = new Array();
        // for(let i = 0; i<10; i++) {
        //     this.players[i] = cc.instantiate(this.heroPlane0);
        // }   
        this.node.on('touchmove', this.dragMove, this);
        this.node.on('touchstart', this.dragStart, this);

    },

    dragStart: function (event) {
        // cc.log("game dragStart");
        this.touchBeginPoint = event.getLocation();
    },

    dragMove: function (event) {
        //cc.log("game dragMove");
        this.touchMovePoint = event.getLocation();
        let dx = this.touchMovePoint.x - this.touchBeginPoint.x;
        let dy = this.touchMovePoint.y - this.touchBeginPoint.y;

        let location = this.player.getPosition();

        location.x += dx;
        location.y += dy;

        //飞机不移出屏幕 
        let minX = -this.node.width / 2;
        let maxX = -minX;
        let minY = -this.node.height / 2;
        let maxY = -minY;
        if (location.x < minX) {
            location.x = minX;
        }
        if (location.x > maxX) {
            location.x = maxX;
        }
        if (location.y < minY) {
            location.y = minY;
        }
        if (location.y > maxY) {
            location.y = maxY;
        }

        this.player.setPosition(location);

        this.touchBeginPoint = this.touchMovePoint;

    },

    bombOnclick: function () {


        if (this.bombNo > 0) {
            this.bombLabel.string = this.bombNo - 1;
            this.bombNo -= 1;
            //全屏炸，该功能已删除
            // let cs = this.node.children;
            // let cc = this.node.childrenCount;
            // for (let i = 0; i < cc; i++) {
            //     if (this.node.children[i].group === 'enemy') {
            //         this.node.children[i].getComponent('enemy').enemyBoomAni();
            //     }
            // }
            // this.node.addChild(this.player);
            // this.player.setPosition(0, this.player.getContentSize().height - this.node.getContentSize().height / 2);
            // for(let i =0 ;  i< this.players.length; i++) {
            //     this.node.addChild(this.players[i]);
            // }

            //必须让按钮先不能点，否则将引发bug！
            this.bombSprite.off('touchstart', this.bombOnclick, this);
            //生成大招飞机，加入game层，设置位置，摆设动画，动画回调继续动画撞击，
            //动画回调，按钮可点击
            //若没敌方飞机，飞出屏幕，回调，按钮可点击
            this.dazhaoPlanes = new Array();
            for (let i = 0; i < 8; i++) {
                this.dazhaoPlanes[i] = cc.instantiate(this.dazhaoPlane);
                //  cc.log(this.dazhaoPlanes[i]);
                //this.dazhaoPlanes[i].setPosition(-140+70*i,-250);
                this.node.addChild(this.dazhaoPlanes[i]);
                this.dazhaoPlanes[i].setPosition(0, -600);

            }

            this.dazhaoPlanes[0].runAction(cc.moveTo(1.5, cc.v2(-140, -200)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[1].runAction(cc.moveTo(1.5, cc.v2(140, -200)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[2].runAction(cc.moveTo(1.5, cc.v2(-70, -170)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[3].runAction(cc.moveTo(1.5, cc.v2(70, -170)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[4].runAction(cc.moveTo(1.5, cc.v2(0, -140)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[5].runAction(cc.moveTo(1.5, cc.v2(0, -220)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[6].runAction(cc.moveTo(1.5, cc.v2(-70, -250)).easing(cc.easeOut(3.0)));
            this.dazhaoPlanes[7].runAction(cc.moveTo(1.5, cc.v2(70, -250)).easing(cc.easeOut(3.0)));

            this.scheduleOnce(this.dazhaoPlaneOver, 5.0);

            // this.dazhaoPlanes[0].setPosition(-140,-200);
            // this.dazhaoPlanes[1].setPosition(140,-200);

            // this.dazhaoPlanes[2].setPosition(-70,-170);
            // this.dazhaoPlanes[3].setPosition(70,-170);

            // this.dazhaoPlanes[4].setPosition(0,-140);
            // this.dazhaoPlanes[5].setPosition(0,-220);

            // this.dazhaoPlanes[6].setPosition(-70,-250);
            // this.dazhaoPlanes[7].setPosition(70,-250);

            // 3秒后删除集群
        } else {
            console.log('没有子弹');

        }
    },

    dazhaoPlaneOver: function () {
        
        for(let i = 0; i<this.dazhaoPlanes.length;i++) {
            this.dazhaoPlanes[i].runAction(cc.moveTo(1.5, cc.v2(800, 500)).easing(cc.easeIn(3.0)));
            this.dazhaoPlanes[i].getComponent("dazhaoPlane").closeBullet();

            let dx = 800 - this.dazhaoPlanes[i].x;
            let dy = 500 - this.dazhaoPlanes[i].y;
            //cc.log("angel!!!!! ---> ", cc.pToAngle(cc.v2(dx,dy)));
            //this.dazhaoPlanes[i].runAction(cc.rotateBy(0.5,cc.pToAngle(cc.v2(dx,dy))));
            this.dazhaoPlanes[i].runAction(cc.rotateBy(0.5,cc.pToAngle(cc.v2(dx,dy))*180/3.1415926));
        }
        this.scheduleOnce(this.dazhaoButtonEnable,1.6);
        //先不实现这么复杂的逻辑
        // let cs = this.node.children;
        // let cc = this.node.childrenCount;
        // for (let i = 0; i < cc; i++) {
        //     if (this.node.children[i].group === 'enemy') {
        //       //  this.node.children[i].getComponent('enemy').enemyBoomAni();
        //     }
        // }
    },
    dazhaoButtonEnable:function() {
        this.bombSprite.on('touchstart', this.bombOnclick, this);
        for(let i = 0; i<this.dazhaoPlanes.length;i++) {
            this.dazhaoPlanes[i].destroy();
           
        }

        this.dazhaoPlanes = null;
    },

    shieldOnclick: function () {


        if (this.shieldNo > 0) {
            this.shieldLabel.string = this.shieldNo - 1;
            this.shieldNo -= 1;

            let cs = this.node.children;
            let cc = this.node.childrenCount;
            for (let i = 0; i < cc; i++) {
                if (this.node.children[i].group === 'eBullet') {
                    this.node.children[i].getComponent('enemyBullet').bulletToCoinAndRun();
                }
            }

        } else {
            console.log('没有护盾');

        }
    },

    

    //一个敌人被消除就会调用这个函数，所以 enemyCount要先缩减。
    checkNextStage: function () {

        this.enemyCount--;
        cc.log("enemyCount  " + this.enemyCount);

        if (this.enemyCount === 0) {//没有敌机，进入下一stage
            if (this.stage < globalStageData.length - 1) {//范围内 下一stage 若超出 重复最后的数据
                this.stage++;
            }
            cc.log("stage  " + this.stage);
            this.runStage();
        }
    },

    runStage() {
        //从全局多维Stage详参中取出当前Stage的数据
        //cc.log(globalStageData);
        // globalStageData[stage],
        //var zzz = [50, 100, 150, 200, 250, 300],
        let w = cc.director.getVisibleSize().width;
        let h = cc.director.getVisibleSize().height / 2 - this.player.getContentSize().height / 2;

        var zzz = new Array();
        zzz[0] = 0;
        zzz[1] = w / 4;
        zzz[2] = -w / 4;

        var yzzz = new Array();

        yzzz[0] = (h / 5) * 2;
        yzzz[1] = (h / 5) * 3;
        yzzz[2] = (h / 5) * 4;

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

            enemy.getComponent("enemy").bulletTrack = globalEnemyPlaneData[enemyID].bulletTrack;
            enemy.getComponent("enemy").enemyTrack = globalEnemyPlaneData[enemyID].enemyTrack;
            this.node.addChild(enemy);


            enemy.setPosition(0, cc.director.getVisibleSize().height * 0.5 + 100);
            var pos = enemy.getPosition();
            pos.x = zzz[Math.floor(Math.random() * 3)];
            pos.y = yzzz[Math.floor(Math.random() * 3)];
            var callback = cc.callFunc(enemy.getComponent("enemy").enterCallback, enemy.getComponent("enemy"));
            var seq = cc.sequence(cc.moveTo(1, pos).easing(cc.easeIn(3.0)), callback);
            enemy.runAction(seq);

            // let pos = enemy.getPosition();
            // let kkk = 50 + Math.random() * (w - 100);//(50~w-50)
            // pos.x = kkk - (w / 2);//(-w/2+50,w/2-50)
            // let kkk1 = 50 + Math.random() * (h / 2 - 100);//(50~h/2-50)

            // pos.y = kkk1;
            // var callback = cc.callFunc(enemy.getComponent("enemy").enterCallback, enemy.getComponent("enemy"));
            // var seq = cc.sequence(cc.moveTo(1, pos).easing(cc.easeIn(3.0)), callback);

            // enemy.runAction(seq);


        }

    },

    jinbiSanKaiOver: function (pf) {
        pf.getComponent("prize").jinbiRunFlag = true;
    },
    generatePrize: function (enemyID, prizePosition) {
        var r = Math.random();
        cc.log("random dropProbability  " + r);
        if (r <= globalEnemyPlaneData[enemyID].dropProbability) {
            let pf = null;
            switch (globalEnemyPlaneData[enemyID].fallingObject) {
                case generateType.jinbi:
                    cc.log("jinbi!");
                    let jinBiCount = Math.floor(Math.random() * 20);
                    for (let i = 0; i < jinBiCount; i++) {
                        pf = cc.instantiate(this.prizeJinBi);
                        this.node.addChild(pf);
                        pf.setPosition(prizePosition);
                        pf.getComponent("prize").prizeType = generateType.jinbi;
                        //!!先不调用自己的update函数，先自己做一个动作，在动作结束后，再置为true
                        pf.getComponent("prize").jinbiRunFlag = false;
                        let ramPosX = Math.random() * 60;
                        let ramPosY = Math.random() * 60
                        if (Math.random() > 0.5) {
                            ramPosX = -ramPosX;
                        }
                        if (Math.random() > 0.5) {
                            ramPosY = -ramPosY;
                        }
                        let p = cc.v2(pf.getPosition().x + ramPosX, pf.getPosition().y + ramPosY);

                        let act1 = cc.moveTo(1, p).easing(cc.easeOut(3.0));
                        let act2 = cc.callFunc(this.jinbiSanKaiOver, this, pf);
                        pf.runAction(cc.sequence(act1, act2));

                    }


                    break;
                case generateType.wudichongci:
                    cc.log("wudichongci!");
                    pf = cc.instantiate(this.prizeWuDiChongCi);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.wudichongci;
                    pf.runAction(cc.moveTo(5, this.player.getPosition()));
                    break;
                case generateType.xinjiaxue:
                    cc.log("xinjiaxue!");
                    pf = cc.instantiate(this.prizeXinJiaXue);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.xinjiaxue;
                    pf.runAction(cc.moveTo(5, this.player.getPosition()));
                    break;
                case generateType.jisushesu:
                    cc.log("jisushesu!");
                    pf = cc.instantiate(this.prizeJiSuSheSu);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.jisushesu;
                    pf.runAction(cc.moveTo(5, this.player.getPosition()));
                    break;
                case generateType.huojianpao:
                    cc.log("huojianpao!");
                    pf = cc.instantiate(this.prizeHuoJianPao);
                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.huojianpao;
                    pf.runAction(cc.moveTo(5, this.player.getPosition()));
                    break;
            }
            //写在这里则所有奖品的动画都是一样的，将来可能要分别实现


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

    generateJinBi: function (pos) {
        let pf = cc.instantiate(this.prizeJinBi);
        this.node.addChild(pf);
        pf.setPosition(pos);
        pf.getComponent("prize").prizeType = generateType.jinbi;

    },


    getJinBi: function () {
    
        var c = cc.sys.localStorage.getItem('jinBiCount');
     
        var newC = parseInt(c) + globalDropJinBiCount;
      
        cc.sys.localStorage.setItem('jinBiCount', newC);

        let jinbilabel = this.node.getChildByName("kuangti_jinbi").getChildByName("jinbi").getComponent(cc.Label);

        jinbilabel.string = parseInt(jinbilabel.string) + globalDropJinBiCount;

    },
    // getWuDiChongCi:function() {
    //     cc.log("getWuDiChongCi");

    // },
    getHuoJianPao: function () {
        this.bombNo += 1;
        this.bombLabel.string = this.bombNo;
    },

    getShield: function () {
        this.shieldNo += 1;
        this.shieldLabel.string = this.shieldNo;
    },




    gameOver() {
        var currentScore = parseInt(this.node.getChildByName("score").getComponent(cc.Label).string);
        var bestScore = cc.sys.localStorage.getItem('bestScore');
        if (currentScore > bestScore) {
            cc.sys.localStorage.setItem('bestScore', currentScore);
        }
        cc.log("best score--> " + cc.sys.localStorage.getItem('bestScore'));
        cc.sys.localStorage.setItem("currentScore",currentScore);
        cc.director.loadScene('end');
    },


    addScore(fenshu) {
        let fs = fenshu + parseInt(this.node.getChildByName("score").getComponent(cc.Label).string);
        this.node.getChildByName("score").getComponent(cc.Label).string = fs;
        if (fs > cc.sys.localStorage.getItem('bestScore')) {
            this.node.getChildByName("score").getChildByName("newRecord").active = true;
        }
    },


    // update (dt) {},
});
