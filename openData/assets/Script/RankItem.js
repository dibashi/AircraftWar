// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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

        rankLabel: {
            default: null,
            type: cc.Label
        },
        // // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!'

        avatarSprite: {
            default: null,
            type: cc.Node
        },

        scoreLabel: {
            default: null,
            type: cc.Label
        },
        nameLabel: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:
    // item.getComponent("RankItem").initView(res.data[i], i);
    // onLoad () {},

    start() {

    },

    initView: function (dataList, rank) {
        this.rankLabel.getComponent(cc.Label).string = rank;
        this.nameLabel.getComponent(cc.Label).string = dataList.nickname;

        let kvl = dataList.KVDataList;
        let s = -1;
        for (var i = 0; i < kvl.length; i++) {
            if (kvl[i].key == "driver_MaxScore") {
                s = kvl[i].value;
            }
        }
        this.scoreLabel.getComponent(cc.Label).string = s;
        //头像如何读取 并显示到精灵上呢？
    },

    // update (dt) {},
});
