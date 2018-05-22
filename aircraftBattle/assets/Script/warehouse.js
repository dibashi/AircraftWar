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
        this.refresh();


        
       
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
    },  

    next:function() {
        cc.log("next");
        if(this.currentID==this.planeArray.length-1) {
            this.currentID = 0;
        } else {
            this.currentID++;
        }
        this.refresh();
    },

    addWingman:function(){
        cc.log("addWingman");
        let wmCount =  parseInt(cc.sys.localStorage.getItem('heroPlaneWingmanCount'+this.currentID));
        if(wmCount>=6) {
            return;
        }
        cc.sys.localStorage.setItem('heroPlaneWingmanCount'+this.currentID,wmCount+1);
        this.refresh();
    },

    addPlane:function(){
        cc.log("addPlane");
        
    },

    goMain:function() {
        cc.log("goMain");
        cc.director.loadScene('start');
        D.globalHeroPlaneID = this.currentID;

        //bugs 将来要改 现在先按照当前屏幕是什么飞机就设置为什么飞机，将来要改到出战按钮，这里要删掉
        cc.sys.localStorage.setItem('globalHeroPlaneID',this.currentID);
    },

    
    // update (dt) {},
});
