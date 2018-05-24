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
        planes:{
            default: null, 
            type:cc.Node,
               
        },
        planeArray:null,
        currentID:0,

        gouMaiAndChuZhan:{
            default:null,
            type:cc.Node,
        },
        wingmanAndClosed:{
            default:null,
            type:cc.Node,
        },

        isPlaneGouMai:true,
        isWingmanGouMai:true,
    },

    // LIFE-CYCLE CALLBACKS:

  

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


   
    onLoad () {
        this.planeArray = this.planes.children;
        this.currentID = 0;
        //哪些飞机显示，哪些飞机隐藏，显示的飞机的僚机哪些显示，哪些隐藏
        this.refresh();
        //是购买飞机按钮 还是 出战按钮
        this.planeGouMaiJudgment();
        //是购买僚机还是僚机数量已经满了 需要禁用
        this.wingmanGouMaiJudgment();

      
    
        
       
     },
     planeGouMaiJudgment:function() {
         //1拥有 0没有
        let isPossess = cc.sys.localStorage.getItem("heroPlanePossess"+this.currentID);
        cc.log("ispossess--> "+ isPossess);
        if(isPossess == 1) {
            this.gouMaiAndChuZhan.getComponent(cc.Sprite).spriteFrame = this.node.getChildByName("goBattale").getComponent(cc.Sprite).spriteFrame;
            this.isPlaneGouMai = false;
            cc.log("aaaa");
            
        } else {
            this.gouMaiAndChuZhan.getComponent(cc.Sprite).spriteFrame = this.node.getChildByName("planeGouMai").getComponent(cc.Sprite).spriteFrame;
            this.isPlaneGouMai = true;
        }
     },

     wingmanGouMaiJudgment:function() {
        let wingManCount = cc.sys.localStorage.getItem('heroPlaneWingmanCount'+this.currentID);
        if(wingManCount>=6) {
            this.wingmanAndClosed.getComponent(cc.Sprite).spriteFrame = this.node.getChildByName("NanWingManGouMai").getComponent(cc.Sprite).spriteFrame;
            this.isWingmanGouMai = false;
            this.wingmanAndClosed.getComponent(cc.Button).enabled = false;
        } else {
            this.wingmanAndClosed.getComponent(cc.Sprite).spriteFrame = this.node.getChildByName("WingmanGouMai").getComponent(cc.Sprite).spriteFrame;
            this.isWingmanGouMai = true;
            this.wingmanAndClosed.getComponent(cc.Button).enabled = true;
        }
     },


     refresh:function() {
        for(let i = 0; i<this.planeArray.length;i++) {
            this.planeArray[i].active = false;

           // cc.log("adasdada--> "+this.planeArray[i].name);
        }
         this.planeArray[this.currentID].active = true;
        
         let wmCount = parseInt(cc.sys.localStorage.getItem('heroPlaneWingmanCount'+this.currentID));
cc.log("!!!-->" +'heroPlaneWingmanCount'+this.currentID);
        for(let i= 0;i<this.planeArray[this.currentID].childrenCount;i++) {
            this.planeArray[this.currentID].children[i].active = false;
        }
       
        for(let i= 0;i<wmCount;i++) {
            this.planeArray[this.currentID].children[i].active = true;
        }
       
     },

    back:function() {
        cc.log("back");
        if(this.currentID==0) {
            this.currentID = this.planeArray.length-1;
        } else {
            this.currentID--;
        }
        this.refresh();
        this.planeGouMaiJudgment();
        this.wingmanGouMaiJudgment();
    },  

    next:function() {
        cc.log("next");
        if(this.currentID==this.planeArray.length-1) {
            this.currentID = 0;
        } else {
            this.currentID++;
        }
        this.refresh();
        this.planeGouMaiJudgment();
        this.wingmanGouMaiJudgment();
    },
//既然能够被点击 就正常购买 如果不能购买 按钮是禁用的。
    addWingman:function(){
        cc.log("addWingman");

        let currentCoin = parseInt(cc.sys.localStorage.getItem('jinBiCount'));
        if(currentCoin<200){
            cc.log("金币不够，请购买！");
        } else {
            let afterCoint = currentCoin -200;
            cc.sys.localStorage.setItem('jinBiCount', afterCoint);
            let wmCount = parseInt(cc.sys.localStorage.getItem('heroPlaneWingmanCount'+this.currentID))+1;
            cc.sys.localStorage.setItem('heroPlaneWingmanCount'+this.currentID,wmCount);
            this.refresh();
            this.wingmanGouMaiJudgment();
        }

    },

    addPlane:function(){
        cc.log("addPlane");
        if(this.isPlaneGouMai === true) {
            //购买飞机逻辑 先判断钱是否够，不够就提示，够则1扣钱，2，add进本地存储，3刷新this.planeGouMaiJudgment();
            //这里先将每架飞机的价钱置为200;TODO!!!
            
            let currentCoin = parseInt(cc.sys.localStorage.getItem('jinBiCount'));
            if(currentCoin<200){
                cc.log("金币不够，请购买！");
            } else {
                let afterCoint = currentCoin -200;
                cc.sys.localStorage.setItem('jinBiCount', afterCoint);
                cc.sys.localStorage.setItem('heroPlanePossess'+this.currentID,1);
                //this.wingmanGouMaiJudgment();//觉得这个函数没必要调用
                this.planeGouMaiJudgment();
            }
        } else {
            //出战
            D.globalHeroPlaneID = this.currentID;
            cc.sys.localStorage.setItem('globalHeroPlaneID',this.currentID);
            cc.director.loadScene("game");
        }
        
    },

    goMain:function() {
        cc.log("goMain");
        cc.director.loadScene('start');
       

        //bugs 将来要改 现在先按照当前屏幕是什么飞机就设置为什么飞机，将来要改到出战按钮，这里要删掉
        // D.globalHeroPlaneID = this.currentID;
        // cc.sys.localStorage.setItem('globalHeroPlaneID',this.currentID);
    },

    
    // update (dt) {},
});
