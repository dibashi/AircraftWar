// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
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
        spriteCoin:null,
        labelCoin:null,
        personalBestScore: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //适配
        let wx = cc.director.getVisibleSize().width*0.5;
        let hy = cc.director.getVisibleSize().height*0.5;
        this.spriteCoin = this.node.getChildByName("spriteCoin");
        this.spriteCoin.setPosition(this.spriteCoin.getContentSize().width/2-wx,hy-(this.spriteCoin.getContentSize().height/2));
       
        this.labelCoin = this.node.getChildByName("spriteCoin").getChildByName("coinLabel").getComponent(cc.Label);
        this.personalBestScore = this.node.getChildByName("personalHistory").getChildByName("personalBestScore").getComponent(cc.Label);

        var isloaded = cc.sys.localStorage.getItem("isLoaded");
        
        if(!isloaded) {
            cc.sys.localStorage.setItem('isLoaded', 1);
            cc.sys.localStorage.setItem('jinBiCount', globalJinBiCount);
            //分数一般是从服务器读取，这里先用本地存储。
            cc.sys.localStorage.setItem('bestScore', 0);

        }
        //  else {
        //     var countLoaded = parseInt(cc.sys.localStorage.getItem('isLoaded')) +1;
        //     cc.sys.localStorage.setItem('isLoaded', countLoaded);
        //     //cc.log("第" + countLoaded +"次登陆");
        // }

        // cc.log("isloaded " + cc.sys.localStorage.getItem('isLoaded') );
        // cc.log("jinBiCount " + cc.sys.localStorage.getItem('jinBiCount') );
        //cc.log( this.labelCoin);
       // cc.log(cc.sys.localStorage.getItem("jinBiCount"));
        this.labelCoin.string = cc.sys.localStorage.getItem("jinBiCount");
        this.personalBestScore.string = cc.sys.localStorage.getItem("bestScore");
    },

    beginClick:function() {
        cc.director.loadScene('game');
    },

    planesClick:function() {
        cc.director.loadScene('warehouse');
    },

    start () {

    },

    // update (dt) {},
});
