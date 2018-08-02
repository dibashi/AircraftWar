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
        planes: {
            default: null,
            type: cc.Node,

        },
        planeArray: null,
        currentID: 0,




        spriteCoin: null,
        labelCoin: null,



        //  settingButton: null,

        soundSetting: {
            default: null,
            type: cc.Prefab,
        },
        alert: {
            default: null,
            type: cc.Prefab,
        },

        buttonAudio: {
            default: null,
            url: cc.AudioClip
        },

        gouMai: {
            default: null,
            type: cc.Node,

        },

        addLevel: {
            default: null,
            type: cc.Node,

        },

       

        goBattle: {
            default: null,
            type: cc.Node,
        },

        currentLevelLabel: {
            default: null,
            type: cc.Node,
        },


        planeMoney: 10000,
        wingmanMoney: 5000,


        rewardCurrentSpriteNode: {
            default: null,
            type: cc.Node
        },

        rewardNextSpriteNode: {
            default: null,
            type: cc.Node
        },

        reward_ziti0:{
            default: null,
            type: cc.Node
        },
        reward_ziti1:{
            default: null,
            type: cc.Node
        },
        reward_ziti2:{
            default: null,
            type: cc.Node
        },
        reward_ziti3:{
            default: null,
            type: cc.Node
        },
        reward_ziti4:{
            default: null,
            type: cc.Node
        },
        reward_ziti5:{
            default: null,
            type: cc.Node
        },
        reward_ziti6:{
            default: null,
            type: cc.Node
        },
        reward_ziti7:{
            default: null,
            type: cc.Node
        },


        rewardSpriteFrameArray:null,

    },

    // LIFE-CYCLE CALLBACKS:



    //游戏重新运行
    gameStart: function () {
        cc.director.loadScene('game');
        //cc.director.resume();
    },



    onLoad() {

        //适配
        let wx = cc.director.getVisibleSize().width * 0.5;
        let hy = cc.director.getVisibleSize().height * 0.5;
        //this.spriteCoin = this.node.getChildByName("spriteCoin");
        //this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width / 2 - wx, hy - (this.spriteCoin.getContentSize().height / 2) - 10);
        this.labelCoin = this.node.getChildByName("spriteCoin").getChildByName("coinLabel").getComponent(cc.Label);
        this.labelCoin.string = cc.sys.localStorage.getItem("jinBiCount");
        //   this.settingButton = this.node.getChildByName("soundSetting");
        //  this.settingButton.setPosition(this.settingButton.getContentSize().width / 2 - wx, hy - this.spriteCoin.getContentSize().height - 10 - (this.settingButton.getContentSize().height / 2));

        this.planeArray = this.planes.children;


        this.rewardSpriteFrameArray = new Array();

        this.rewardSpriteFrameArray[0] = this.reward_ziti0.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[1] = this.reward_ziti1.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[2] = this.reward_ziti2.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[3] = this.reward_ziti3.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[4] = this.reward_ziti4.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[5] = this.reward_ziti5.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[6] = this.reward_ziti6.getComponent(cc.Sprite).spriteFrame;
        this.rewardSpriteFrameArray[7] = this.reward_ziti7.getComponent(cc.Sprite).spriteFrame;

        


        this.currentID = 0;
        //哪些飞机显示，哪些飞机隐藏，显示的飞机的僚机哪些显示，哪些隐藏
        this.refresh();
        //是购买飞机按钮 还是 出战按钮
        this.planeGouMaiJudgment();
        //是购买僚机还是僚机数量已经满了 需要禁用
        this.wingmanGouMaiJudgment();

    },
    planeGouMaiJudgment: function () {
        //1拥有 0没有
        let isPossess = cc.sys.localStorage.getItem("heroPlanePossess" + this.currentID);
      //  cc.log("ispossess--> " + isPossess);
        if (isPossess == 1) {

            this.addLevel.setPosition(0, -386);
            this.gouMai.setPosition(768, -255);

            this.goBattle.getComponent(cc.Button).interactable = true;

        } else {
            this.addLevel.setPosition(768, -255);
            this.gouMai.setPosition(0, -386);
            this.goBattle.getComponent(cc.Button).interactable = false;
        }
    },

    wingmanGouMaiJudgment: function () {
        let wingManCount = cc.sys.localStorage.getItem('heroPlaneWingmanCount' + this.currentID);
        if (wingManCount >= 6) {

            this.isWingmanGouMai = false;
            
            this.addLevel.getComponent(cc.Button).interactable = false;
        } else {
            this.isWingmanGouMai = true;
            
            this.addLevel.getComponent(cc.Button).interactable = true;
        }
    },

    currentLevelFun: function () {
        let wingManCount = cc.sys.localStorage.getItem('heroPlaneWingmanCount' + this.currentID);
        this.currentLevelLabel.getComponent(cc.Label).string = wingManCount;

        this.rewardCurrentSpriteNode.getComponent(cc.Sprite).spriteFrame = this.rewardSpriteFrameArray[wingManCount];
      //  cc.log(this.rewardNextSpriteNode);
      //  cc.log(this.rewardNextSpriteNode.getComponent(cc.Sprite));

  //  cc.log(parseInt(wingManCount)+1);
        this.rewardNextSpriteNode.getComponent(cc.Sprite).spriteFrame = this.rewardSpriteFrameArray[parseInt(wingManCount)+1];
    },


    refresh: function () {
        for (let i = 0; i < this.planeArray.length; i++) {
            this.planeArray[i].active = false;

            // cc.log("adasdada--> "+this.planeArray[i].name);
        }
        this.planeArray[this.currentID].active = true;

        let wmCount = parseInt(cc.sys.localStorage.getItem('heroPlaneWingmanCount' + this.currentID));
     //   cc.log("!!!-->" + 'heroPlaneWingmanCount' + this.currentID);
        for (let i = 0; i < this.planeArray[this.currentID].childrenCount; i++) {
            this.planeArray[this.currentID].getChildByName("wingman" + i).active = true;
            this.planeArray[this.currentID].getChildByName("wingman" + i).getChildByName("sprite1").active = false;
        }

        for (let i = 0; i < wmCount; i++) {
            this.planeArray[this.currentID].getChildByName("wingman" + i).getChildByName("sprite1").active = true;
        }

        this.currentLevelFun();
    },

    back: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
        //   cc.log("back");
        if (this.currentID == 0) {
            this.currentID = this.planeArray.length - 1;
        } else {
            this.currentID--;
        }
        this.refresh();
        this.planeGouMaiJudgment();
        this.wingmanGouMaiJudgment();
    },

    next: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
        // cc.log("next");
        if (this.currentID == this.planeArray.length - 1) {
            this.currentID = 0;
        } else {
            this.currentID++;
        }
        this.refresh();
        this.planeGouMaiJudgment();
        this.wingmanGouMaiJudgment();
    },
    //既然能够被点击 就正常购买 如果不能购买 按钮是禁用的。
    addWingman: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
       // cc.log("addWingman");

        let currentCoin = parseInt(cc.sys.localStorage.getItem('jinBiCount'));
        if (currentCoin < this.wingmanMoney) {
          //  cc.log("金币不足，请购买！");
            let ss = cc.instantiate(this.alert);
            ss.setPosition(0, 0);

            ss.getComponent("Alert").onWho = this.node;
            this.node.addChild(ss);
        } else {
            let afterCoint = currentCoin - this.wingmanMoney;
            cc.sys.localStorage.setItem('jinBiCount', afterCoint);
            this.labelCoin.string = afterCoint;

            let wmCount = parseInt(cc.sys.localStorage.getItem('heroPlaneWingmanCount' + this.currentID)) + 1;
            cc.sys.localStorage.setItem('heroPlaneWingmanCount' + this.currentID, wmCount);
            this.refresh();
            this.wingmanGouMaiJudgment();
        }

    },

    addPlane: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
        //cc.log("addPlane");

        //购买飞机逻辑 先判断钱是否够，不够就提示，够则1扣钱，2，add进本地存储，3刷新this.planeGouMaiJudgment();
        //这里先将每架飞机的价钱置为200;TODO!!!

        let currentCoin = parseInt(cc.sys.localStorage.getItem('jinBiCount'));
        if (currentCoin < this.planeMoney) {
        //    cc.log("金币不够，请购买！");
            let ss = cc.instantiate(this.alert);
            ss.setPosition(0, 0);

            ss.getComponent("Alert").onWho = this.node;
            this.node.addChild(ss);

        } else {
            let afterCoint = currentCoin - this.planeMoney;
            cc.sys.localStorage.setItem('jinBiCount', afterCoint);
            this.labelCoin.string = afterCoint;

            cc.sys.localStorage.setItem('heroPlanePossess' + this.currentID, 1);
            //this.wingmanGouMaiJudgment();//觉得这个函数没必要调用
            this.planeGouMaiJudgment();
        }

    },

    //游戏重新运行
    gameStart: function () {
        D.globalHeroPlaneID = this.currentID;
        cc.sys.localStorage.setItem('globalHeroPlaneID', this.currentID);
        cc.director.loadScene("game");
    },

    goMain: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);
       // cc.log("goMain");
        cc.director.loadScene('start');


        //bugs 将来要改 现在先按照当前屏幕是什么飞机就设置为什么飞机，将来要改到出战按钮，这里要删掉
        // D.globalHeroPlaneID = this.currentID;
        // cc.sys.localStorage.setItem('globalHeroPlaneID',this.currentID);
    },


    onSoundButtonClick: function () {
        cc.audioEngine.playEffect(this.buttonAudio, false);

        cc.eventManager.pauseTarget(this.node, true);
        let ss = cc.instantiate(this.soundSetting);
        ss.setPosition(0, 0);

        ss.getComponent("sound").onWho = this.node;
        this.node.addChild(ss);

    },

});
