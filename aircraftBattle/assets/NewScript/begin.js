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


var globalJinBiCount = require("enemyPlaneDatas").jinBiCount;
cc.Class({
    extends: cc.Component,

    properties: {


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


        soundSetting: {
            default: null,
            type: cc.Prefab,
        },


        audio: {
            url: cc.AudioClip,
            default: null
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

       
        spriteCoin: {
            default: null,
            type: cc.Node,

        },

        labelCoin: {
            default: null,
            type: cc.Node,

        },

        spriteDaZhao: {
            default: null,
            type: cc.Node,

        },

        dazhaoLabel: {
            default: null,
            type: cc.Node,

        },

        spriteHuDun: {
            default: null,
            type: cc.Node,

        },

        hudunLabel: {
            default: null,
            type: cc.Node,

        },

        spriteLife: {
            default: null,
            type: cc.Node,

        },

        lifeLabel: {
            default: null,
            type: cc.Node,

        },



        personalBestScore: null,

        settingButton: null,

        dailyAlert: {
            default: null,
            type: cc.Prefab,
        },

        giftPackageAlert: {
            default: null,
            type: cc.Prefab,
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //适配
        let wx = cc.director.getVisibleSize().width * 0.5;
        let hy = cc.director.getVisibleSize().height * 0.5;
      
        this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width / 2 - wx, hy - (this.spriteCoin.getContentSize().height / 2)-20);
        this.spriteDaZhao.setPosition(this.spriteCoin.getPosition().x+this.spriteCoin.getContentSize().width / 2+this.spriteDaZhao.getContentSize().width / 2+5, this.spriteCoin.getPosition().y);
        this.spriteHuDun.setPosition(this.spriteDaZhao.getPosition().x+this.spriteDaZhao.getContentSize().width / 2+this.spriteHuDun.getContentSize().width / 2+5, this.spriteCoin.getPosition().y);
        this.spriteLife.setPosition(this.spriteHuDun.getPosition().x+this.spriteHuDun.getContentSize().width / 2+this.spriteLife.getContentSize().width / 2+5, this.spriteCoin.getPosition().y);

      

        
        this.personalBestScore = this.node.getChildByName("personalHistory").getChildByName("personalBestScore").getComponent(cc.Label);

        this.settingButton = this.node.getChildByName("soundSetting");
        this.settingButton.setPosition(this.settingButton.getContentSize().width / 2 - wx, hy - this.spriteCoin.getContentSize().height - 10 - (this.settingButton.getContentSize().height / 2));

        //！！！由于现在不知道怎么把本地存储的数据删掉，为了调试方便 只要游戏进来都按第一次登陆
        // cc.sys.localStorage.setItem("isLoaded",0);

        let isloaded = cc.sys.localStorage.getItem("isLoaded");
      

        if (isloaded == 0 || isloaded == null) {
            cc.sys.localStorage.setItem('isLoaded', 1);
            cc.sys.localStorage.setItem('jinBiCount', 100);
            //分数一般是从服务器读取，这里先用本地存储。
            cc.sys.localStorage.setItem('bestScore', 0);

            cc.sys.localStorage.setItem('globalHeroPlaneID', 0);

          
            //初始化一下玩家对各个飞机拥有的僚机数量
            cc.sys.localStorage.setItem('heroPlaneWingmanCount0', 0);
            cc.sys.localStorage.setItem('heroPlaneWingmanCount1', 0);
            cc.sys.localStorage.setItem('heroPlaneWingmanCount2', 0);
            // cc.sys.localStorage.setItem('heroPlaneWingmanCount3',0);
            // cc.sys.localStorage.setItem('heroPlaneWingmanCount4',0);
            //初始化一下玩家拥有的飞机 1代表玩家拥有 0代表 玩家没有
            cc.sys.localStorage.setItem('heroPlanePossess0', 1);
            cc.sys.localStorage.setItem('heroPlanePossess1', 0);
            cc.sys.localStorage.setItem('heroPlanePossess2', 0);
            //背景音乐 与音效 1为播放 0 为停止
            cc.sys.localStorage.setItem('gameSoundBG', 1);
            cc.sys.localStorage.setItem('effectSound', 1);

            //大招 护盾数量初始化
            cc.sys.localStorage.setItem('dazhaoCount', 1);
            cc.sys.localStorage.setItem('hudunCount', 1);

            //飞机命数 初始化
            cc.sys.localStorage.setItem('planeLifeCount', 1);

            //每日登陆功能 记录今天的年月日
            cc.sys.localStorage.setItem("lastLoadDate", this.currentYMD());
         

            //记录上一次领取时间 和 观看广告时间

            cc.sys.localStorage.setItem('lqTime', Date.now());
            cc.sys.localStorage.setItem('ggTime', Date.now());
        }
        else {
            cc.sys.localStorage.setItem('isLoaded', parseInt(isloaded) + 1);
        }
        this.labelCoin.getComponent(cc.Label).string = cc.sys.localStorage.getItem('jinBiCount');
         this.dazhaoLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('dazhaoCount');
         this.hudunLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('hudunCount');
         this.lifeLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('planeLifeCount');
        //这里应该是好友的最佳 还是自己的历史最佳？ 这里先用自己的 
        this.personalBestScore.string = "最佳得分：" + cc.sys.localStorage.getItem("bestScore");

        let dddd = cc.sys.localStorage.getItem('globalHeroPlaneID');
        D.globalHeroPlaneID = dddd;
        let playerImg = null;
        if (dddd == heroPlaneID.heroPlane0) {
       
            playerImg = cc.instantiate(this.heroPlane0);
        }
        else if (dddd == heroPlaneID.heroPlane1) {
            playerImg = cc.instantiate(this.heroPlane1);
        }
        else if (dddd == heroPlaneID.heroPlane2) {
            playerImg = cc.instantiate(this.heroPlane2);
        }
        else if (dddd == heroPlaneID.heroPlane3) {
            playerImg = cc.instantiate(this.heroPlane3);
        }
        else if (dddd == heroPlaneID.heroPlane4) {
           
            playerImg = cc.instantiate(this.heroPlane4);
         
        }
        else if (dddd == heroPlaneID.heroPlane5) {
            playerImg = cc.instantiate(this.heroPlane5);
        }
       
        this.node.getChildByName("selectedPlane").setContentSize(playerImg.getContentSize());
        this.node.getChildByName("selectedPlane").getComponent(cc.Sprite).spriteFrame = playerImg.getComponent(cc.Sprite).spriteFrame;
        this.node.getChildByName("selectedPlane").scale = 2;


        let effectSound = cc.sys.localStorage.getItem('effectSound');
        if (effectSound == 1) {
            cc.audioEngine.setEffectsVolume(0.5);

        } else {
            //这真的是引擎的bug，没办法 http://forum.cocos.com/t/bug/45242/9
            cc.audioEngine.setEffectsVolume(0.0000001);
            cc.audioEngine.setMusicVolume(0.5);
        }


        let gameSoundBG = cc.sys.localStorage.getItem('gameSoundBG');
        if (gameSoundBG == 1) {
            cc.audioEngine.playMusic(this.audio, true);
        } else {
            cc.audioEngine.stopMusic();
        }


        let lastYMD = cc.sys.localStorage.getItem("lastLoadDate");
        let curYMD = this.currentYMD();
       

        if (curYMD != lastYMD) {
            //与上次记录的时间不在同一天
            //1 弹出每日登陆奖励  这里的弹窗很可能以后会变，单独做出来
            //2 在每日登陆奖励中 点击确定就让用户的账上添加给予的奖品
            //3 更新其领礼物的日期，方便下次判断
            let ss = cc.instantiate(this.dailyAlert);
            ss.setPosition(0, 0);
            ss.getComponent("dailyAlert").onWho = this.node;
            this.node.addChild(ss);
        }
        //测试用
        //   cc.sys.localStorage.setItem('planeLifeCount', 2);

        // let zzz = Date.now();
    
        // cc.sys.localStorage.setItem('zzz', zzz);

        // let z = parseInt(cc.sys.localStorage.getItem('zzz'));

      

    },

    refreshPrize:function() {
        //刷新 金币 必杀 护盾 飞机命数的值，以及保存当前的日期
        this.labelCoin.getComponent(cc.Label).string = cc.sys.localStorage.getItem('jinBiCount');
        this.dazhaoLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('dazhaoCount');
        this.hudunLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('hudunCount');
        this.lifeLabel.getComponent(cc.Label).string = cc.sys.localStorage.getItem('planeLifeCount');

        cc.sys.localStorage.setItem("lastLoadDate", this.currentYMD());
      
    },
    //当前年月日
    currentYMD: function () {
        let dd = new Date();
        let y = dd.getFullYear();
        let m = dd.getMonth();
        let d = dd.getDate();
      
        return (y + "" + m + "" + d);
    },

    beginClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
        cc.director.loadScene('game');
    },

    planesClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.director.loadScene('warehouse');
    },

    leaderboardClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.director.loadScene('Leaderboard');
    },

    storeClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.director.loadScene('store');
    },

    onSoundButtonClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.soundSetting);
        ss.setPosition(0, 0);

        ss.getComponent("sound").onWho = this.node;
        this.node.addChild(ss);

    },

    onGiftPackageClick:function() {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.giftPackageAlert);
        ss.setPosition(0, 0);

        ss.getComponent("giftPackageAlert").onWho = this.node;
        this.node.addChild(ss);
    },
    // update (dt) {},
});
