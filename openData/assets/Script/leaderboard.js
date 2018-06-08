cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!'

        content: {
            default: null,
            type: cc.Node
        },

        RankItem: {
            default: null,
            type: cc.Prefab
        },

        selfName: null,
        selfHead: null,
        selfScore: -1,

        //    selfRank:-1,


        selfRankLabel: {
            default: null,
            type: cc.Label
        },

        selfScoreLabel: {
            default: null,
            type: cc.Label
        },

        selfNameLabel: {
            default: null,
            type: cc.Label
        },
        selfAvatarSprite: {
            default: null,
            type: cc.Node
        },

    },

    // use this for initialization
    onLoad: function () {
        let self = this;
        console.log("leaderboard  onload~!");
        wx.onMessage(data => {
            if (data.message == "friendRank") {
                //获得自己信息，显示到panel上？ 再测


                // self.friendInfo(); //为了在获取排行榜数据时 自己的数据已经获得 这里我在 getMyInfo中调用！
            } else if (data.message == "userInfo") {
                console.log("leaderboard userInfo ~!");
                self.getMyInfo();
            }
        });






    },

    start: function () {

    },



    getMyInfo: function () {
        console.log("ggggggg");

        let self = this;

        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success(res) {
                if (res.data) {
                    console.log(res.data);
                    if (res.data[0].nickName != undefined && res.data[0].avatarUrl != undefined) {

                        self.selfName = res.data[0].nickName;
                        self.selfHead = res.data[0].avatarUrl;

                        console.log(self.selfName);
                        console.log(self.selfHead);


                        self.friendInfo();

                    } else {
                        console.log("自己的信息1:undefined");
                    }
                }
            },
            fail() {
                //console.log(res)
                console.log("获取自己的信息失败");
            }
        })
    },

    friendInfo: function () {
        let self = this;
        wx.getFriendCloudStorage({
            keyList: ["driver_MaxScore"],
            success(res) {
                console.log(res)
                if (res.data) {
                    // self.tips.active = false;
                    //按maxScore从大到小排列
                    self.sortList(res.data, false);   //排好序的好友数据表
                    for (var i = 0; i < res.data.length; i++) { //这里有一个关键问题在于 数据的长度是多少呢？ 如果超过想要的长度。。
                        //       var item = cc.instantiate(self.RankItem, i); //生成node节点  用RankItem来储存用户的个人数据 这个API不清楚 换一个
                        var item = cc.instantiate(self.RankItem);
                        // item.parent = self.content; //content 与item 都要再制作！！！

                        self.content.addChild(item);
                        item.getComponent("RankItem").initView(res.data[i], i);  //item new出来 接下来要填写数据  应该是把数据直接塞给相应的脚本 让其处理。i的话 是排名
                    }
                    self.content.height = self.RankItem.data.height * res.data.length; //塞完item 要设置content的容量 过大 过小 都不好
                    //获得自己对应的data索引
                    var selfDataIndex = null;  //自己是哪一个呢？
                    //先比较昵称
                    var sameNameList = [];
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].nickname == self.selfName) { //看来处理这一步 之前要获得自己的数据 用名字会产生bug 但是！ID 微信也不开放！
                            sameNameList.push(i);
                        }
                    }
                    if (sameNameList.length < 1) { //煞费苦心！
                        console.log("Rank:好友的信息1：未找到同名自己"); //连自己都没有在数据表中？
                    } else if (sameNameList.length == 1) {
                        console.log("Rank:好友的信息2：找到1个同名自己"); //这里获得的数据是所有好友的数据当然包括自己的，如果只有一个和自己重名，那么必然是自己
                        selfDataIndex = sameNameList[0];
                    }

                    else { //ok 有好友和自己是重名 的。 如果不仅重名 连头像都重呢？ 用url地址 不会重 这里写的效率上不好
                        //再比较头像
                        var sameHeadList = [];
                        for (var i = 0; i < sameNameList.length; i++) {
                            if (res.data[sameNameList[i]].avatarUrl == self.selfHead) { //成员变量也要存储自己头像的url用来比较
                                sameHeadList.push(sameNameList[i]); //i 真正的在data中的索引是 sameNameList[i]
                            }
                        }
                        if (sameHeadList.length < 1) {
                            console.log("Rank:好友的信息3：未找到同头像自己");
                        }
                        else {
                            selfDataIndex = sameHeadList[0];
                        }
                    }
                    console.log("Rank:selfDataIndex=" + selfDataIndex);

                    let kvl = res.data[selfDataIndex].KVDataList;
                    console.log(kvl);
                    let s = -1;
                    for (var i = 0; i < kvl.length; i++) {
                        if (kvl[i].key == "driver_MaxScore") {
                            s = kvl[i].value;
                        }
                    }
                    console.log("ss-> " + s);
                    self.selfScore = s;


                    //     this.selfRank = selfDataIndex;
                    //设置自己的信息
                    self.setSelfInfo(selfDataIndex);  //自己的信息肯定要跟别人的不一样
                } else {
                    // self.tips.active = true;
                }
            },
            fail() {
                //console.log(res)
                console.log("Rank:获取好友的信息失败");
                //  self.tips.active = true;
            }
        })
    },

    setSelfInfo: function (sRank) {
        this.selfRankLabel.getComponent(cc.Label).string = parseInt(sRank) + 1;
        this.selfNameLabel.getComponent(cc.Label).string = this.selfName;
        //分数本地其实有一份。 怕以后要改 还是用网络的吧
        console.log("selfscore--> " +this.selfScore);
        this.selfScoreLabel.getComponent(cc.Label).string = this.selfScore;




        this.createImage(this.selfAvatarSprite.getComponent(cc.Sprite), this.selfHead);
    },

    createImage(sprite, url) {
        let image = wx.createImage();
        image.onload = function () {
            let texture = new cc.Texture2D();
            texture.initWithElement(image);
            texture.handleLoadedTexture();
            sprite.spriteFrame = new cc.SpriteFrame(texture);
            sprite.node.width = 50;
            sprite.node.height = 50;
        };
        image.src = url;
    },

    sortList: function (ListData, order) { //排序(ListData：res.data;order:false降序，true升序)
        ListData.sort(function (a, b) {
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for (var i = 0; i < KVDataList.length; i++) {
                if (KVDataList[i].key == "driver_MaxScore") {
                    AMaxScore = KVDataList[i].value;
                }
            }


            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for (var i = 0; i < KVDataList.length; i++) {
                if (KVDataList[i].key == "driver_MaxScore") {
                    BMaxScore = KVDataList[i].value;
                }
            }


            if (order) {
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            } else {
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    },


    // called every frame
    update: function (dt) {

    },
});
