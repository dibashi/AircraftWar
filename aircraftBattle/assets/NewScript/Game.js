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

        enemyPlane5: {
            default: null,
            type: cc.Prefab,
        },

        enemyPlane6: {
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

        stage: 0, //数据表中第几层
        realStage: 0,//真实的层数，消灭一次加一层 用于增加敌机属性  6.14需求变了 真实轮数
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
        dazhaoPlanes1: null,

        fireBoost: {
            default: null,
            type: cc.Node,
        },

        roundX: {
            default: null,
            type: cc.Node,
        },

        settingButton: null,

        // soundSetting: {
        //     default: null,
        //     type: cc.Prefab,
        // },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        warningAni: {
            default: null,
            type: cc.Prefab,
        },

        baozouWenZi: {
            default: null,
            type: cc.Prefab,
        },

        baozouAni: null,

        baozouHuDun: {
            default: null,
            type: cc.Prefab,
        },
        baozouHuDunAni: null,

        huDunTeXiao: {
            default: null,
            type: cc.Prefab,
        },
        hudunPartice: null,

        baozouFlag: false,//当前是否暴走，在大招里面释放

        baozouInterval: 0,//暴走效果间隔

        baozouPossession: 0.0,//暴走持续时间 比大招的5秒稍长点

        sself: null,

        lifeLabel: {
            default: null,
            type: cc.Node,
        },//label外的node

        spriteLife: {
            default: null,
            type: cc.Node,
        },//label外的node

        jinbiPool: null,
        hudunPool: null,
        jisuPool: null,
        dazhaoPool: null,
        jinbiPoolSize: 30,
        hudunPoolSize: 3,
        jisuPoolSize: 5,
        dazhaoPoolSize: 3,

        shoujiPool: null,
        shoujiPoolSize: 15,
        //为了性能做成成员变量
        coinLabel: null,
        defenLabel: null,



        backGround: {
            default: null,
            type: cc.Node
        },

        //摧毁敌机数，也就是现在的分数 
        fenshu: 0,
        //为了性能做的 最优分数缓存，

        bestScore: 0,
        newRecord: null,

        //用这个变量来记录本局获得的金币数量。
        _jinBiCount: 0,


        //复活弹窗
        reviveAlert: {
            default: null,
            type: cc.Prefab,
        },

        UIZorder: 50,//UI层的Z序

        isPause: false,//这个变量很重要，标记游戏是否暂停，它在很多页面都有引用，只在Game.js中可以修改它的值

        singleColor: {
            default: null,
            type: cc.Node,
        },

        pauseBtn: {
            default: null,
            type: cc.Node,
        },

        resumeBtn: {
            default: null,
            type: cc.Node,
        },

        coinDropBox: {
            default: null,
            type: cc.Node,
        },

        preColliderRadius: 20,

        shoujiAniPre: {
            default: null,
            type: cc.Prefab,
        },

        singleTouchID: -1,//这个变量来觉得那些touch事件处理，用来关闭多点触摸

        //两个东西 1个遮罩 一个 小飞机图标  两个根据stage来往上走，遮罩改变高度，飞机改变Y坐标
        distanceMask: {
            default: null,
            type: cc.Node,
        },

        planeIcon: {
            default: null,
            type: cc.Node,
        },
        //原始的遮罩高度，用于计算
        maskOriginHeight: 0,
        planeIconY: 0,


        progressNode: {
            default: null,
            type: cc.Node,
        },

    },




    onLoad() {
        //广告复活标记
        cc.sys.localStorage.setItem("GuangGaoFuhuoFlag", 1);//可以广告复活

        //暂停的黑底纹  先扔一边  
        this.singleColor.setPosition(10000, 10000);
        this.pauseBtn.setPosition(314, 521);
        this.resumeBtn.setPosition(10000, 10000);

        this.singleColor.setLocalZOrder(101);
        this.pauseBtn.setLocalZOrder(102);
        this.resumeBtn.setLocalZOrder(102);




        this.jinbiPoolSize = 50;
        this.hudunPoolSize = 3;
        this.jisuPoolSize = 5;
        this.dazhaoPoolSize = 3;

        this.shoujiPoolSize = 15;

        this.baozouInterval = 35;
        this.baozouPossession = 7;


        cc.sys.localStorage.setItem('killedEnemyCount', 0);

        let wx = cc.director.getVisibleSize().width * 0.5;
        let hy = cc.director.getVisibleSize().height * 0.5;

        let newRecordLabel = this.node.getChildByName("score").getChildByName("newRecord");
        newRecordLabel.active = false;
        this.node.getChildByName("score").setPosition(0, hy - 30 - newRecordLabel.getContentSize().height - this.node.getChildByName("score").getContentSize().height / 2);//锚点0.5  0.5

        let jinbiKuangTi = null;
        jinbiKuangTi = this.node.getChildByName("kuangti_jinbi");
        let sjbw = jinbiKuangTi.getContentSize().width;
        let sjbh = jinbiKuangTi.getContentSize().height;

        jinbiKuangTi.setPosition(-wx + jinbiKuangTi.getContentSize().width / 2, hy - 10 - (jinbiKuangTi.getContentSize().height / 2));

        //金币不显示 
        // this.node.getChildByName("kuangti_jinbi").active = false;

        this.node.getChildByName("score").setLocalZOrder(100);


        // this.settingButton = this.node.getChildByName("soundSetting");
        // this.settingButton.setPosition(this.settingButton.getContentSize().width / 2 - wx, hy - sjbh - 10 - (this.settingButton.getContentSize().height / 2));



        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //    debug绘制
        //    manager.enabledDebugDraw = true;

        cc._initDebugSetting(cc.DebugMode.INFO);


        //根据globalHeroPlaneID来加载不同的预制体
        //var player = null;
        let dddd = cc.sys.localStorage.getItem('globalHeroPlaneID');
        if (dddd == null) {
            dddd = 0;
        }
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

            this.player = cc.instantiate(this.heroPlane4);

        }
        else if (dddd == heroPlaneID.heroPlane5) {
            this.player = cc.instantiate(this.heroPlane5);
        }



        // //适配生命条
        // moBanSprite.scale = 60/moBanSprite.getContentSize().height;
        // moBanSprite.setPosition(-moBanSprite.getContentSize().width*moBanSprite.scale*0.5,-hy+moBanSprite.getContentSize().height*moBanSprite.scale*0.5);

        //  this.spriteLife.setPosition(-wx + this.spriteLife.getContentSize().width / 2, hy - sjbh - 10 - (this.spriteLife.getContentSize().height / 2));
        this.spriteLife.setPosition(jinbiKuangTi.getPosition().x + jinbiKuangTi.getContentSize().width / 2 + this.spriteLife.getContentSize().width / 2 + 10, jinbiKuangTi.getPosition().y);

        this.spriteLife.setLocalZOrder(this.UIZorder);

        this.lifeLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('planeLifeCount');


        this.node.addChild(this.player);
        this.player.setPosition(0, this.player.getContentSize().height - this.node.getContentSize().height / 2);//(0, -241)


        this.bombNo = parseInt(cc.sys.localStorage.getItem('dazhaoCount'));
        this.bombSprite.on('touchstart', this.bombOnclick, this);
        this.bombSprite.on('touchmove', this.bombOnclickMove, this);
        this.bombLabel.string = this.bombNo;
        //this.bombSprite.setPosition(wx - this.bombSprite.getContentSize().width/2, -hy + this.bombSprite.getContentSize().height/2);

        this.bombSprite.setPosition(-wx + this.bombSprite.getContentSize().width * this.bombSprite.scale * 0.5, -hy + this.bombSprite.getContentSize().height * this.bombSprite.scale * 0.5);


        this.bombSprite.setLocalZOrder(this.UIZorder);

        this.shieldNo = parseInt(cc.sys.localStorage.getItem('hudunCount'));

    
        this.shieldLabel.string = this.shieldNo;
        this.shieldSprite.setPosition(wx - this.shieldSprite.getContentSize().width * this.shieldSprite.scale * 0.5, -hy + this.shieldSprite.getContentSize().height * this.shieldSprite.scale * 0.5);

        this.shieldSprite.setLocalZOrder(this.UIZorder);

        this.shieldSprite.on('touchstart', this.shieldOnclick, this);
        this.shieldSprite.on('touchmove', this.shieldOnclickMove, this);


        this.node.on('touchmove', this.dragMove, this);
        this.node.on('touchstart', this.dragStart, this);
        this.node.on('touchend', this.drageEnd, this);

        // this.goBaoZou();

        this.goNewBaoZou();


        // this.node.runAction(cc.rotateTo(10,90));


      



        //奖品池
        this.jinbiPool = new cc.NodePool();
        for (let i = 0; i < this.jinbiPoolSize; i++) {
            let bl = cc.instantiate(this.prizeJinBi);
            this.jinbiPool.put(bl);
        }

        this.hudunPool = new cc.NodePool();
        for (let i = 0; i < this.hudunPoolSize; i++) {
            let bl = cc.instantiate(this.prizeWuDiChongCi);
            this.hudunPool.put(bl);
        }
        this.jisuPool = new cc.NodePool();
        for (let i = 0; i < this.jisuPoolSize; i++) {
            let bl = cc.instantiate(this.prizeJiSuSheSu);
            this.jisuPool.put(bl);
        }
        this.dazhaoPool = new cc.NodePool();
        for (let i = 0; i < this.dazhaoPoolSize; i++) {
            let bl = cc.instantiate(this.prizeHuoJianPao);
            this.dazhaoPool.put(bl);
        }

        this.shoujiPool = new cc.NodePool();
        for (let i = 0; i < this.shoujiPoolSize; i++) {
            let bl = cc.instantiate(this.shoujiAniPre);
            bl.getComponent("shoujiAniJS")._shoujiPool = this.shoujiPool;
            bl.getComponent("shoujiAniJS")._shoujiPoolSize = this.shoujiPoolSize;
            this.shoujiPool.put(bl);
        }


        this.coinLabel = this.node.getChildByName("kuangti_jinbi").getChildByName("jinbi").getComponent(cc.Label);
        this.coinLabel.string = "0";

        this.defenLabel = this.node.getChildByName("score").getComponent(cc.Label);

        this.bestScore = parseInt(cc.sys.localStorage.getItem('bestScore'));
        this.newRecord = this.node.getChildByName("score").getChildByName("newRecord");




        //之前碰撞体积
        this.preColliderRadius = 20;
        this.player.getComponent(cc.CircleCollider).radius = this.preColliderRadius;


        this.maskOriginHeight = this.distanceMask.height;
        this.planeIconY = this.planeIcon.getPosition().y;



        this.stage = 0;
        this.realStage = 0;
        this.runStage();

    },

    goNewPlane: function () {
        //从飞机生命数中扣除1辆
        //创建 飞入 然后可以操作
        let lifeCount = parseInt(cc.sys.localStorage.getItem('planeLifeCount'));
        if (lifeCount > 0) { //等于0的话 还能复活 说明是点了复活按钮 不能再扣生命值了 否则用户下次买了 还填不满这坑
            lifeCount = lifeCount - 1;
            cc.sys.localStorage.setItem('planeLifeCount', lifeCount);
        }



        // let lifeLabel =  this.node.getChildByName("lifeLabel");
        this.lifeLabel.getComponent(cc.Label).string = lifeCount;


        let dddd = cc.sys.localStorage.getItem('globalHeroPlaneID');
        if (dddd == null) {
            dddd = 0;
        }


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
            this.player = cc.instantiate(this.heroPlane4);
        }
        else if (dddd == heroPlaneID.heroPlane5) {
            this.player = cc.instantiate(this.heroPlane5);
        }
        this.node.addChild(this.player);
        this.player.setPosition(0, -500);


        let seq = cc.sequence(cc.moveTo(0.8, cc.v2(0, 50 + this.player.getContentSize().height - this.node.getContentSize().height / 2)).easing(cc.easeOut(3.0)), cc.callFunc(this.newPlaneMoved, this));
        this.player.runAction(seq);

        this.getShield();

    },

    newPlaneMoved: function () {

        this.goNewBaoZou();
    },

    goNewBaoZou: function () {
        this.unschedule(this.newBaozouProcessing);
        this.schedule(this.newBaozouProcessing, this.baozouInterval);
    },



    renewBaoZou: function () {
        this.unschedule(this.baozouProcessing);
    },

  

    bazouWenZidOver: function () {
        this.baozouAni.destroy();
    },


    newBaozouProcessing: function () {

        //开始暴走！ 1，暴走提示动画，2，玩家飞机属性更改，3，大招释放，4，定时器关闭暴走。
        // 1
        // let anim = this.baozouWenZi.getComponent(cc.Animation);
        // anim.play();//可能还要加入别的特效，在暴走结束时关闭

        this.baozouAni = cc.instantiate(this.baozouWenZi);
        let armatureDisplay = this.baozouAni.getComponent(dragonBones.ArmatureDisplay);

        armatureDisplay.playAnimation("baozou");

        this.node.addChild(this.baozouAni);
        armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.bazouWenZidOver, this);

        this.baozouHuDunAni = cc.instantiate(this.baozouHuDun);
        let armatureDisplay1 = this.baozouHuDunAni.getComponent(dragonBones.ArmatureDisplay);

        armatureDisplay1.playAnimation("chongci");

        this.player.addChild(this.baozouHuDunAni);



        //1 调用player保存当前状态。

        //   this.player.getComponent("Player").savePlayerState();
        //  this.player.getComponent("Player").baozouState();
        this.player.getComponent("Player").cuzidan();
        //2关闭所有子弹
        //   this.player.getComponent("Player").closeAllBullet();
        //3提高背景速度

        this.backGround.getComponent("background").speedFactor = 9;
        this.backGround.getComponent("background").speedYUNFactor = 13;

        // 4 标记暴走状态 飞机若和敌机相撞 则逻辑改变标记
        this.baozouFlag = true;

        // 5 设置暴走结束时刻 以及回调
        this.scheduleOnce(this.closeBaozou, this.baozouPossession);
    },

    newCoinBaozouProcessing: function () {
        this.baozouHuDunAni = cc.instantiate(this.baozouHuDun);
        let armatureDisplay1 = this.baozouHuDunAni.getComponent(dragonBones.ArmatureDisplay);
        armatureDisplay1.playAnimation("chongci");
        this.player.addChild(this.baozouHuDunAni);

        //1 调用player保存当前状态。
        this.player.getComponent("Player").savePlayerState();

        //2关闭所有子弹
        this.player.getComponent("Player").closeAllBullet();

        //3提高背景速度
        this.backGround.getComponent("background").speedFactor = 9;
        this.backGround.getComponent("background").speedYUNFactor = 13;

        // 4 标记暴走状态 飞机若和敌机相撞 则逻辑改变标记
        this.baozouFlag = true;

    },


    closeCoinBaozou: function () {
        cc.log("closeCoinBaozou");
        this.baozouHuDunAni.destroy();
        this.backGround.getComponent("background").speedFactor = 1;
        this.backGround.getComponent("background").speedYUNFactor = 1;

        this.player.getComponent("Player").repairPlayerState();


        this.baozouFlag = false;

    },




    //关闭暴走
    closeBaozou: function () {
        //1 关闭 暴走的那些特效， 现在还不清楚
        //2 恢复飞机属性
        //   this.player.getComponent("Player").repairPlayerState();
        this.player.getComponent("Player").xizidan();
        if (this.baozouHuDunAni != null) {

            this.baozouHuDunAni.destroy();
            this.baozouHuDunAni = null;
        }


        this.backGround.getComponent("background").speedFactor = 1;
        this.backGround.getComponent("background").speedYUNFactor = 1;
        this.baozouFlag = false;
        //3 应该没了
    },

    drageEnd: function (event) {
        if (event.getID() == this.singleTouchID) {
            this.singleTouchID = -1;//-1标记可以再触摸
        }
    },

    dragStart: function (event) {
        if (this.singleTouchID == -1) {
            this.singleTouchID = event.getID();
        } else {
            //已经被触摸设置了，那就不处理
            return;
        }
        this.touchBeginPoint = event.getLocation();
    },

    dragMove: function (event) {

        if (this.player == null || this.player._position == null) {
            return;
        }

        if (event.getID() != this.singleTouchID) {
            return;
        }

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

    hongzha: function () {

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
    },


    hongzha1: function () {
        //必须让按钮先不能点，否则将引发bug！
        this.bombSprite.off('touchstart', this.bombOnclick, this);
        //生成大招飞机，加入game层，设置位置，摆设动画，动画回调继续动画撞击，
        //动画回调，按钮可点击
        //若没敌方飞机，飞出屏幕，回调，按钮可点击
        this.dazhaoPlanes1 = new Array();
        for (let i = 0; i < 8; i++) {
            this.dazhaoPlanes1[i] = cc.instantiate(this.dazhaoPlane);

            this.node.addChild(this.dazhaoPlanes1[i]);
            this.dazhaoPlanes1[i].setPosition(0, -600);

        }

        this.dazhaoPlanes1[0].runAction(cc.moveTo(1.5, cc.v2(-140, -200)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[1].runAction(cc.moveTo(1.5, cc.v2(140, -200)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[2].runAction(cc.moveTo(1.5, cc.v2(-70, -170)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[3].runAction(cc.moveTo(1.5, cc.v2(70, -170)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[4].runAction(cc.moveTo(1.5, cc.v2(0, -140)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[5].runAction(cc.moveTo(1.5, cc.v2(0, -220)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[6].runAction(cc.moveTo(1.5, cc.v2(-70, -250)).easing(cc.easeOut(3.0)));
        this.dazhaoPlanes1[7].runAction(cc.moveTo(1.5, cc.v2(70, -250)).easing(cc.easeOut(3.0)));

        this.scheduleOnce(this.dazhaoPlaneOver1, 5.0);
    },

    shieldOnclick:function(e) {
        cc.log("hudun touch");
        e.stopPropagation();
        if (this.shieldNo > 0) {
            this.shieldLabel.string = this.shieldNo - 1;
            this.shieldNo -= 1;
            cc.sys.localStorage.setItem('hudunCount', this.shieldNo);

            
            if(this.player) {
                this.player.getComponent("Player").hasHuDun = true;
                this.hudunAniBofang();
            }
            this.scheduleOnce(this.hudunOver, 3.0);
        } else {
            console.log('没有护盾');

        }
    },


    hudunAniBofang:function() {
         //必须让按钮先不能点，否则将引发bug！
         this.shieldSprite.off('touchstart', this.shieldOnclick, this);
         this.hudunPartice = cc.instantiate(this.huDunTeXiao);
         let armatureDisplay = this.hudunPartice.getComponent(dragonBones.ArmatureDisplay);
         armatureDisplay.playAnimation("hudun");
         this.player.addChild(this.hudunPartice);
         this.hudunPartice.setPosition(cc.v2(0, 0));    
    },

    hudunOver:function() {
        //1 不无敌了
        //2 护盾删除
        //3 可以触摸按钮了
        this.player.getComponent("Player").hasHuDun = false;
        if(this.hudunPartice) {
            this.hudunPartice.destroy();
        }

        this.shieldSprite.on('touchstart', this.shieldOnclick, this);

    },

    shieldOnclickMove:function(e) {
        e.stopPropagation();
    },

    //大招启动
    bombOnclick: function (e) {
        cc.log("bomb touch");
        e.stopPropagation();
        if (this.bombNo > 0) {
            this.bombLabel.string = this.bombNo - 1;
            this.bombNo -= 1;
            cc.sys.localStorage.setItem('dazhaoCount', this.bombNo);

            this.hongzha();
        } else {
            console.log('没有子弹');

        }
    },

    bombOnclickMove: function (e) {
        e.stopPropagation();
    },

    dazhaoPlaneOver: function () {

        for (let i = 0; i < this.dazhaoPlanes.length; i++) {
            this.dazhaoPlanes[i].runAction(cc.moveTo(1.5, cc.v2(800, 500)).easing(cc.easeIn(3.0)));
            this.dazhaoPlanes[i].getComponent("dazhaoPlane").closeBullet();

            let dx = 800 - this.dazhaoPlanes[i].x;
            let dy = 500 - this.dazhaoPlanes[i].y;
            //cc.log("angel!!!!! ---> ", cc.pToAngle(cc.v2(dx,dy)));
            //this.dazhaoPlanes[i].runAction(cc.rotateBy(0.5,cc.pToAngle(cc.v2(dx,dy))));
            this.dazhaoPlanes[i].runAction(cc.rotateBy(0.5, cc.pToAngle(cc.v2(dx, dy)) * 180 / 3.1415926));
        }
        this.scheduleOnce(this.dazhaoButtonEnable, 1.6);
        //先不实现这么复杂的逻辑
        // let cs = this.node.children;
        // let cc = this.node.childrenCount;
        // for (let i = 0; i < cc; i++) {
        //     if (this.node.children[i].group === 'enemy') {
        //       //  this.node.children[i].getComponent('enemy').enemyBoomAni();
        //     }
        // }
    },

    dazhaoPlaneOver1: function () {

        for (let i = 0; i < this.dazhaoPlanes1.length; i++) {
            this.dazhaoPlanes1[i].runAction(cc.moveTo(1.5, cc.v2(800, 500)).easing(cc.easeIn(3.0)));
            this.dazhaoPlanes1[i].getComponent("dazhaoPlane").closeBullet();

            let dx = 800 - this.dazhaoPlanes1[i].x;
            let dy = 500 - this.dazhaoPlanes1[i].y;

            this.dazhaoPlanes1[i].runAction(cc.rotateBy(0.5, cc.pToAngle(cc.v2(dx, dy)) * 180 / 3.1415926));
        }
        this.scheduleOnce(this.dazhaoButtonEnable1, 1.6);

    },

    dazhaoButtonEnable: function () {
        this.bombSprite.on('touchstart', this.bombOnclick, this);
        for (let i = 0; i < this.dazhaoPlanes.length; i++) {
            this.dazhaoPlanes[i].destroy();

        }

        this.dazhaoPlanes = null;
    },

    dazhaoButtonEnable1: function () {
        this.bombSprite.on('touchstart', this.bombOnclick, this);
        for (let i = 0; i < this.dazhaoPlanes1.length; i++) {
            this.dazhaoPlanes1[i].destroy();

        }

        this.dazhaoPlanes1 = null;
    },


    _bulletToCoinAndRun: function () {
        let cs = this.node.children;
        let cc = this.node.childrenCount;
        for (let i = 0; i < cc; i++) {
            if (this.node.children[i].group === 'eBullet') {
                this.node.children[i].getComponent('enemyBullet').bulletToCoinAndRun();
            }
        }
    },

    bulletToShield: function () {

        if (this.baozouFlag) {
            this._bulletToCoinAndRun();
            return;
        }



        // if (this.shieldNo > 0) {
        //     this.shieldLabel.string = this.shieldNo - 1;
        //     this.shieldNo -= 1;
        //     if (this.shieldNo == 0) {
        //         //
        //         this.hudunPartice.destroy();
        //     }


        //     this._bulletToCoinAndRun();

        // } else {
        //     console.log('没有护盾');

        // }
    },



    //一个敌人被消除就会调用这个函数，所以 enemyCount要先缩减。
    checkNextStage: function () {

        this.enemyCount--;
        this.checkcheck();

    },

    warningAniOver:function() {

        this.scheduleOnce(this.runStage,1);

    },

    checkcheck: function () {
        if (this.enemyCount <= 0) {//没有敌机，进入下一stage
            if (this.stage < globalStageData.length - 1) {//范围内 下一stage 若超出 重复最后的数据
                this.stage++;


                this.unschedule(this.runStage);
                if (this.stage == 12) {//把12定义为boss,从0开始计数
                    //0 若有暴走，关闭暴走。若没暴走，暂停暴走 总之，关闭暴走，暂停暴走
                    //0.1
                    //0.2
                    this.closeBaozou();
                    this.goNewBaoZou();
                    //1，预警动画播放
                    //2,预警动画结束回调中 runstage~! 
                    this.warningAni = cc.instantiate(this.warningAni);
                    let armatureDisplay = this.warningAni.getComponent(dragonBones.ArmatureDisplay);

                    armatureDisplay.playAnimation("yujing");//todo!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    this.node.addChild(this.warningAni);
                    armatureDisplay.addEventListener(dragonBones.EventObject.LOOP_COMPLETE, this.warningAniOver, this);

                } else {

                    this.scheduleOnce(this.runStage, 1);
                }


            }
            //需求变了，一轮一轮的+属性 不再是以前每轮都加 
            else {
                // this.stage = 0;//从新开始，

                // this.realStage++;//表示着 现在是第几轮 从0计数
                //0, 距离动画消失
                //1,掉落金币
                //2,播放动画 round X
                //3,下一波
                // let anim =  this.progressNode.getComponent(cc.Animation);
                // anim.play("distanceNodeANI");
                this.progressNode.runAction(cc.fadeOut(1));

                //把之前的暴走停掉
                //开始现在的暴走
                if (this.baozouFlag) {
                    this.closeBaozou();
                    this.unschedule(this.closeBaozou);
                }
                this.unschedule(this.newBaozouProcessing);

                this.newCoinBaozouProcessing();

                this.dropCoin();//掉落金币
            }
        }
    },

    dropCoin: function (coinCount) {

        let coinGuanDaos = this.coinDropBox.children;
        let coinGDCounts = this.coinDropBox.childrenCount;
        for (let i = 0; i < coinGDCounts; i++) {
            coinGuanDaos[i].getComponent("coinGuanDao").setEnableGuanDao(true);
        }

        //这里把我方飞机的碰撞面积加大，优化拾取金币的体验
        let playerColliderArea = this.player.getComponent(cc.CircleCollider);

        playerColliderArea.radius = this.player.getContentSize().width / 2;
        this.scheduleOnce(this.closeDropCoin, 7);
    },

    closeDropCoin: function () {
        let coinGuanDaos = this.coinDropBox.children;
        let coinGDCounts = this.coinDropBox.childrenCount;
        for (let i = 0; i < coinGDCounts; i++) {
            coinGuanDaos[i].getComponent("coinGuanDao").setEnableGuanDao(false);
        }



        this.scheduleOnce(this.nextRound, 2);
    },

    nextRound: function () {

        this.planeIcon.setPosition(this.planeIcon.getPosition().x, this.planeIconY);
        this.progressNode.runAction(cc.fadeIn(1));

        //1 降低我方飞机碰撞面积，2，关闭之前的金币暴走动画，3 开启暴走定时器 4进入下一回合
        //这里把我方飞机的碰撞面积减小，优化游戏过程中的体验
        let playerColliderArea = this.player.getComponent(cc.CircleCollider);
        playerColliderArea.radius = this.preColliderRadius;

        this.closeCoinBaozou();
        this.goNewBaoZou();

        this.stage = 0;
        this.realStage++;

        //还有其他 TODO!! 播放 round X 动画
        let anim = this.roundX.getComponent(cc.Animation);
        this.roundX.getComponent(cc.Label).string = "空间阶段" + (this.realStage + 1);
        anim.play(); //在preba里面添加回调 roundOver ,算了 太麻烦  这里加个定时器 规定时间后 调用下一阶段




        this.unschedule(this.runStage);
        this.scheduleOnce(this.runStage, 1);
    },

    runStage() {

        //ok 进入新stage 那边的距离要更新
        let dataLength = globalStageData.length;

        //  let height = this.maskOriginHeight - (this.stage+1)*this.maskOriginHeight/dataLength;
        //  this.distanceMask.height = height;
        let y = this.planeIconY + this.stage * this.maskOriginHeight / (dataLength - 1);
        //this.planeIcon.setPosition(this.planeIcon.getPosition().x,y);
        this.planeIcon.runAction(cc.moveTo(0.5, cc.v2(this.planeIcon.getPosition().x, y)));

        this.enemyCount = globalStageData[this.stage].length;

        var enemy;

        for (var i = 0; i < globalStageData[this.stage].length; i++) {
            var enemyID = globalStageData[this.stage][i].enemyID;
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
            } else if (enemyID === 5) {
                enemy = cc.instantiate(this.enemyPlane5);
            } else if (enemyID === 6) {
                enemy = cc.instantiate(this.enemyPlane6);
            }
            //不写在单独的脚本之中 ，全部放在 data文件里 方便集中修改
            if (enemy.getComponent("enemyPlane" + enemyID) != undefined) {
                enemy.getComponent("enemyPlane" + enemyID).enemyID = enemyID;
                enemy.getComponent("enemyPlane" + enemyID).blood = globalEnemyPlaneData[enemyID].blood + this.realStage * 10;

                enemy.getComponent("enemyPlane" + enemyID).shootingSpeed = globalEnemyPlaneData[enemyID].shootingSpeed + 0.3 * this.realStage;
                enemy.getComponent("enemyPlane" + enemyID).flyingSpeed = globalEnemyPlaneData[enemyID].flyingSpeed;

                enemy.getComponent("enemyPlane" + enemyID).damage = globalEnemyPlaneData[enemyID].damage;
                enemy.getComponent("enemyPlane" + enemyID).dropProbability = globalEnemyPlaneData[enemyID].dropProbability;
                enemy.getComponent("enemyPlane" + enemyID).fallingObject = globalEnemyPlaneData[enemyID].fallingObject;

                enemy.getComponent("enemyPlane" + enemyID).endX = globalStageData[this.stage][i].endX;
                enemy.getComponent("enemyPlane" + enemyID).endY = globalStageData[this.stage][i].endY;
            }

            enemy.setPosition(globalStageData[this.stage][i].beginX, globalStageData[this.stage][i].beginY);//初始位置初始化
            this.node.addChild(enemy);

            enemy.getComponent("enemyPlane" + enemyID).enterScene();//让敌机自己来执行自己的进入场景

        }

    },

    jinbiSanKaiOver: function (pf) {
        pf.getComponent("prize").jinbiRunFlag = true;
    },
    generatePrize: function (enemyID, prizePosition) {
        var r = Math.random();
        //  cc.log("random dropProbability  " + r);
        if (r <= globalEnemyPlaneData[enemyID].dropProbability) {
            let pf = null;
            switch (globalEnemyPlaneData[enemyID].fallingObject) {
                case generateType.jinbi:
                    //  cc.log("jinbi!");
                    let jinBiCount = Math.floor(Math.random() * 13);
                    for (let i = 0; i < jinBiCount; i++) {

                        if (this.jinbiPool.size() > 0) {
                            pf = this.jinbiPool.get();
                        } else {
                            pf = cc.instantiate(this.prizeJinBi);
                        }

                        pf.getComponent("prize").prizePool = this.jinbiPool;


                        this.node.addChild(pf);
                        pf.setPosition(prizePosition);
                        pf.getComponent("prize").prizeType = generateType.jinbi;
                        //!!先不调用自己的update函数，先自己做一个动作，在动作结束后，再置为true
                        pf.getComponent("prize").jinbiRunFlag = false;
                        let ramPosX = Math.random() * 80;
                        let ramPosY = Math.random() * 80
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

                    if (this.hudunPool.size() > 0) {
                        pf = this.hudunPool.get();
                    } else {
                        pf = cc.instantiate(this.prizeWuDiChongCi);
                    }
                    pf.getComponent("prize").prizePool = this.hudunPool;

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

                    if (this.jisuPool.size() > 0) {
                        pf = this.jisuPool.get();
                    } else {
                        pf = cc.instantiate(this.prizeJiSuSheSu);
                    }
                    pf.getComponent("prize").prizePool = this.jisuPool;

                    this.node.addChild(pf);
                    pf.setPosition(prizePosition);
                    pf.getComponent("prize").prizeType = generateType.jisushesu;
                    pf.runAction(cc.moveTo(5, this.player.getPosition()));
                    break;
                case generateType.huojianpao:
                    cc.log("huojianpao!");
                    if (this.dazhaoPool.size() > 0) {
                        pf = this.dazhaoPool.get();
                    } else {
                        pf = cc.instantiate(this.prizeHuoJianPao);
                    }
                    pf.getComponent("prize").prizePool = this.dazhaoPool;

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

    fireBoostAni: function () {
        // this.fireBoost
        cc.log("火力提升");
        let anim = this.fireBoost.getComponent(cc.Animation);
        anim.play();

    },

    generateJinBi: function (pos) {
        //    let pf = cc.instantiate(this.prizeJinBi);
        let pf = null;
        if (this.jinbiPool.size() > 0) {
            pf = this.jinbiPool.get();
        } else {
            pf = cc.instantiate(this.prizeJinBi);
        }

        pf.getComponent("prize").prizePool = this.jinbiPool;



        this.node.addChild(pf);
        pf.setPosition(pos);
        pf.getComponent("prize").prizeType = generateType.jinbi;

    },


    getJinBi: function () {

        //为了性能下面三行屏蔽了，只在游戏结束才给玩家金币结算
        //  var c = cc.sys.localStorage.getItem('jinBiCount');
        //  var newC = parseInt(c) + globalDropJinBiCount;
        //  cc.sys.localStorage.setItem('jinBiCount', newC);


        this.coinLabel.string = parseInt(this.coinLabel.string) + globalDropJinBiCount;
        this._jinBiCount += globalDropJinBiCount;
    },
    // getWuDiChongCi:function() {
    //     cc.log("getWuDiChongCi");

    // },
    getHuoJianPao: function () {
        this.bombNo += 1;
        cc.sys.localStorage.setItem('dazhaoCount', this.bombNo);
        this.bombLabel.string = this.bombNo;
    },

    getShield: function () {
      
        this.shieldNo += 1;
        cc.sys.localStorage.setItem('hudunCount', this.shieldNo);

        this.shieldLabel.string = this.shieldNo;
    },


    setBestScore: function (s) { //上报到微信服务器：历史最高分
        var kvDataList = new Array();
        kvDataList.push({ key: "driver_MaxScore", value: "" + s });
        wx.setUserCloudStorage({ KVDataList: kvDataList });
    },


    gameOver() {
        //防止在复活页面等待时 出现bug
        this.unscheduleAllCallbacks();
        this.checkcheck();
        if (this.dazhaoPlanes != null) {
            for (let i = 0; i < this.dazhaoPlanes.length; i++) {
                this.dazhaoPlanes[i].destroy();
            }
        }


        var currentScore = parseInt(this.defenLabel.string);
        var bestScore = cc.sys.localStorage.getItem('bestScore');


        if (currentScore > bestScore) {//把最高分上传到服务器吧
            cc.sys.localStorage.setItem('bestScore', currentScore);

            this.setBestScore(currentScore);
        }


        cc.sys.localStorage.setItem("currentScore", currentScore);

        var c = cc.sys.localStorage.getItem('jinBiCount');
        var d = this._jinBiCount;
        var newC = parseInt(c) + parseInt(d);
        cc.sys.localStorage.setItem('jinBiCount', newC);
        cc.sys.localStorage.setItem("getJinBiCount", d);


        //       cc.director.loadScene('end');

        //弹出复活框  或许将来是根据 当前免费广告观看次数 以及 复活卡数量 来选择是直接结束 还是弹窗
        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.reviveAlert);
        ss.setPosition(0, 100);

        ss.setLocalZOrder(100);

        ss.getComponent("reviveAlert").onWho = this.node;
        this.node.addChild(ss);



    },


    // addScore(fenshu) {
    //    // return;
    //     if(this.defenLabel == null) {
    //         return;
    //     }
    //     let fs = fenshu + parseInt(this.defenLabel.string);
    //     this.defenLabel.string = fs;
    //     if (fs > cc.sys.localStorage.getItem('bestScore')) {
    //         this.node.getChildByName("score").getChildByName("newRecord").active = true;
    //     }
    // },

    addScore(fshu) {

        this.fenshu = this.fenshu + fshu;
        this.defenLabel.string = this.fenshu;
        if (this.fenshu > this.bestScore) {
            this.newRecord.active = true;
        }
    },


    onSoundButtonClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.soundSetting);
        ss.setPosition(0, 0);

        ss.getComponent("sound").onWho = this.node;



        //  cc.director.pause();
        //  this.player.active = true;


        this.node.addChild(ss);

    },


    gamePause: function () {
        if (this.isPause == true) {
            this.singleColor.setPosition(10000, 10000);
            this.pauseBtn.setPosition(314, 521);
            this.resumeBtn.setPosition(10000, 10000);
            cc.director.getScheduler().resumeTarget(this);
            this.gameJiXu();
            this.isPause = false;
        } else if (this.isPause == false) {
            this.singleColor.setPosition(0, 0);
            this.pauseBtn.setPosition(10000, 10000);
            this.resumeBtn.setPosition(0, 0);

            cc.director.getScheduler().pauseTarget(this);
            this.gameZanTing();
            this.isPause = true;
        }

    },


    //游戏继续
    gameZanTing: function () {




        if (this.player != null) {
            this.player.getComponent("Player").pauseAction(); //让自己的飞机管理自己的子弹暂停？
        }

        this.backGround.getComponent("background").pauseAction(); //暂停云和背景

        let cc = this.node.childrenCount;
        for (let i = 0; i < cc; i++) {
            if (this.node.children[i].group === 'enemy') {
                this.node.children[i].getComponent(this.node.children[i]._name).pauseAction(); //让敌机人机 自己暂停自己的子弹。
            } else if (this.node.children[i].group === 'hBullet') {
                this.node.children[i].getComponent("heroBullet").pauseAction();
            } else if (this.node.children[i].group === 'eBullet') {
                this.node.children[i].getComponent("enemyBullet").pauseAction();
            } else if (this.node.children[i].group === 'prize') {
                this.node.children[i].getComponent("prize").pauseAction();
            } else if (this.node.children[i].group == 'dazhaoPlane') {
                this.node.children[i].getComponent("dazhaoPlane").pauseAction();
            }
        }

        let coinGuanDaos = this.coinDropBox.children;
        let coinGDCounts = this.coinDropBox.childrenCount;
        for (let i = 0; i < coinGDCounts; i++) {
            coinGuanDaos[i].getComponent("coinGuanDao").pauseAction();
        }

        this.node.off('touchmove', this.dragMove, this);
        this.node.off('touchstart', this.dragStart, this);

        this.bombSprite.off('touchstart', this.bombOnclick, this);
        this.bombSprite.off('touchmove', this.bombOnclickMove, this);




        //背景音乐如何暂停？

    },
    //游戏暂停
    gameJiXu: function () {


        console.log("resumeAction");
        if (this.player != null) {
            this.player.getComponent("Player").resumeAction(); //让自己的飞机管理自己的子弹暂停？
        }
        this.backGround.getComponent("background").resumeAction(); //暂停云和背景

        let cc = this.node.childrenCount;
        for (let i = 0; i < cc; i++) {
            if (this.node.children[i].group === 'enemy') {
                this.node.children[i].getComponent(this.node.children[i]._name).resumeAction(); //让敌机人机 自己暂停自己的子弹。
            } else if (this.node.children[i].group === 'hBullet') {
                this.node.children[i].getComponent("heroBullet").resumeAction();
            } else if (this.node.children[i].group === 'eBullet') {
                this.node.children[i].getComponent("enemyBullet").resumeAction();
            } else if (this.node.children[i].group === 'prize') {
                this.node.children[i].getComponent("prize").resumeAction();
            } else if (this.node.children[i].group == 'dazhaoPlane') {
                this.node.children[i].getComponent("dazhaoPlane").resumeAction();
            }
        }

        let coinGuanDaos = this.coinDropBox.children;
        let coinGDCounts = this.coinDropBox.childrenCount;
        for (let i = 0; i < coinGDCounts; i++) {
            coinGuanDaos[i].getComponent("coinGuanDao").resumeAction();
        }


        this.node.on('touchmove', this.dragMove, this);
        this.node.on('touchstart', this.dragStart, this);

        this.bombSprite.on('touchstart', this.bombOnclick, this);
        this.bombSprite.on('touchmove', this.bombOnclickMove, this);

        // 

        //背景音乐如何暂停？





    },





});
