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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    //游戏重新运行
    gameStart: function(){ 
        cc.director.loadScene('game');
        //cc.director.resume();
    },

    selectedPlane0: function(){ 
        D.globalHeroPlaneID = heroPlaneID.heroPlane0;
    },
    selectedPlane1: function(){ 
        D.globalHeroPlaneID = heroPlaneID.heroPlane1;
    },
    selectedPlane2: function(){ 
        D.globalHeroPlaneID = heroPlaneID.heroPlane2;
    },
    selectedPlane3: function(){ 
        D.globalHeroPlaneID = heroPlaneID.heroPlane3;
    },
    selectedPlane4: function(){ 
        D.globalHeroPlaneID = heroPlaneID.heroPlane4;
    },
    selectedPlane5: function(){ 
        D.globalHeroPlaneID = heroPlaneID.heroPlane5;
    },


    
    // update (dt) {},
});
