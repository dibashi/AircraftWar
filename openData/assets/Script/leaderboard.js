cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // // defaults, set visually when attaching this script to the Canvas
        // text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        // this.label.string = this.text;
        //    wx.onMessage(data => {
        //        if(data.message == "friendRank") {
        //          //获得自己信息，显示到panel上？ 再测
        //          this.getMyInfo();
        //        }
        // if(data.message == "rankMain"){ //主场景
        //     cc.director.loadScene("rankMain");
        // }else if(data.message == "friendRank"){ //好友排行榜
        //     cc.director.loadScene("friendRank");
        // }else if(data.message == "fiveRank"){ //5人排行榜
        //     cc.director.loadScene("fiveRank");
        // }else{ 
        //     var str = data.message.substr(0,9);
        //     if(str == "groupRank"){ //群排行榜(这里将群的shareTicket加在"groupRank"后一起传过来)
        //         common.groupShareTicket = data.message.substr(9, data.message.length - 9);
        //         cc.director.loadScene("groupRank");
        //     }
        // }
        //   });

    },

    start: function () {
        console.log("onStart~!");
        wx.onMessage(data => {
            if (data.message == "friendRank") {
                //获得自己信息，显示到panel上？ 再测
                //this.getMyInfo();

               // this.friendInfo();
            }
        });
    },

  

    getMyInfo: function () {
        let self = this;
    //    console.log("getmyInfo~!");
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success(res) {
                if (res.data) {
                    console.log(res.data);
                    if (res.data[0].nickName != undefined && res.data[0].avatarUrl != undefined) {
                        //   self.selfName.string = res.data[0].nickName;

                        //  self.createImage(self.selfHead, res.data[0].avatarUrl);

                        //    self.selfNode.active = true;
                        // console.log(this);
                        // console.log(self);
                     //   self.label.getComponent(cc.Label).string = res.data[0].nickName;
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

    friendInfo:function() {
        let self = this;
        wx.getFriendCloudStorage({
            keyList: ["driver_MaxScore"],
            success(res){
                console.log(res)
                if(res.data){
                   // self.tips.active = false;
                    //按maxScore从大到小排列
                    self.sortList(res.data, false);   //排好序的好友数据表
                    for(var i = 0; i < res.data.length; i++){ //这里有一个关键问题在于 数据的长度是多少呢？ 如果超过想要的长度。。
                 //       var item = cc.instantiate(self.RankItem, i); //生成node节点  用RankItem来储存用户的个人数据 这个API不清楚 换一个
                        var item = cc.instantiate(self.RankItem);
                        item.parent = self.content; //content 与item 都要再制作！！！
                        item.getComponent("RankItem").initView(res.data[i], i);  //item new出来 接下来要填写数据  应该是把数据直接塞给相应的脚本 让其处理。i的话 是排名
                    } 
                    self.content.height = self.RankItem.data.height * res.data.length; //塞完item 要设置content的容量 过大 过小 都不好
                    //获得自己对应的data索引
                    var selfDataIndex = null;  //自己是哪一个呢？
                    //先比较昵称
                    var sameNameList = [];
                    for(var i = 0; i < res.data.length; i++){
                        if(res.data[i].nickname == self.selfName){ //看来处理这一步 之前要获得自己的数据 用名字会产生bug 但是！ID 微信也不开放！
                            sameNameList.push(i);
                        }
                    }
                    if(sameNameList.length < 1){ //煞费苦心！
                        console.log("Rank:好友的信息1：未找到同名自己"); //连自己都没有在数据表中？
                    }else if(sameNameList.length == 1){
                        console.log("Rank:好友的信息2：找到1个同名自己"); //这里获得的数据是所有好友的数据当然包括自己的，如果只有一个和自己重名，那么必然是自己
                        selfDataIndex = sameNameList[0];
                    }else{ //ok 有好友和自己是重名 的。 如果不仅重名 连头像都重呢？ 用url地址 不会重 这里写的效率上不好
                        //再比较头像
                        var sameHeadList = [];
                        for(var i = 0; i < sameNameList.length; i++){
                            if(res.data[sameNameList[i]].avatarUrl == self.selfHead){ //成员变量也要存储自己头像的url用来比较
                                sameHeadList.push(sameNameList[i]); //i 真正的在data中的索引是 sameNameList[i]
                            }
                        }
                        if(sameHeadList.length < 1){
                            console.log("Rank:好友的信息3：未找到同头像自己");
                        }else if(sameHeadList.length == 1){ 
                            selfDataIndex = sameHeadList[0];
                        }else{ //真的是无语了 ，如果所有的一切都一样呢？
                            //再比较最高积分
                            var sameMaxScoreList = [];
                            for(var i = 0; i < sameHeadList.length; i++){ //这里应该有bug 应该是从相同头像中去比较 之前是sameNameList
                                var dList = res.data[sameHeadList[i]].KVDataList;
                                for(var j = 0; j < dList.length; j++){
                                    if(dList[j].key == "driver_MaxScore" && dList[j].value == self.selfScore){ //获得这条数据下driver_MaxScore数据
                                        sameMaxScoreList.push(sameHeadList[i]); //push的是i 也就是 sameheadlist中的索引 sameheadlist[i] 是samenamelist中的索引 samenamelist[sameheadlist[i]] 才是真实的位置
                                    }
                                }
                            }
                            if(sameMaxScoreList.length < 1){
                                console.log("Rank:好友的信息3：未找到同周最高积分自己");
                            }else if(sameMaxScoreList.length == 1){
                                selfDataIndex = sameMaxScoreList[0];
                            }else{ //到这里，发现多个同昵称、同头像、同最高积分的玩家，只能随机了
                             //   var value = Math.floor(Math.random() * (sameMaxScoreList.length - 1 + 1) + 1) - 1;  //他是胡扯
                               // selfDataIndex = sameMaxScoreList[value - 1];
                               selfDataIndex  = sameMaxScoreList[0]; 
                            }
                        }
                    }
                    console.log("Rank:selfDataIndex=" + selfDataIndex);
                    //设置自己的信息
                    self.setSelfInfo(selfDataIndex);  //自己的信息肯定要跟别人的不一样
                }else{
                   // self.tips.active = true;
                }               
            },
            fail(){
                //console.log(res)
                console.log("Rank:获取好友的信息失败");
              //  self.tips.active = true;
            }
        })
    },

    sortList: function(ListData, order){ //排序(ListData：res.data;order:false降序，true升序)
        ListData.sort(function(a,b){
            var AMaxScore = 0;
            var KVDataList = a.KVDataList;
            for(var i = 0; i < KVDataList.length; i++){
                if(KVDataList[i].key == "driver_MaxScore"){
                AMaxScore = KVDataList[i].value;
                }
            }
    
    
            var BMaxScore = 0;
            KVDataList = b.KVDataList;
            for(var i = 0; i<KVDataList.length; i++){
                if(KVDataList[i].key == "driver_MaxScore"){
                BMaxScore = KVDataList[i].value;
                }
            }
    
    
            if(order){
                return parseInt(AMaxScore) - parseInt(BMaxScore);
            }else{
                return parseInt(BMaxScore) - parseInt(AMaxScore);
            }
        });
        return ListData;
    },


    // called every frame
    update: function (dt) {

    },
});
