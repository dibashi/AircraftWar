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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },

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

        spriteCoin: null,
        labelCoin: null,
        personalBestScore: null,

        settingButton:null,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //适配
        let wx = cc.director.getVisibleSize().width * 0.5;
        let hy = cc.director.getVisibleSize().height * 0.5;
        this.spriteCoin = this.node.getChildByName("spriteCoin");
        this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width / 2 - wx, hy - (this.spriteCoin.getContentSize().height / 2));

        this.labelCoin = this.node.getChildByName("spriteCoin").getChildByName("coinLabel").getComponent(cc.Label);
        this.personalBestScore = this.node.getChildByName("personalHistory").getChildByName("personalBestScore").getComponent(cc.Label);

     this.settingButton = this.node.getChildByName("soundSetting");
     this.settingButton.setPosition(this.settingButton.getContentSize().width / 2-wx,hy - this.spriteCoin.getContentSize().height-10 -(this.settingButton.getContentSize().height / 2));

        //！！！由于现在不知道怎么把本地存储的数据删掉，为了调试方便 只要游戏进来都按第一次登陆
        // cc.sys.localStorage.setItem("isLoaded",0);

        let isloaded = cc.sys.localStorage.getItem("isLoaded");
        cc.log("isloaded----> " + isloaded);
        // var zzzzzz=  cc.sys.localStorage.getItem("zzzzzz");
        // var ppppppp=  cc.sys.localStorage.getItem("ppppp",0);
        // var tttttt=  cc.sys.localStorage.getItem("tttttt",1);
        // cc.log(" zzzzzz   " + zzzzzz + "  ppppppp" + ppppppp + " tttttt " +tttttt);

        if (isloaded == 0 || isloaded == null) {
            cc.sys.localStorage.setItem('isLoaded', 1);
            cc.sys.localStorage.setItem('jinBiCount', globalJinBiCount);
            //分数一般是从服务器读取，这里先用本地存储。
            cc.sys.localStorage.setItem('bestScore', 0);

            cc.sys.localStorage.setItem('globalHeroPlaneID', 0);

            cc.log("运行到了");
            //初始化一下玩家对各个飞机拥有的僚机数量
            cc.sys.localStorage.setItem('heroPlaneWingmanCount0', 6);
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

        }
        else {
            cc.sys.localStorage.setItem('isLoaded', parseInt(isloaded) + 1);
        }
        this.labelCoin.string = cc.sys.localStorage.getItem("jinBiCount");
        //这里应该是好友的最佳 还是自己的历史最佳？ 这里先用自己的 
        this.personalBestScore.string = "最佳得分：" + cc.sys.localStorage.getItem("bestScore");

        let dddd = cc.sys.localStorage.getItem('globalHeroPlaneID');
        D.globalHeroPlaneID = dddd;
        let playerImg = null;
        if (dddd == heroPlaneID.heroPlane0) {
            cc.log("jinru plane0!")
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
            //cc.log('zhixing111111');
            playerImg = cc.instantiate(this.heroPlane4);
            //cc.log(player);
        }
        else if (dddd == heroPlaneID.heroPlane5) {
            playerImg = cc.instantiate(this.heroPlane5);
        }
        cc.log("ID-->" + dddd + "  size----> " + playerImg.getContentSize().width + '   ' + playerImg.getContentSize().height);
        this.node.getChildByName("selectedPlane").setContentSize(playerImg.getContentSize());
        this.node.getChildByName("selectedPlane").getComponent(cc.Sprite).spriteFrame = playerImg.getComponent(cc.Sprite).spriteFrame;
        this.node.getChildByName("selectedPlane").scale = 1.5;


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
    // update (dt) {},
});
